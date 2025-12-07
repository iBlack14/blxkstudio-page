"use client"

import { useState } from "react"
import { Mail, MapPin, Building2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectFormModal } from "./project-form-modal"

export function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const industries = [
    "Agencias de turismo y hospitalidad",
    "Retail y comercio electrónico",
    "Startups tecnológicas y SaaS",
    "Instituciones educativas",
    "Emprendedores y consultores independientes",
    "Equipos internos de automatización y IT",
  ]

  const handleWhatsAppContact = () => {
    window.open(
      "https://wa.me/51953576234?text=Hola%20BLXK%20Studio,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios",
      "_blank",
    )
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Industries */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold neon-text-sm">Sectores e Industrias</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Experiencia comprobada en múltiples sectores
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="neon-card p-5 rounded-lg flex items-center gap-3 hover:scale-105 transition-all cursor-pointer group"
                >
                  <div className="w-2 h-2 rounded-full bg-primary neon-glow group-hover:scale-150 transition-transform" />
                  <span className="text-base text-foreground">{industry}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="neon-card-rotating p-12 rounded-lg space-y-10">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold neon-text-sm">Contacto</h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-loose">
                ¿Listo para transformar tu negocio? Hablemos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center neon-border hover:neon-glow transition-all">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-base text-muted-foreground mb-2 font-semibold">Email</p>
                  <a
                    href="mailto:admin@blxkstudio.com"
                    className="text-base text-foreground hover:text-primary transition-colors hover:neon-text-sm"
                  >
                    admin@blxkstudio.com
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center neon-border hover:neon-glow transition-all">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-base text-muted-foreground mb-2 font-semibold">Ubicación</p>
                  <p className="text-base text-foreground">Lima, Perú 🇵🇪</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center neon-border hover:neon-glow transition-all">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-base text-muted-foreground mb-2 font-semibold">Especialidades</p>
                  <p className="text-base text-foreground">Desarrollo web · Automatización · IA</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => setIsFormOpen(true)}
                className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
              >
                Iniciar Proyecto
              </Button>
              <Button
                size="lg"
                onClick={handleWhatsAppContact}
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © 2025 BLXK Studio. Innovación, Software y Automatización para Empresas del Futuro.
            </p>
          </div>
        </div>
      </div>

      <ProjectFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  )
}
