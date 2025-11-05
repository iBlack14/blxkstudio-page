"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Zap } from "lucide-react"

export function FounderHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background flex items-center pt-4">
      <div className="absolute inset-0">
        {/* Dynamic lightning glow following cursor */}
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{
            background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
            transition: "all 0.2s ease-out",
            pointerEvents: "none",
          }}
        />

        {/* Electric grid pattern background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="electric-grid" x="80" y="80" width="160" height="160" patternUnits="userSpaceOnUse">
              <path d="M0,80 L80,0 L160,80 L80,160 Z" stroke="var(--color-primary)" fill="none" strokeWidth="0.5" />
              <circle cx="0" cy="80" r="1.5" fill="var(--color-primary)" />
              <circle cx="80" cy="0" r="1.5" fill="var(--color-primary)" />
              <circle cx="160" cy="80" r="1.5" fill="var(--color-primary)" />
              <circle cx="80" cy="160" r="1.5" fill="var(--color-primary)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#electric-grid)" />
        </svg>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationName: "pulse",
                animationDuration: `${2 + Math.random() * 2}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDelay: `${i * 0.3}s`,
                opacity: 0.4,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={`space-y-8 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Fundador & Full-Stack Developer</span>
            </div>

            {/* Main heading */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-primary/80">BIENVENIDO</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block">Hola, soy</span>
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent block">
                  Alonso
                </span>
              </h1>
            </div>

            {/* Main description */}
            <div className="space-y-4 text-base md:text-lg text-muted-foreground/90 leading-relaxed max-w-lg">
              <p>
                Fundador de <span className="text-primary font-semibold">BLXK Studio</span> — empresa especializada en{" "}
                <span className="text-primary font-medium">desarrollo empresarial, automatización e IA</span>.
              </p>
              <p>
                Creo soluciones que conectan tecnología con eficiencia real, transformando negocios a través de
                automatización inteligente, integraciones API y arquitectura escalable.
              </p>
              <p>
                Estudiante de Ingeniería Industrial en la{" "}
                <span className="text-primary font-medium">UTP (Chiclayo)</span> con enfoque en ética, sostenibilidad y
                tecnología.
              </p>
            </div>

            {/* Philosophy quote */}
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm">
              <p className="text-sm font-medium text-primary mb-1">Filosofía</p>
              <p className="text-base italic text-muted-foreground">
                "La tecnología no solo debe verse bien, debe funcionar bien."
              </p>
            </div>

            {/* Stack Tecnológico */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">Stack Tecnológico</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "Node.js",
                  "n8n",
                  "OpenAI",
                  "Supabase",
                  "PostgreSQL",
                  "API REST",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-primary/30 text-primary/70 backdrop-blur-sm hover:border-primary/70 hover:text-primary transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                Ver Portafolio
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 border border-primary/40 text-primary rounded-lg font-semibold text-sm hover:bg-primary/10 transition-all hover:scale-105 active:scale-95">
                Contactar
              </button>
            </div>
          </div>

          <div
            className={`relative flex justify-center transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div className="relative w-full max-w-sm">
              {/* Animated glow background */}
              <div className="absolute -inset-2 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent rounded-3xl blur-2xl opacity-50 animate-pulse" />

              {/* Main image container */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-primary/30 bg-gradient-to-br from-card/50 to-card/20 backdrop-blur-xl group">
                {/* Image placeholder - replace with your photo */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
                  alt="Alonso - Fundador BLXK Studio"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                {/* Lightning effect overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <defs>
                      <filter id="electric-glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <path
                      d="M200,10 L210,50 L190,60 L220,120 L180,130 L200,200"
                      stroke="var(--color-primary)"
                      strokeWidth="1.5"
                      fill="none"
                      opacity="0.6"
                      filter="url(#electric-glow)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Info badge */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
                  <h3 className="text-lg font-bold text-foreground">Alonso</h3>
                  <p className="text-xs text-primary font-semibold">Fundador BLXK Studio</p>
                </div>
              </div>

              {/* Stats badges below image */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm text-center">
                  <p className="text-lg font-bold text-primary">5+</p>
                  <p className="text-xs text-muted-foreground">Años Experiencia</p>
                </div>
                <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm text-center">
                  <p className="text-lg font-bold text-primary">30+</p>
                  <p className="text-xs text-muted-foreground">Proyectos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Alonso",
            jobTitle: "Full-Stack Developer & Founder",
            affiliation: { "@type": "Organization", name: "BLXK Studio" },
            knowsAbout: ["Software Development", "Automation", "AI", "API Design", "Backend"],
          }),
        }}
      />
    </section>
  )
}
