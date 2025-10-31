"use client"

import { Check, X } from "lucide-react"

export function ProjectsComparison() {
  const features = [
    { name: "Integración WhatsApp", blxk: true, generic: false },
    { name: "Automatización N8N", blxk: true, generic: false },
    { name: "Dashboard Personalizado", blxk: true, generic: true },
    { name: "Soporte 24/7", blxk: true, generic: false },
    { name: "Escalabilidad Ilimitada", blxk: true, generic: false },
    { name: "Seguridad Enterprise", blxk: true, generic: true },
    { name: "API Documentada", blxk: true, generic: true },
    { name: "ROI Garantizado", blxk: true, generic: false },
  ]

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold neon-text">Por qué Elegirnos</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comparación de características y capacidades
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-primary/20">
            <table className="w-full">
              <thead className="bg-primary/5 border-b border-primary/20">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Característica</th>
                  <th className="px-6 py-4 text-center font-semibold text-primary">BLXK Studio</th>
                  <th className="px-6 py-4 text-center font-semibold text-muted-foreground">Soluciones Genéricas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {features.map((feature, idx) => (
                  <tr key={idx} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4 text-foreground font-medium">{feature.name}</td>
                    <td className="px-6 py-4 text-center">
                      {feature.blxk ? (
                        <Check className="w-5 h-5 text-primary mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {feature.generic ? (
                        <Check className="w-5 h-5 text-muted-foreground mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
