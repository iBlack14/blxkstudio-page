"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Send, AlertCircle, CheckCircle } from "lucide-react"

interface ChatMessage {
  id: string
  sender: "user" | "bot" | "owner"
  message: string
  timestamp: Date
  isFromBot: boolean
}

export function SmartChatbotHandler() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isOwnerMode, setIsOwnerMode] = useState(false)
  const [botActive, setBotActive] = useState(true)
  const [ownerInactive, setOwnerInactive] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simular recepción de mensaje del usuario
  const handleUserMessage = async (text: string) => {
    if (!text.trim()) return

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      message: text,
      timestamp: new Date(),
      isFromBot: false,
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue("")

    // Notificar al owner
    console.log("[v0] Usuario escribió:", text)

    // Si bot está activo, responder
    if (botActive) {
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: `msg-${Date.now()}-bot`,
          sender: "bot",
          message: `Bot: "${text.substring(0, 20)}..." - Respuesta automática generada`,
          timestamp: new Date(),
          isFromBot: true,
        }
        setMessages((prev) => [...prev, botResponse])
      }, 500)

      // Notificación al owner
      setTimeout(() => {
        console.log("[v0] Owner recibe notificación: Nuevo mensaje")
      }, 1000)
    }
  }

  // Owner toma control
  const handleOwnerTakeControl = () => {
    setBotActive(false)
    setOwnerInactive(false)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    console.log("[v0] Owner tomó control del chatbot")
  }

  // Owner responde
  const handleOwnerResponse = async () => {
    if (!inputValue.trim()) return

    const ownerMsg: ChatMessage = {
      id: `msg-${Date.now()}-owner`,
      sender: "owner",
      message: inputValue,
      timestamp: new Date(),
      isFromBot: false,
    }

    setMessages((prev) => [...prev, ownerMsg])
    setInputValue("")

    // Resetear timer inactividad
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    // Si no hay respuesta en 1-2 minutos, chatbot retoma control
    timeoutRef.current = setTimeout(() => {
      setBotActive(true)
      setOwnerInactive(true)
      console.log("[v0] Timeout: Chatbot retoma control")
    }, 120000) // 2 minutos
  }

  // Owner libera control
  const handleReleaseControl = () => {
    setBotActive(true)
    setOwnerInactive(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    console.log("[v0] Owner liberó control - Bot activo nuevamente")
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <MessageCircle className="text-primary" size={24} />
        <h3 className="text-2xl font-bold">Chatbot Inteligente con Control Manual</h3>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Estado Bot</div>
          <div className={`flex items-center justify-center gap-2 ${botActive ? "text-green-400" : "text-yellow-400"}`}>
            <CheckCircle size={16} />
            <span className="font-bold">{botActive ? "Activo" : "Pausado"}</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Control</div>
          <div className={`flex items-center justify-center gap-2 ${!botActive ? "text-blue-400" : "text-gray-500"}`}>
            <AlertCircle size={16} />
            <span className="font-bold">{!botActive ? "Owner" : "Bot"}</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Inactividad</div>
          <div className="text-orange-400 font-bold">{ownerInactive ? "2 min" : "En espera"}</div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-80 overflow-y-auto mb-4 p-4 bg-background rounded-lg border border-primary/20 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
            <p>Comienza una conversación</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : msg.sender === "bot"
                      ? "bg-purple-500/20 border border-purple-500/50 text-purple-100"
                      : "bg-blue-500/20 border border-blue-500/50 text-blue-100"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {msg.timestamp.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="space-y-3 mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                isOwnerMode ? handleOwnerResponse() : handleUserMessage(inputValue)
              }
            }}
            placeholder={isOwnerMode ? "Respuesta del owner..." : "Mensaje del usuario..."}
            className="flex-1 px-4 py-2 bg-background border border-primary/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
          />
          <Button
            onClick={() => (isOwnerMode ? handleOwnerResponse() : handleUserMessage(inputValue))}
            className="bg-primary hover:bg-primary/90"
          >
            <Send size={18} />
          </Button>
        </div>

        {/* Mode Toggle */}
        <Button
          onClick={() => setIsOwnerMode(!isOwnerMode)}
          variant={isOwnerMode ? "default" : "outline"}
          className="w-full"
        >
          {isOwnerMode ? "Modo Owner (Activo)" : "Cambiar a Modo Owner"}
        </Button>

        {/* Owner Controls */}
        {isOwnerMode && (
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleOwnerTakeControl}
              disabled={!botActive}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              Tomar Control
            </Button>
            <Button
              onClick={handleReleaseControl}
              disabled={botActive}
              className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
            >
              Liberar Control
            </Button>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm text-muted-foreground">
        <p className="mb-2 font-bold text-foreground">Cómo funciona:</p>
        <ul className="space-y-1 text-xs">
          <li>1. Usuario escribe → Bot responde automáticamente</li>
          <li>2. Owner recibe notificación en tiempo real</li>
          <li>3. Owner puede tomar control y responder manualmente</li>
          <li>4. Si Owner no responde en 2 minutos, Bot retoma control automáticamente</li>
          <li>5. Bot mantiene contexto de toda la conversación</li>
        </ul>
      </div>
    </Card>
  )
}
