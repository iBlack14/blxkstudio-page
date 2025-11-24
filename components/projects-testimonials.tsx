"use client"

import { Star, Quote } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ProjectsTestimonials() {
  const testimonials = [
    {
      quote:
        "BLXK Studio transformó completamente nuestro flujo de ventas. La integración WhatsApp aumentó nuestras conversiones en 340%.",
      author: "Carlos Mendoza",
      role: "CEO, E-commerce Perú",
      stars: 5,
    },
    {
      quote:
        "El dashboard administrativo es increíble. Ahora gestionamos todo desde un mismo lugar. Imposible vivir sin él.",
      author: "María García",
      role: "Operations Manager, Startup Tech",
      stars: 5,
    },
    {
      quote: "La automatización con N8N eliminó horas de trabajo manual. Fue la mejor inversión que hicimos este año.",
      author: "Jorge López",
      role: "Director de Operaciones, Retail",
      stars: 5,
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid-pattern opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold neon-text">Lo que Dicen Nuestros Clientes</h2>
            <p className="text-muted-foreground text-lg">Testimonios reales de empresas transformadas</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="neon-card-rotating p-8">
                <div className="space-y-4">
                  <Quote className="w-6 h-6 text-primary/50" />
                  <p className="text-foreground text-base leading-relaxed">{testimonial.quote}</p>

                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
