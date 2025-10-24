"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { ProjectFormModal } from "./project-form-modal"

export function Hero() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse [animation-delay:1000ms]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse [animation-delay:500ms]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 backdrop-blur-md neon-border">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Startup Tecnológica Peruana</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="neon-text">BLXK STUDIO</span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            Innovación, Software y Automatización para Empresas del Futuro
          </p>

          <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed text-pretty animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            Democratizamos la tecnología acercando herramientas innovadoras y accesibles a negocios, emprendedores y
            organizaciones que buscan digitalizar sus procesos y escalar con inteligencia.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <Button
              size="lg"
              onClick={() => setIsFormOpen(true)}
              className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 transition-all hover:scale-105 active:scale-95"
            >
              Iniciar Proyecto
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 text-lg px-8 bg-transparent backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
            >
              Conocer Más
            </Button>
          </div>
        </div>
      </div>

      <ProjectFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  )
}
