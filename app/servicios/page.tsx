import type { Metadata } from "next"
import { Card3DHover } from "@/components/3d-card-hover"
import { Globe, Bot, MessageSquare, Plug, Cloud, Palette, CheckCircle2 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Contact } from "@/components/contact"
import { BlxkChatbot } from "@/components/blxk-chatbot"

export const metadata: Metadata = {
  title: "Servicios | BLXK Studio - Desarrollo Web, IA y Automatización N8N",
  description:
    "Descubre nuestros servicios de desarrollo web empresarial, automatización inteligente con N8N, chatbots WhatsApp, integraciones API y soluciones digitales escalables para tu negocio.",
  keywords:
    "servicios desarrollo web, automatización N8N, chatbot WhatsApp, integraciones API, infraestructura cloud, diseño digital Perú",
  openGraph: {
    title: "Servicios Premium de Tech | BLXK Studio",
    description:
      "Soluciones integrales de desarrollo web, IA, automatización e integraciones para empresas innovadoras",
    type: "website",
    url: "https://blxkstudio.com/servicios",
  },
}

const services = [
  {
    icon: Globe,
    title: "Desarrollo Web y Software Empresarial",
    description:
      "Diseño y desarrollo de sistemas web, paneles de control, CRMs, ERPs y plataformas escalables a medida para optimizar operaciones empresariales.",
    features: ["Aplicaciones web responsive", "CRM personalizado", "ERP empresarial", "Dashboards analíticos"],
  },
  {
    icon: Bot,
    title: "Automatización e Inteligencia Artificial",
    description:
      "Flujos inteligentes con n8n, GPT y APIs personalizadas para automatizar atención al cliente, marketing digital y procesos internos críticos.",
    features: ["Flujos automatizados N8N", "Integración con IA", "Procesos inteligentes", "Machine Learning"],
  },
  {
    icon: MessageSquare,
    title: "Mensajería Masiva y Omnicanal",
    description:
      "Campañas automatizadas por WhatsApp, Telegram y Email con segmentación avanzada, análisis en tiempo real y control total de audiencias.",
    features: ["WhatsApp Bot", "Telegram automático", "Email marketing", "Análisis de campaña"],
  },
  {
    icon: Plug,
    title: "Integraciones y APIs",
    description:
      "Conexión seamless entre sistemas, pasarelas de pago, CRMs y plataformas externas para crear ecosistemas digitales cohesivos.",
    features: ["Integración de APIs", "Pasarelas de pago", "Sincronización de datos", "Webhooks personalizados"],
  },
  {
    icon: Cloud,
    title: "Infraestructura y Soporte Técnico",
    description:
      "Despliegue en la nube, seguridad, mantenimiento proactivo y monitoreo 24/7 de infraestructura crítica.",
    features: ["Hosting en nube", "Seguridad avanzada", "Monitoreo 24/7", "Backup automático"],
  },
  {
    icon: Palette,
    title: "Diseño y Branding Digital",
    description:
      "Creación de identidad visual, landing pages de alto impacto y materiales para fortalecer tu presencia digital.",
    features: ["Identidad visual", "Landing pages", "Diseño UX/UI", "Branding digital"],
  },
]

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="absolute inset-0 hero-grid-pattern" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold neon-text">Nuestros Servicios</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Soluciones tecnológicas integrales diseñadas para transformar tu negocio y escalar con inteligencia
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card3DHover key={index} delay={index * 100}>
                  <article className="neon-card-rotating p-8 rounded-lg space-y-6 h-full flex flex-col">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:neon-glow transition-all">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>

                    <ul className="space-y-2 flex-grow">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Card3DHover>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <section className="py-24 relative bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 neon-text-sm">Preguntas Frecuentes</h2>

            <div className="space-y-6">
              {[
                {
                  q: "¿Cuál es el tiempo de implementación?",
                  a: "Depende de la complejidad del proyecto. Proyectos simples pueden tomar 2-4 semanas, mientras que soluciones enterprise pueden requerir 2-3 meses.",
                },
                {
                  q: "¿Ofrecen soporte post-desarrollo?",
                  a: "Sí, ofrecemos soporte técnico 24/7, mantenimiento proactivo y monitoreo continuo de todas nuestras soluciones.",
                },
                {
                  q: "¿Pueden integrar con sistemas existentes?",
                  a: "Absolutamente. Somos especialistas en integraciones complejas entre sistemas legacy y nuevas plataformas.",
                },
              ].map((faq, i) => (
                <details key={i} className="neon-card-rotating p-6 rounded-lg group cursor-pointer">
                  <summary className="font-bold text-foreground hover:text-primary transition-colors">{faq.q}</summary>
                  <p className="text-muted-foreground mt-3">{faq.a}</p>
                </details>
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
