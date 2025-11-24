"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProjectsHero() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects-showcase")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden py-8 md:py-12 lg:py-20">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute inset-0 hero-grid-pattern opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Portafolio Premium 2025</span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-balance">
              <span className="neon-text">Soluciones</span> Empresariales
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                de Clase Mundial
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Descubre cómo transformamos visiones en realidades. 5 proyectos premium que demuestran expertise en
              desarrollo full-stack, automatización inteligente y arquitectura escalable de sistemas empresariales.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90 group"
            >
              Ver Proyectos
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary bg-transparent"
            >
              Descargar Portafolio
            </Button>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-3 gap-4 pt-12 text-center">
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">5</p>
              <p className="text-sm text-muted-foreground">Proyectos Premium</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">15+</p>
              <p className="text-sm text-muted-foreground">Tecnologías</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground">Personalizados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
