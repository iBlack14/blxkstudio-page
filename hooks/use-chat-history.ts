"use client"

import { useState, useEffect } from "react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const STORAGE_KEY = "blxk-chat-history"

export function useChatHistory() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hola, soy BLXK. Estoy aquí para ayudarte con información sobre nuestros servicios y soluciones. ¿En qué puedo ayudarte?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load messages from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        const messagesWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(messagesWithDates)
      }
    } catch (error) {
      console.error("[v0] Error loading chat history:", error)
    }
    setIsLoaded(true)
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
      } catch (error) {
        console.error("[v0] Error saving chat history:", error)
      }
    }
  }, [messages, isLoaded])

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  const clearHistory = () => {
    setMessages([
      {
        id: "1",
        text: "Hola, soy BLXK. Estoy aquí para ayudarte con información sobre nuestros servicios y soluciones. ¿En qué puedo ayudarte?",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
    localStorage.removeItem(STORAGE_KEY)
  }

  return { messages, addMessage, clearHistory, isLoaded }
}
