"use client"

import type React from "react"

import { useState } from "react"
import { X, Send, Loader2, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ProjectFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectFormModal({ isOpen, onClose }: ProjectFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showPlaneAnimation, setShowPlaneAnimation] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setShowPlaneAnimation(true)
        setFormData({ name: "", email: "", phone: "", company: "", message: "" })
        setTimeout(() => {
          setShowPlaneAnimation(false)
          onClose()
          setSubmitStatus("idle")
        }, 3000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("[v0] Error sending email:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {showPlaneAnimation && (
        <div className="absolute inset-0 z-[110] flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20 animate-pulse" />
          <Plane className="w-24 h-24 text-primary neon-glow animate-plane-fly" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-20">
            <h3 className="text-5xl font-bold neon-text animate-neon-pulse">ENVIADO</h3>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl rounded-2xl neon-card-rotating p-8 animate-in zoom-in-95 duration-300 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary/10 transition-colors z-10"
        >
          <X className="w-5 h-5 text-muted-foreground hover:text-primary" />
        </button>

        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold neon-text">Iniciar Proyecto</h2>
          <p className="text-muted-foreground leading-relaxed">
            Cuéntanos sobre tu proyecto y nos pondremos en contacto contigo
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Nombre completo *
              </label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/50 border-primary/30 focus:border-primary neon-input"
                placeholder="Juan Pérez"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email *
              </label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background/50 border-primary/30 focus:border-primary neon-input"
                placeholder="juan@empresa.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">
                Teléfono
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-background/50 border-primary/30 focus:border-primary neon-input"
                placeholder="+51 999 999 999"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-foreground">
                Empresa
              </label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-background/50 border-primary/30 focus:border-primary neon-input"
                placeholder="Mi Empresa S.A.C."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Cuéntanos sobre tu proyecto *
            </label>
            <Textarea
              id="message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-background/50 border-primary/30 focus:border-primary neon-input min-h-[120px] resize-none"
              placeholder="Describe tu proyecto, necesidades y objetivos..."
            />
          </div>

          {/* Status messages */}
          {submitStatus === "success" && !showPlaneAnimation && (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500 text-sm text-center animate-in fade-in duration-300">
              ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm text-center animate-in fade-in duration-300">
              Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full neon-glow bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6 transition-all hover:scale-105 active:scale-95"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Enviar Proyecto
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
