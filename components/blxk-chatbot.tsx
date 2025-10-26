"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Trash2 } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { useChatHistory } from "@/hooks/use-chat-history"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function BlxkChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, addMessage, clearHistory, isLoaded } = useChatHistory()
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { isDayMode } = useTheme()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    addMessage(userMessage)
    const userInput = input
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userInput,
          conversationHistory: messages.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      }
      addMessage(botMessage)
    } catch (error) {
      console.error("[v0] Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Lo siento, hubo un error al procesar tu pregunta. Por favor, intenta de nuevo.",
        sender: "bot",
        timestamp: new Date(),
      }
      addMessage(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoaded) return null

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-40 p-4 rounded-full shadow-2xl transition-all duration-300 md:bottom-8 md:right-8 bottom-24 right-8 ${
          isDayMode
            ? "bg-gradient-to-br from-cyan-400 to-cyan-500 hover:shadow-cyan-400/50"
            : "bg-gradient-to-br from-cyan-500 to-magenta-500 hover:shadow-cyan-500/50"
        } hover:scale-110 shadow-lg hover:shadow-2xl`}
        aria-label="Open BLXK Chatbot"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4 md:p-8">
          <div
            className={`w-full max-w-md max-h-[600px] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 flex flex-col ${
              isDayMode ? "bg-white border border-gray-200" : "bg-slate-900 border border-slate-700"
            }`}
          >
            {/* Header */}
            <div
              className={`p-4 flex justify-between items-start flex-shrink-0 ${
                isDayMode ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-gradient-to-r from-cyan-500 to-magenta-500"
              }`}
            >
              <div>
                <h3 className="text-white font-bold text-lg">BLXK Assistant</h3>
                <p className="text-white/80 text-sm">Información y soporte</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={clearHistory}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title="Limpiar historial"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title="Cerrar chat"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

          {/* Messages Container */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDayMode ? "bg-gray-50" : "bg-slate-800"}`}>
            {messages.length === 0 && (
              <div className={`text-center py-8 ${isDayMode ? "text-gray-500" : "text-slate-400"}`}>
                <p className="text-sm">Hola, soy BLXK Assistant</p>
                <p className="text-xs mt-2">Pregúntame sobre nuestros servicios</p>
              </div>
            )}
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? isDayMode
                        ? "bg-blue-500 text-white"
                        : "bg-cyan-500 text-slate-900"
                      : isDayMode
                        ? "bg-gray-200 text-gray-900"
                        : "bg-slate-700 text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`px-4 py-2 rounded-lg ${isDayMode ? "bg-gray-200" : "bg-slate-700"}`}>
                  <div className="flex space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full animate-bounce ${isDayMode ? "bg-gray-600" : "bg-cyan-400"}`}
                    />
                    <div
                      className={`w-2 h-2 rounded-full animate-bounce delay-100 ${
                        isDayMode ? "bg-gray-600" : "bg-cyan-400"
                      }`}
                    />
                    <div
                      className={`w-2 h-2 rounded-full animate-bounce delay-200 ${
                        isDayMode ? "bg-gray-600" : "bg-cyan-400"
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className={`p-4 border-t flex-shrink-0 ${isDayMode ? "bg-white border-gray-200" : "bg-slate-800 border-slate-700"}`}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className={`flex-1 px-4 py-2 rounded-lg border transition-colors text-sm ${
                  isDayMode
                    ? "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    : "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  isDayMode ? "focus:ring-blue-500" : "focus:ring-cyan-500"
                }`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                  isDayMode
                    ? "bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
                    : "bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600"
                } text-white disabled:cursor-not-allowed`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
        </div>
      )}
    </>
  )
}
