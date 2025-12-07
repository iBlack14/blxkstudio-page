"use client"

import { useState } from "react"
import { servicesProposalData } from "@/lib/services-proposal-data"
import { CheckCircle2, TrendingUp, Users, Zap } from "lucide-react"

export function ServicesProposal({ isHomeVersion = false }) {
  const [expandedId, setExpandedId] = useState<number | null>(isHomeVersion ? null : 1)
  const [activeTab, setActiveTab] = useState<string>("overview")

  const displayServices = isHomeVersion ? servicesProposalData.slice(0, 2) : servicesProposalData
  const sectionTitle = isHomeVersion ? "Propuesta de Valor Superior" : "Propuesta de Servicios Superior"
  const sectionDesc = isHomeVersion
    ? "Nuestras soluciones superan los estándares del mercado en rendimiento, seguridad y ROI"
    : "BLXK Studio se posiciona como el socio estratégico para el desarrollo digital"

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
    setActiveTab("overview")
  }

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold neon-text-sm">{sectionTitle}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-loose">
              {sectionDesc}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {displayServices.map((service) => (
              <div
                key={service.id}
                onClick={() => toggleExpand(service.id)}
                className="cursor-pointer"
              >
                <div className="neon-card-rotating p-6 rounded-lg space-y-4 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{service.icon}</div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                      <p className="text-lg text-primary font-semibold">{service.description}</p>
                    </div>
                  </div>

                  <p className="text-base text-muted-foreground leading-relaxed">{service.introduction}</p>

                  {/* Expandable Content */}
                  {expandedId === service.id && (
                    <div className="pt-6 space-y-6 border-t border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
                      {/* Tabs */}
                      <div className="space-y-4">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {[
                            { id: "overview", label: "Visión General", icon: "📋" },
                            { id: "comparison", label: "BLXK vs Mercado", icon: "⚖️" },
                            { id: "advantages", label: "Ventajas", icon: "⭐" },
                            { id: "usecases", label: "Casos de Uso", icon: "🎯" },
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveTab(tab.id)
                              }}
                              className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                                activeTab === tab.id
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-primary/10 text-primary hover:bg-primary/20"
                              }`}
                            >
                              {tab.icon} {tab.label}
                            </button>
                          ))}
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-4">
                          {activeTab === "overview" && (
                            <div className="space-y-4">
                              <h4 className="text-lg font-semibold text-foreground">Métricas Clave</h4>
                              <div className="grid grid-cols-2 gap-4">
                                {service.metrics.map((metric, idx) => (
                                  <div
                                    key={idx}
                                    className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-1"
                                  >
                                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                                    <p className="text-xl font-bold text-primary">{metric.value}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {activeTab === "comparison" && (
                            <div className="space-y-4">
                              {service.features.map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="space-y-3 p-4 rounded-lg bg-primary/5 border border-primary/20"
                                >
                                  <h5 className="font-semibold text-foreground text-base">{feature.label}</h5>
                                  <div className="space-y-2">
                                    <div className="flex gap-2">
                                      <span className="text-sm font-medium text-muted-foreground min-w-20">
                                        Estándar:
                                      </span>
                                      <span className="text-sm text-muted-foreground">{feature.standard}</span>
                                    </div>
                                    <div className="flex gap-2">
                                      <span className="text-sm font-medium text-primary min-w-20">BLXK:</span>
                                      <span className="text-sm text-primary font-medium">{feature.blxk}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {activeTab === "advantages" && (
                            <div className="space-y-3">
                              {service.advantages.map((advantage, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                  <span className="text-base text-muted-foreground leading-relaxed">
                                    {advantage}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {activeTab === "usecases" && (
                            <div className="space-y-3">
                              {service.useCases.map((useCase, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                  <span className="text-base text-muted-foreground leading-relaxed">{useCase}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <button className="w-full mt-4 px-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary text-base font-semibold rounded-lg transition-colors">
                        Solicitar Más Información
                      </button>
                    </div>
                  )}

                  {/* Collapse indicator */}
                  {expandedId !== service.id && (
                    <div className="flex items-center gap-2 text-primary text-sm font-semibold pt-2">
                      <Zap className="w-4 h-4" />
                      Haz clic para ver detalles
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Full Services CTA */}
          {isHomeVersion && (
            <div className="text-center pt-8">
              <a
                href="/servicios"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105"
              >
                Ver Todos los Servicios
                <TrendingUp className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
