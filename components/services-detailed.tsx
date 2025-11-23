"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const servicesData = [
  {
    id: 1,
    title: "Páginas Web Profesionales",
    subtitle: "Ingeniería de Conversión + Performance 🔥",
    description: "Sitios web de alto rendimiento diseñados para convertir y escalar tu negocio",
    icon: "🌐",
    features: [
      "Desarrollo con Next.js / React",
      "Arquitectura de Conversión (CRO)",
      "UX Research + Wireframes + Prototipos",
      "Core Web Vitals garantizado (90+)",
      "SEO Técnico empresarial",
      "Velocidad ultrarrápida (0.3–1.5s)",
      "Seguridad Avanzada",
      "Animaciones premium",
      "Documentación + capacitación",
      "Garantía 6 meses antibugs",
    ],
    benefits: [
      "Sitios 10x más rápidos que WordPress",
      "Conversión +30% a +80%",
      "Escalable sin migrar tecnología",
      "Diseño personalizado",
      "SEO desde el día 1",
      "Soporte profesional",
    ],
  },
  {
    id: 2,
    title: "Páginas Corporativas / Institucionales",
    subtitle: "Nivel Empresarial 🔥",
    description: "Presencia digital profesional para empresas consolidadas",
    icon: "🏢",
    features: [
      "Manual corporativo digital",
      "Diseño institucional con branding",
      "Secciones: Nosotros, Misión, Historia, Equipo",
      "Proyectos ejecutados",
      "Certificaciones y cumplimiento",
      "Informe PDF inteligente",
      "Formularios avanzados con CRM",
      "Integración WhatsApp Business",
      "Infraestructura escalable",
    ],
    benefits: [
      "Imagen corporativa sólida",
      "Percepción de confianza",
      "Ideal para licitaciones",
      "Soporte garantizado",
    ],
  },
  {
    id: 3,
    title: "E-commerce de Alto Rendimiento",
    subtitle: "Ventas Automatizadas 🔥",
    description: "Plataforma de venta online optimizada para máxima conversión",
    icon: "🛒",
    features: [
      "Carrito optimizado",
      "Recuperación por Email + WhatsApp + Push",
      "Integración logística (Olva, Urbano)",
      "Pago: Yape/Plin/Culqi/Niubiz",
      "Cálculo automático por zonas",
      "Checkout de alta conversión",
      "Recomendador inteligente",
      "Tracking en tiempo real",
      "Panel de métricas avanzadas",
      "Integración ERP/POS opcional",
    ],
    benefits: [
      "Recuperación +20% a +40% ventas",
      "Mayor conversión",
      "Operación eficiente",
      "Escalable miles de productos",
      "Venta 24/7 automática",
    ],
  },
  {
    id: 4,
    title: "BLXK LMS",
    subtitle: "Plataformas Educativas Profesionales 🔥",
    description: "Campus virtual estilo Udemy con todas las herramientas",
    icon: "📚",
    features: [
      "Panel estudiante + instructores",
      "Certificados automáticos",
      "Cursos por módulos y evaluaciones",
      "Progreso en tiempo real",
      "Gamificación: puntos, insignias, logros",
      "App móvil optimizada",
      "Clases en vivo (Zoom integrado)",
      "Foros + comunidad privada",
      "Recordatorios por WhatsApp",
      "Pasarela Yape/Plin/Niubiz/Culqi",
    ],
    benefits: [
      "Retención alta de alumnos",
      "Incremento ventas de cursos",
      "Certificación automática",
      "Flujo educativo moderno",
      "Escalable miles de estudiantes",
    ],
  },
  {
    id: 5,
    title: "BLXK Automations",
    subtitle: "Automatización con IA y n8n 🔥",
    description: "Workflows automáticos inteligentes para tu negocio",
    icon: "⚙️",
    features: [
      "Bots WhatsApp con IA (GPT/Gemini)",
      "Workflows: Pedidos, Pagos, Confirmaciones",
      "Recordatorios automáticos",
      "Integración CRM",
      "Conexión Homers, TAS, Rebrotal",
      "Automatización contable",
      "Embudos automatizados",
      "Notificaciones inteligentes",
      "Envío masivo segmentado",
      "Analítica avanzada",
    ],
    benefits: [
      "Ahorro 60% a 80% tiempo",
      "Respuestas rápidas",
      "Cero errores humanos",
      "Escalabilidad sin personal extra",
    ],
  },
  {
    id: 6,
    title: "Homers",
    subtitle: "Solución Completa para Restaurantes 🔥",
    description: "Sistema integral para delivery y operación de restaurantes",
    icon: "🍔",
    features: [
      "Sistema pedidos multicanal",
      "Panel cocina (KDS) profesional",
      "App para repartidores",
      "Gestión de zonas entrega",
      "Integración WhatsApp",
      "Métodos de pago locales",
      "Reportes diarios/mensuales",
      "Gestión combos y costos",
      "Seguimiento en tiempo real",
    ],
    benefits: [
      "Aumenta ventas",
      "Reduce tiempos cocina",
      "Más control entregas",
      "Mejor experiencia cliente",
    ],
  },
  {
    id: 7,
    title: "TAS",
    subtitle: "Sistema de Logística y Transporte 🔥",
    description: "Plataforma completa para gestión de reparto tercerizado",
    icon: "🚚",
    features: [
      "Sistema completo reparto",
      "Seguimiento en tiempo real",
      "Tarifas dinámicas por zona",
      "Panel del conductor",
      "Reportes de tiempos",
      "Modo empresa (flota)",
      "Integración tiendas/Homers",
    ],
    benefits: [
      "Mayor control logístico",
      "Optimización de rutas",
      "Menos costos operación",
    ],
  },
  {
    id: 8,
    title: "Rebrotal",
    subtitle: "Micro Logística Inteligente 🔥",
    description: "Delivery local instantáneo con ruteo inteligente",
    icon: "📦",
    features: [
      "Delivery local instantáneo",
      "Ruteo inteligente",
      "Integración e-commerce/Homers",
      "Notificaciones automáticas",
      "Panel administrativo optimizado",
    ],
    benefits: [
      "Atención más rápida",
      "Menos errores",
      "Entregas organizadas",
    ],
  },
  {
    id: 9,
    title: "BLXK Estudios",
    subtitle: "Producción Audiovisual Premium 🔥",
    description: "Contenido audiovisual profesional para tu marca",
    icon: "🎬",
    features: [
      "Fotografía profesional",
      "Videos corporativos y comerciales",
      "Banners 4K",
      "Edición cinematográfica",
      "Branding empresarial",
      "Diseño portadas y flyers",
      "Contenido TikTok/Reels Ads",
      "Catálogos digitales",
    ],
    benefits: [
      "Imagen profesional de alto impacto",
      "Aumento conversión visual",
      "Branding fuerte y recordable",
    ],
  },
]

export function ServicesDetailed() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="services" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold neon-text-sm">Nuestros Servicios</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              Soluciones integrales desde desarrollo web hasta automatización e infraestructura
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicesData.map((service) => (
              <button
                key={service.id}
                onClick={() => toggleExpand(service.id)}
                className="text-left"
              >
                <div
                  className={`neon-card-rotating p-6 rounded-lg space-y-3 transition-all duration-300 cursor-pointer h-full ${
                    expandedId === service.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                      <p className="text-xs text-primary font-medium mt-1">{service.subtitle}</p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${
                        expandedId === service.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <p className="text-sm text-muted-foreground">{service.description}</p>

                  {/* Expandable Content */}
                  {expandedId === service.id && (
                    <div className="pt-4 space-y-4 border-t border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
                      {/* Features */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-primary">✨ Características Premium:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-primary text-lg leading-none mt-0.5">•</span>
                              <span className="text-xs text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-primary">⭐ Beneficios:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {service.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-primary text-lg leading-none mt-0.5">→</span>
                              <span className="text-xs text-muted-foreground">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <button className="w-full mt-3 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-semibold rounded-lg transition-colors">
                        Más información
                      </button>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
