"use client"

import { Globe, Bot, MessageSquare, Plug, Cloud, Palette } from "lucide-react"
import { Card3DHover } from "./3d-card-hover"

export function Services3D() {
  const services = [
    {
      icon: Globe,
      title: "Desarrollo Web y Software Empresarial",
      description:
        "Diseño y desarrollo de sistemas web, paneles de control, CRMs, ERPs y plataformas escalables a medida para optimizar operaciones empresariales.",
    },
    {
      icon: Bot,
      title: "Automatización e Inteligencia Artificial",
      description:
        "Flujos inteligentes con n8n, GPT y APIs personalizadas para automatizar atención al cliente, marketing digital y procesos internos críticos.",
    },
    {
      icon: MessageSquare,
      title: "Mensajería Masiva y Omnicanal",
      description:
        "Campañas automatizadas por WhatsApp, Telegram y Email con segmentación avanzada, análisis en tiempo real y control total de audiencias.",
    },
    {
      icon: Plug,
      title: "Integraciones y APIs",
      description:
        "Conexión seamless entre sistemas, pasarelas de pago, CRMs y plataformas externas para crear ecosistemas digitales cohesivos.",
    },
    {
      icon: Cloud,
      title: "Infraestructura y Soporte Técnico",
      description:
        "Despliegue en la nube, seguridad, mantenimiento proactivo y monitoreo 24/7 de infraestructura crítica.",
    },
    {
      icon: Palette,
      title: "Diseño y Branding Digital",
      description:
        "Creación de identidad visual, landing pages de alto impacto y materiales para fortalecer tu presencia digital.",
    },
  ]

  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-in fade-in duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold neon-text-sm">Servicios Principales</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              Soluciones end-to-end desde la conceptualización hasta la implementación
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card3DHover key={index} delay={index * 100}>
                <div className="neon-card-rotating p-6 rounded-lg space-y-4 group h-full">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:neon-glow transition-all duration-300">
                    <service.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground text-balance group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{service.description}</p>
                </div>
              </Card3DHover>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
