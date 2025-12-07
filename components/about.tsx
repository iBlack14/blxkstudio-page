/// <reference types="react" />
import React from "react";
import { Target, Eye, Lightbulb, Users, TrendingUp, Handshake, Zap } from "lucide-react"

export function About() {
  const values = [
    { icon: Lightbulb, title: "Innovación", description: "Exploramos nuevas formas de resolver problemas complejos" },
    { icon: Handshake, title: "Compromiso", description: "Entregamos excelencia con responsabilidad en cada proyecto" },
    { icon: TrendingUp, title: "Evolución", description: "Aprendemos, iteramos y mejoramos continuamente" },
    { icon: Users, title: "Colaboración", description: "Trabajamos como aliados estratégicos de nuestros clientes" },
    { icon: Zap, title: "Simplicidad", description: "La tecnología debe ser clara, útil y profundamente humana" },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-5">
            <h2 className="text-4xl md:text-5xl font-bold neon-text-sm">Sobre Nosotros</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-loose">
              Soy Alonso, desarrollador autodidacta y emprendedor digital. Lidero <span className="text-primary font-semibold">BLXK Studio</span>, una marca enfocada en software, hosting, automatización y servicios tecnológicos para empresas y emprendedores.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-loose">
              Me destaco por mi aprendizaje rápido, organización, visión técnica y creativa, ofreciendo soluciones reales adaptadas a las necesidades de cada cliente.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-loose">
              Estudiante de Ingeniería Industrial en la <span className="text-primary font-medium">UTP (Chiclayo)</span> con enfoque en ética, sostenibilidad y tecnología.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="neon-card-rotating p-8 rounded-lg space-y-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Misión</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Impulsar la transformación digital de empresas y emprendedores mediante soluciones tecnológicas inteligentes, accesibles y de alto impacto.
              </p>
            </div>

            <div className="neon-card-rotating p-8 rounded-lg space-y-4">
              <div className="flex items-center gap-3">
                <Eye className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Visión</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Convertirnos en referente de innovación y automatización en Latinoamérica, reconocidos por nuestro compromiso, excelencia técnica y soluciones que generan ventaja competitiva real.
              </p>
            </div>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-3xl font-bold text-center mb-12 neon-text-sm">Valores Fundamentales</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="neon-card-rotating p-6 rounded-lg space-y-3 hover:scale-105 transition-transform"
                >
                  <value.icon className="w-10 h-10 text-primary" />
                  <h4 className="text-xl font-bold text-foreground">{value.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
