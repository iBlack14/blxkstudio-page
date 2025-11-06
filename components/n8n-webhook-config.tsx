"use client"

import { Card } from "@/components/ui/card"
import { Code } from "lucide-react"

export function N8NWebhookConfig() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-background border-t border-primary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text">Configuración N8N Webhook</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Flujo automatizado para chatbot inteligente con control manual
          </p>
        </div>

        <Card className="neon-card-rotating p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Code size={24} className="text-primary" />
            Pasos para configurar en N8N
          </h3>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="border-l-4 border-primary pl-6 py-4">
              <h4 className="text-lg font-bold mb-2">1. Webhook de Entrada (WhatsApp)</h4>
              <div className="bg-primary/5 p-4 rounded-lg text-sm font-mono mb-3 overflow-x-auto">
                <code>
                  POST /webhook/whatsapp-input
                  <br />
                  Payload: {`{ userId, message, conversationId }`}
                </code>
              </div>
              <p className="text-muted-foreground text-sm">Recibe mensajes de WhatsApp del usuario y los procesa</p>
            </div>

            {/* Step 2 */}
            <div className="border-l-4 border-orange-500 pl-6 py-4">
              <h4 className="text-lg font-bold mb-2">2. Decidir: ¿Bot Activo?</h4>
              <div className="bg-orange-500/5 p-4 rounded-lg text-sm mb-3">
                <p className="font-mono">IF (botActive === true)</p>
                <p className="text-muted-foreground mt-2">Usar switch/condicional para evaluar estado del chatbot</p>
              </div>
            </div>

            {/* Step 3 - Path 1 */}
            <div className="border-l-4 border-green-500 pl-6 py-4">
              <h4 className="text-lg font-bold mb-2">3a. Si Bot Activo → Llamar IA</h4>
              <div className="bg-green-500/5 p-4 rounded-lg text-sm space-y-2 mb-3">
                <p className="font-mono">OpenAI API / Anthropic API</p>
                <p className="text-muted-foreground">
                  Con contexto de messageHistory para mantener conversación coherente
                </p>
              </div>
            </div>

            {/* Step 3 - Path 2 */}
            <div className="border-l-4 border-blue-500 pl-6 py-4">
              <h4 className="text-lg font-bold mb-2">3b. Si Owner Controlando → Notificar</h4>
              <div className="bg-blue-500/5 p-4 rounded-lg text-sm space-y-2 mb-3">
                <p className="font-mono">Email / Slack / Push Notification</p>
                <p className="text-muted-foreground">
                  Owner recibe notificación: usuario escribió "..." - ¿Tomar control?
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border-l-4 border-purple-500 pl-6 py-4">
              <h4 className="text-lg font-bold mb-2">4. Owner Responde (Webhook 2)</h4>
              <div className="bg-purple-500/5 p-4 rounded-lg text-sm font-mono mb-3 overflow-x-auto">
                <code>
                  POST /webhook/owner-response
                  <br />
                  Payload: {`{ conversationId, ownerMessage, takeover: true }`}
                </code>
              </div>
              <p className="text-muted-foreground text-sm">Set: botActive = false, lastOwnerMessageTime = now()</p>
            </div>

            {/* Step 5 */}
            <div className="border-l-4 border-yellow-500 pl-6 py-4">
              <h4 className="text-lg font-bold mb-2">5. Timer Inactividad (2 min)</h4>
              <div className="bg-yellow-500/5 p-4 rounded-lg text-sm mb-3">
                <p className="font-mono">Delay: 120000ms (2 minutos)</p>
                <p className="text-muted-foreground mt-2">
                  Si no hay respuesta del owner, reactivar bot automáticamente
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="border-l-4 border-primary pl-6 py-4">
              <h4 className="text-lg font-bold mb-2">6. Enviar Respuesta a Usuario</h4>
              <div className="bg-primary/5 p-4 rounded-lg text-sm font-mono mb-3 overflow-x-auto">
                <code>
                  WhatsApp API / Send Message
                  <br />
                  {`{ userId, message, timestamp }`}
                </code>
              </div>
              <p className="text-muted-foreground text-sm">Enviar respuesta (bot o owner) a través de WhatsApp</p>
            </div>

            {/* Step 7 */}
            <div className="border-l-4 border-primary pl-6 py-4">
              <h4 className="text-lg font-bold mb-2">7. Guardar en Base de Datos</h4>
              <div className="bg-primary/5 p-4 rounded-lg text-sm mb-3">
                <p className="font-mono">Supabase / Neon PostgreSQL</p>
                <p className="text-muted-foreground mt-2">
                  Almacenar messageHistory, conversationState, logs para auditoría
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* JSON Example */}
        <Card className="neon-card-rotating p-8">
          <h3 className="text-xl font-bold mb-4">Estructura de Datos</h3>
          <div className="bg-background border border-primary/30 p-4 rounded-lg text-sm font-mono overflow-x-auto">
            <pre className="text-primary">{`{
  conversationId: "conv_123",
  userId: "user_456",
  botActive: true,
  ownerInactive: true,
  lastOwnerMessageTime: 1698765432000,
  messageHistory: [
    {
      sender: "user",
      message: "Hola, ¿cuál es el precio?",
      timestamp: 1698765400000
    },
    {
      sender: "bot",
      message: "Nuestro precio base es $99/mes",
      timestamp: 1698765402000
    },
    {
      sender: "owner",
      message: "Este es el owner, tengo promoción...",
      timestamp: 1698765500000
    }
  ]
}`}</pre>
          </div>
        </Card>
      </div>
    </section>
  )
}
