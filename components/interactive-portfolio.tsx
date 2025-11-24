"use client"

import { ExternalLink, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card3DEffect } from "./3d-card-effect"

export function InteractivePortfolio() {
  const projects = [
    {
      name: "Wazilrest",
      description: "Plataforma API WhatsApp",
      details:
        "Infraestructura tipo WhatsApp Cloud API con servicios para chatbots, campañas automáticas y atención multicanal en tiempo real.",
      stack: "Node.js · Express · PostgreSQL · Docker",
      status: "Beta pública",
    },
    {
      name: "WJL Turismo Bot",
      description: "Asistente Virtual con IA",
      details:
        "Bot inteligente para agencia de viajes con IA conversacional, respuestas contextuales y escalado a agentes humanos.",
      stack: "n8n · OpenAI API · WhatsApp Cloud API",
      status: "Producción",
    },
    {
      name: "Sistema de Gestión de Alimentos",
      description: "Plataforma empresarial",
      details: "Control de inventario, ventas y usuarios con arquitectura MVC robusta.",
      stack: "Java 8 · Spring Boot · MySQL · Thymeleaf",
      status: "Producción",
    },
    {
      name: "Dashboard de Ventas Ejecutivo",
      description: "Panel administrativo",
      details: "Panel con roles, inventario y facturación integrado con CMS headless.",
      stack: "Strapi · Next.js · TailwindCSS",
      status: "Producción",
    },
    {
      name: "BLXK Automation",
      description: "Flujos Empresariales",
      details:
        "Motor de automatización para envío masivo multicanal con segmentación inteligente y analítica integrada.",
      stack: "n8n · Node.js · APIs externas",
      status: "Producción",
    },
    {
      name: "BLXK AI Chat",
      description: "Asistente Corporativo",
      details: "Chat empresarial con IA entrenada con knowledge base interno, integrable con WhatsApp y Telegram.",
      stack: "OpenAI API · React · TailwindCSS",
      status: "Producción",
    },
  ]

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold neon-text-sm">Portfolio de Proyectos</h2>
            <p className="text-lg text-muted-foreground">Soluciones reales que transforman negocios</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card3DEffect key={index} className="h-full">
                <div className="neon-card-rotating rounded-lg p-6 space-y-4 hover:scale-105 transition-all group h-full">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-primary">{project.description}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{project.details}</p>

                  <div className="space-y-2 mt-auto">
                    <p className="text-xs text-muted-foreground font-mono">{project.stack}</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-xs text-primary">{project.status}</span>
                    </div>
                  </div>
                </div>
              </Card3DEffect>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link href="/projects">
              <Button size="lg" className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90">
                Ver Todos los Proyectos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
