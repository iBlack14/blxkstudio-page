import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"

interface WebhookPayload {
  event: "user_message" | "owner_response" | "timeout"
  userId: string
  message: string
  conversationId: string
  timestamp?: string
  botActive?: boolean
  ownerName?: string
  from?: string // Para Baileys
  type?: string // Para Baileys
}

interface ConversationState {
  conversationId: string
  botActive: boolean
  ownerInactive: boolean
  lastOwnerMessageTime: number
  messageHistory: Array<{
    sender: "user" | "bot" | "owner"
    message: string
    timestamp: number
  }>
}

const conversationStates = new Map<string, ConversationState>()
const timeoutTimers = new Map<string, NodeJS.Timeout>()

export async function POST(request: NextRequest) {
  try {
    const payload: WebhookPayload = await request.json()

    const conversationId = payload.conversationId || payload.from || payload.userId
    const userId = payload.userId || payload.from
    const message = payload.message
    let event = payload.event

    if (!event && payload.type === "message") {
      event = "user_message"
    }

    console.log("[v0] Webhook recibido:", { event, userId, conversationId, source: payload.from ? "Baileys" : "N8N" })

    try {
      const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
      if (!n8nWebhookUrl) {
        throw new Error("N8N_WEBHOOK_URL no configurada")
      }

      const n8nPayload = {
        event,
        userId,
        conversationId,
        message,
        timestamp: new Date().toISOString(),
        source: payload.from ? "baileys" : "web",
        botControllerVersion: "1.0",
        metadata: {
          userAgent: request.headers.get("user-agent"),
          ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
        },
      }

      console.log("[v0] Enviando a N8N:", n8nPayload)

      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(n8nPayload),
      })

      const n8nData = await n8nResponse.json()
      console.log("[v0] Respuesta de N8N:", n8nData)

      return NextResponse.json({
        success: true,
        event,
        message: "Webhook procesado por N8N",
        n8nResponse: n8nData,
      })
    } catch (error) {
      console.error("[v0] Error enviando a N8N:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Error procesando webhook con N8N",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("[v0] Error en webhook:", error)
    return NextResponse.json({ success: false, error: "Error parseando payload" }, { status: 500 })
  }
}

async function sendBaileysMessage(to: string, messageBody: string): Promise<void> {
  try {
    const baileysUrl = process.env.BAILEYS_SERVER_URL || "http://localhost:3001"

    // Formatear el número para Baileys (debe incluir @s.whatsapp.net)
    const formattedNumber = to.includes("@") ? to : `${to}@s.whatsapp.net`

    const response = await fetch(`${baileysUrl}/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BAILEYS_API_KEY || ""}`,
      },
      body: JSON.stringify({
        to: formattedNumber,
        message: messageBody,
        type: "text",
      }),
    })

    const data = await response.json()
    console.log("[v0] Mensaje enviado por Baileys:", { to, status: data.status })
  } catch (error) {
    console.error("[v0] Error enviando mensaje Baileys:", error)
  }
}

async function notifyOwner(conversationId: string, userId: string, message: string): Promise<void> {
  try {
    // Usar Resend para notificar por email
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "noreply@blxkstudio.com",
        to: process.env.ADMIN_EMAIL || "admin@blxkstudio.com",
        subject: `Nuevo mensaje de ${userId} - BLXK Studio Chatbot`,
        html: `
          <h2>Nuevo Mensaje en tu Chatbot</h2>
          <p><strong>De:</strong> ${userId}</p>
          <p><strong>Conversación:</strong> ${conversationId}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
          <p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/owner-dashboard">
              Ver en Dashboard
            </a>
          </p>
        `,
      }),
    })

    console.log("[v0] Notificación enviada al owner:", { conversationId, userId })
  } catch (error) {
    console.error("[v0] Error notificando owner:", error)
  }
}

async function generateBotResponseWithAI(
  userMessage: string,
  history: Array<{ sender: string; message: string; timestamp: number }>,
): Promise<string> {
  try {
    // Construir contexto del historial
    const conversationContext = history
      .slice(-5) // Últimos 5 mensajes para contexto
      .map((m) => `${m.sender}: ${m.message}`)
      .join("\n")

    const { text } = await generateText({
      model: "openai/gpt-4-mini",
      system: `Eres un asistente de atención al cliente profesional y amable para BLXK Studio.
Tu objetivo es ayudar a clientes con preguntas sobre proyectos, servicios, pedidos y soporte técnico.
Responde en máximo 2-3 líneas, de manera concisa y útil.
Si no sabes la respuesta, ofrece conectar con un especialista.`,
      prompt: `${conversationContext}\ncliente: ${userMessage}\nasistente:`,
    })

    return text.trim()
  } catch (error) {
    console.error("[v0] Error generando respuesta IA:", error)
    // Fallback si IA falla
    return "Gracias por tu mensaje. Un especialista te responderá pronto. ¿Hay algo más en lo que pueda ayudarte?"
  }
}

async function checkOwnerTimeout(conversationId: string, userId: string): Promise<void> {
  const state = conversationStates.get(conversationId)
  if (!state) return

  const inactivityTime = Date.now() - state.lastOwnerMessageTime
  const TIMEOUT_MS = 120000 // 2 minutos

  if (inactivityTime >= TIMEOUT_MS && !state.botActive) {
    console.log("[v0] Timeout detectado, reactivando bot...")

    // Hacer llamada recursiva al webhook para procesar timeout
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/chatbot-webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "timeout",
        conversationId,
        userId,
        message: "",
        timestamp: new Date().toISOString(),
      }),
    })
  }
}
