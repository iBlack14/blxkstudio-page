import { ExternalLink, Zap, Shield, Users, Cpu, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProjectsShowcase() {
  const projects = [
    {
      id: 1,
      title: "Black WhatsApp Payment Gateway",
      subtitle: "Plugin: WooCommerce",
      description:
        "Plugin personalizado de WordPress que integra WhatsApp como método de pago en tiendas WooCommerce, permitiendo a los comerciantes recibir pedidos directamente en WhatsApp sin pasarelas de pago tradicionales.",
      skills: ["WordPress", "WooCommerce", "PHP", "WhatsApp API", "Integración de Pagos"],
      features: [
        "Integración seamless con WooCommerce",
        "Recepción de pedidos directa en WhatsApp",
        "Notificaciones automáticas",
        "Gestión de pagos simplificada",
        "Dashboard de transacciones",
      ],
      tech: "WordPress · PHP · WooCommerce · MySQL",
      color: "from-primary/20 to-primary/5",
      icon: MessageCircle,
      highlights: ["E-commerce", "Pagos", "Automatización"],
    },
    {
      id: 2,
      title: "Automatización de Ventas con N8N",
      subtitle: "Sales Automation Platform",
      description:
        "Crea un flujo automatizado: cuando un cliente hace una compra en WooCommerce → se envía mensaje automático por WhatsApp → se actualiza en Google Sheets o Supabase. Demuestra habilidad en automatización, APIs y backend.",
      skills: ["N8N", "Node.js", "WhatsApp API", "Google Sheets", "Supabase", "Backend"],
      features: [
        "Flujos de automatización en N8N",
        "Sincronización en tiempo real",
        "Integración multi-plataforma",
        "Actualización de bases de datos",
        "Reportes automáticos",
      ],
      tech: "N8N · Node.js · WhatsApp API · Supabase",
      color: "from-accent/20 to-accent/5",
      icon: Zap,
      highlights: ["Automatización", "N8N", "APIs"],
    },
    {
      id: 3,
      title: "Sistema de Gestión de Pedidos",
      subtitle: "Full Stack Order Management",
      description:
        "App web para gestionar pedidos de clientes, estados y entregas, con login de usuario. Demuestra habilidad full stack con React/Next.js en frontend y Supabase en backend con autenticación y base de datos.",
      skills: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
      features: [
        "Dashboard de pedidos en tiempo real",
        "Seguimiento de entregas",
        "Gestión de estados",
        "Autenticación de usuarios",
        "Reportes de ventas",
        "Interfaz intuitiva",
      ],
      tech: "Next.js · React · TypeScript · Supabase",
      color: "from-blue-500/20 to-blue-500/5",
      icon: Users,
      highlights: ["Full Stack", "Frontend", "Backend"],
    },
    {
      id: 4,
      title: "Chatbot de Atención para WhatsApp",
      subtitle: "AI-Powered Customer Service",
      description:
        "Un bot que responda preguntas frecuentes y tome pedidos simples, conectado con N8N o una API. Demuestra habilidad en APIs, lógica de flujos y atención automatizada con inteligencia artificial.",
      skills: ["N8N", "OpenAI API", "WhatsApp API", "Node.js", "IA/ML", "Backend"],
      features: [
        "Respuestas de IA contextuales",
        "Toma de pedidos automática",
        "Escalado a agentes humanos",
        "Base de conocimiento personalizada",
        "Análisis de conversaciones",
        "Integración con CRM",
      ],
      tech: "N8N · OpenAI API · WhatsApp API · Node.js",
      color: "from-purple-500/20 to-purple-500/5",
      icon: Cpu,
      highlights: ["IA", "Chatbot", "APIs"],
    },
    {
      id: 5,
      title: "Panel Administrativo para Clientes",
      subtitle: "Advanced Admin Dashboard",
      description:
        "Dashboard donde un cliente puede ver sus pedidos, facturas, mensajes o estadísticas. Demuestra habilidad en desarrollo backend, autenticación, diseño UI y manejo de datos complejos.",
      skills: ["Next.js", "React", "TypeScript", "Supabase", "Charts", "UI/UX"],
      features: [
        "Visualización de pedidos",
        "Historial de facturas",
        "Centro de mensajes",
        "Estadísticas en tiempo real",
        "Exportación de reportes",
        "Roles y permisos de usuario",
        "Gráficos avanzados",
      ],
      tech: "Next.js · React · Recharts · TypeScript · Supabase",
      color: "from-green-500/20 to-green-500/5",
      icon: Shield,
      highlights: ["Dashboard", "Analytics", "Backend"],
    },
  ]

  return (
    <section id="projects-detailed" className="py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid-pattern opacity-30" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          {/* Header - Mejorado responsividad en texto y espaciado */}
          <div className="space-y-4 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold neon-text text-balance">
              Portafolio de Proyectos Premium
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              5 soluciones empresariales que demuestran expertise en desarrollo full-stack, automatización y
              arquitectura de sistemas
            </p>
          </div>

          {/* Projects Grid - Optimizado para pantallas pequeñas */}
          <div className="space-y-6 md:space-y-8">
            {projects.map((project, index) => {
              const Icon = project.icon
              return (
                <div key={project.id} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
                  <div
                    className={`bg-gradient-to-r ${project.color} rounded-lg md:rounded-xl p-6 md:p-12 neon-card-rotating hover:shadow-lg transition-all duration-300`}
                  >
                    {/* Top Section - Grid responsive para móvil */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
                      {/* Project Title and Icon */}
                      <div className="md:col-span-2 space-y-4">
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:neon-glow transition-all">
                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                          </div>
                          <div className="space-y-1 md:space-y-2">
                            <h3 className="text-xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-xs md:text-sm text-primary font-semibold">{project.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Highlights - Mejor espaciado en móvil */}
                      <div className="space-y-3">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider">Focus Areas</p>
                        <div className="flex flex-wrap gap-2">
                          {project.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 md:px-3 md:py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/30 hover:border-primary/60 transition-colors"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Features - Grid responsive */}
                    <div className="space-y-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-border/50">
                      <p className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider">
                        Características Principales
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                        {project.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span className="text-xs md:text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Section - Skills and Tech Stack - Stack vertical en móvil */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {/* Skills */}
                      <div className="space-y-3">
                        <p className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider">
                          Habilidades Demostrables
                        </p>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {project.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 md:px-2.5 py-0.5 md:py-1 text-xs bg-secondary/50 text-secondary-foreground rounded border border-border/50 font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="space-y-3">
                        <p className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider">
                          Tech Stack
                        </p>
                        <p className="text-xs md:text-sm font-mono text-muted-foreground leading-relaxed break-words">
                          {project.tech}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Section - Botones responsive stack vertical en móvil */}
          <div className="pt-8 md:pt-12 text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
                Listo para transformar tu negocio?
              </h3>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Estos proyectos son solo una muestra de lo que podemos lograr juntos. Contáctanos para discutir tu
                próxima solución empresarial.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <Button
                size="lg"
                className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90 text-sm md:text-base"
              >
                Solicitar Consulta
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary bg-transparent text-sm md:text-base"
              >
                Ver Portfolio Completo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
