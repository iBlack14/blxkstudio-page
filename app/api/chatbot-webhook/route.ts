import { type NextRequest, NextResponse } from "next/server"

interface WebhookPayload {
  event: "user_message" | "owner_response" | "timeout"
  userId: string
  message: string
  conversationId: string
  timestamp: string
  botActive: boolean
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

// Map para almacenar estado de conversaciones (en producción usar Supabase/Redis)
const conversationStates = new Map<string, ConversationState>()

export async function POST(request: NextRequest) {
  try {
    const payload: WebhookPayload = await request.json()

    const { event, userId, message, conversationId, botActive } = payload

    console.log("[v0] Webhook recibido:", { event, userId, conversationId })

    // Obtener o crear estado de conversación
    let conversationState = conversationStates.get(conversationId)
    if (!conversationState) {
      conversationState = {
        conversationId,
        botActive: true,
        ownerInactive: true,
        lastOwnerMessageTime: 0,
        messageHistory: [],
      }
    }

    // Procesar según el evento
    switch (event) {
      case "user_message":
        // Guardar mensaje del usuario
        conversationState.messageHistory.push({
          sender: "user",
          message,
          timestamp: Date.now(),
        })

        // Enviar notificación al owner
        await notifyOwner(conversationId, userId, message)

        // Si bot está activo, generar respuesta
        if (conversationState.botActive) {
          const botResponse = await generateBotResponse(message, conversationState.messageHistory)
          conversationState.messageHistory.push({
            sender: "bot",
            message: botResponse,
            timestamp: Date.now(),
          })

          // Enviar respuesta al usuario
          await sendBotMessageToUser(conversationId, userId, botResponse)
        }
        break

      case "owner_response":
        // Owner toma control
        conversationState.botActive = false
        conversationState.ownerInactive = false
        conversationState.lastOwnerMessageTime = Date.now()

        // Guardar mensaje del owner
        conversationState.messageHistory.push({
          sender: "owner",
          message,
          timestamp: Date.now(),
        })

        // Enviar mensaje al usuario
        await sendOwnerMessageToUser(conversationId, userId, message)

        // Resetear timer inactividad
        setTimeout(() => checkOwnerTimeout(conversationId), 120000) // 2 minutos

        console.log("[v0] Owner respondió, bot pausado")
        break

      case "timeout":
        // Owner se quedó inactivo, reactivar bot
        conversationState.botActive = true
        conversationState.ownerInactive = true

        const timeoutMessage = "Bot reactivado. Continuaremos asistiendo automáticamente."
        conversationState.messageHistory.push({
          sender: "bot",
          message: timeoutMessage,
          timestamp: Date.now(),
        })

        await sendBotMessageToUser(conversationId, userId, timeoutMessage)

        console.log("[v0] Timeout: Bot retomó control")
        break
    }

    // Guardar estado actualizado
    conversationStates.set(conversationId, conversationState)

    return NextResponse.json({
      success: true,
      conversationState,
      message: "Webhook procesado correctamente",
    })
  } catch (error) {
    console.error("[v0] Error en webhook:", error)
    return NextResponse.json({ success: false, error: "Error procesando webhook" }, { status: 500 })
  }
}

// Funciones auxiliares (en producción, integrar con servicios reales)

async function notifyOwner(conversationId: string, userId: string, message: string): Promise<void> {
  console.log("[v0] Notificación al owner:", {
    conversationId,
    userId,
    message: message.substring(0, 50),
  })
  // Enviar email/SMS/push al owner con mensaje del usuario
}

async function generateBotResponse(
  userMessage: string,
  history: Array<{ sender: string; message: string; timestamp: number }>,
): Promise<string> {
  // En producción: integrar con OpenAI, Anthropic, etc usando AI SDK
  const responses = [
    "Gracias por tu mensaje. Estoy aquí para ayudarte.",
    "Entiendo tu pregunta. Déjame procesarla.",
    "Excelente, continuamos con tu solicitud.",
    "Perfecto, aquí está la información que solicitabas.",
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

async function sendBotMessageToUser(conversationId: string, userId: string, message: string): Promise<void> {
  console.log("[v0] Bot enviando mensaje:", { conversationId, userId, message: message.substring(0, 50) })
  // Enviar mensaje por WhatsApp API
}

async function sendOwnerMessageToUser(conversationId: string, userId: string, message: string): Promise<void> {
  console.log("[v0] Owner enviando mensaje:", { conversationId, userId, message: message.substring(0, 50) })
  // Enviar mensaje por WhatsApp API
}

async function checkOwnerTimeout(conversationId: string): Promise<void> {
  const state = conversationStates.get(conversationId)
  if (!state) return

  const inactivityTime = Date.now() - state.lastOwnerMessageTime
  const TIMEOUT_MS = 120000 // 2 minutos

  if (inactivityTime >= TIMEOUT_MS && !state.botActive) {
    // Reactivar bot
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/chatbot-webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "timeout",
        conversationId,
        userId: "",
        message: "",
        timestamp: new Date().toISOString(),
      }),
    })
  }
}
