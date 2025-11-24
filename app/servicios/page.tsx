"use client"

import { servicesData } from "@/lib/services-data"
import { Navigation } from "@/components/navigation"
import { FloatingThemeToggle } from "@/components/theme-toggle"
import { Contact } from "@/components/contact"
import { BlxkChatbot } from "@/components/blxk-chatbot"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <FloatingThemeToggle />

      {/* Hero Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold neon-text-sm">Nuestros Servicios</h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
              Soluciones integrales para transformar tu negocio con tecnología de punta
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
            {servicesData.map((service) => (
              <Link key={service.id} href={`/servicios/${service.slug}`}>
                <div className="neon-card-rotating p-6 rounded-lg h-full cursor-pointer group transition-all hover:scale-105">
                  {/* Icon */}
                  <div className="text-5xl mb-4">{service.icon}</div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-2">{service.title}</h3>

                  {/* Subtitle */}
                  <p className="text-sm text-primary font-medium mb-4">{service.subtitle}</p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{service.shortDescription}</p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:translate-x-2 transition-transform">
                    Ver detalles
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features comparison section */}
      <section className="py-20 relative bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold neon-text-sm">¿Por qué elegir BLXK?</h2>
              <p className="text-lg text-muted-foreground">Cada solución está diseñada para maximizar tu ROI</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {[
                { icon: "⚡", title: "Performance", desc: "Velocidad y optimización garantizada" },
                { icon: "🎯", title: "Conversión", desc: "Diseñado para vender desde el día 1" },
                { icon: "🔒", title: "Seguridad", desc: "Infraestructura enterprise-grade" },
                { icon: "📈", title: "Escalable", desc: "Crece con tu negocio sin límites" },
                { icon: "🤝", title: "Soporte", desc: "Equipo dedicado siempre disponible" },
                { icon: "🎨", title: "Diseño", desc: "UI/UX premium y personalizado" },
              ].map((item, idx) => (
                <div key={idx} className="space-y-3 p-6 rounded-lg border border-primary/20 bg-primary/5">
                  <div className="text-4xl">{item.icon}</div>
                  <h4 className="text-lg font-bold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <BlxkChatbot />
    </main>
  )
}
