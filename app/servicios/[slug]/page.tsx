import { Suspense } from "react"
import dynamic from "next/dynamic"
import { servicesData } from "@/lib/services-data"
import { Navigation } from "@/components/navigation"
import { FloatingThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { notFound } from "next/navigation"

const Contact = dynamic(() => import("@/components/contact").then(m => ({ default: m.Contact })), {
  loading: () => null,
})
const BlxkChatbot = dynamic(() => import("@/components/blxk-chatbot").then(m => ({ default: m.BlxkChatbot })), {
  loading: () => null,
})

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }))
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = servicesData.find((s) => s.slug === params.slug)

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <FloatingThemeToggle />

      {/* Header Navigation */}
      <div className="sticky top-0 z-40 bg-background/50 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <Link href="/servicios" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver a servicios
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            {/* Icon and Title */}
            <div className="space-y-3 md:space-y-4">
              <div className="text-5xl md:text-7xl">{service.icon}</div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold neon-text-sm">{service.title}</h1>
              <p className="text-lg md:text-2xl text-primary font-semibold">{service.subtitle}</p>
              <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">{service.fullDescription}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {service.metrics.map((metric, idx) => (
                <div key={idx} className="neon-card p-3 md:p-4 rounded-lg text-center">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">{metric.label}</p>
                  <p className="text-2xl md:text-3xl font-bold text-primary">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features and Benefits */}
      <section className="py-12 md:py-16 relative bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-12">
            {/* Features */}
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-xl md:text-3xl font-bold text-foreground">✨ Características Premium</h2>
              <div className="space-y-2 md:space-y-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-base text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-xl md:text-3xl font-bold text-foreground">⭐ Beneficios Clave</h2>
              <div className="space-y-2 md:space-y-3">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="neon-card p-3 md:p-4 rounded-lg space-y-2">
                    <p className="text-xs md:text-base font-semibold text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
            <div className="text-center space-y-2 md:space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold neon-text-sm">Casos de Uso</h2>
              <p className="text-sm md:text-lg text-muted-foreground">Soluciones para diferentes tipos de negocio</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {service.useCases.map((useCase, idx) => (
                <div key={idx} className="neon-card-rotating p-4 md:p-6 rounded-lg space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">{useCase.title}</h3>
                  <p className="text-xs md:text-base text-muted-foreground">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {service.testimonials.length > 0 && (
        <section className="py-12 md:py-16 relative bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
              <div className="text-center space-y-2 md:space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold neon-text-sm">Lo que dicen nuestros clientes</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {service.testimonials.map((testimonial, idx) => (
                  <div key={idx} className="neon-card p-4 md:p-6 rounded-lg space-y-4">
                    <p className="text-sm md:text-lg italic text-foreground">"{testimonial.text}"</p>
                    <div className="space-y-1">
                      <p className="font-bold text-sm md:text-base text-foreground">
                        {testimonial.avatar} {testimonial.name}
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">¿Listo para transformar tu negocio?</h2>
              <p className="text-sm md:text-lg lg:text-xl text-muted-foreground">
                Hablemos sobre cómo {service.title.toLowerCase()} puede ayudarte a alcanzar tus objetivos
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button className="px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground rounded-lg font-bold text-sm md:text-base lg:text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
                {service.cta.primary}
              </button>
              <button className="px-6 md:px-8 py-3 md:py-4 border border-primary/40 text-primary rounded-lg font-bold text-sm md:text-base lg:text-lg hover:bg-primary/10 transition-all hover:scale-105 active:scale-95">
                {service.cta.secondary}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 md:py-16 relative bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
            <h2 className="text-xl md:text-3xl font-bold neon-text-sm">Otros servicios que te podrían interesar</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {servicesData
                .filter((s) => s.id !== service.id)
                .slice(0, 3)
                .map((relatedService) => (
                  <Link key={relatedService.id} href={`/servicios/${relatedService.slug}`}>
                    <div className="neon-card-rotating p-4 md:p-6 rounded-lg h-full cursor-pointer group">
                      <div className="text-4xl md:text-5xl mb-2 md:mb-3">{relatedService.icon}</div>
                      <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{relatedService.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
                        {relatedService.shortDescription}
                      </p>
                      <p className="text-primary text-xs md:text-sm font-semibold group-hover:translate-x-2 transition-transform">
                        Explorar →
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Contact />
      </Suspense>
      <Suspense fallback={null}>
        <BlxkChatbot />
      </Suspense>
    </main>
  )
}
