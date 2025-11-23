export interface ServiceDetail {
  id: number
  slug: string
  title: string
  subtitle: string
  icon: string
  shortDescription: string
  fullDescription: string
  features: string[]
  benefits: string[]
  useCases: {
    title: string
    description: string
  }[]
  metrics: {
    label: string
    value: string
  }[]
  testimonials: {
    name: string
    company: string
    text: string
    avatar: string
  }[]
  cta: {
    primary: string
    secondary: string
  }
}

export const servicesData: ServiceDetail[] = [
  {
    id: 1,
    slug: "paginas-web",
    title: "Páginas Web Profesionales",
    subtitle: "Ingeniería de Conversión + Performance 🔥",
    icon: "🌐",
    shortDescription: "Sitios web de alto rendimiento diseñados para convertir y escalar tu negocio",
    fullDescription:
      "Creamos páginas web profesionales construidas con las últimas tecnologías (Next.js, React) optimizadas al máximo para conversión. Cada sitio es diseñado científicamente con investigación UX, arquitectura de conversión y Core Web Vitals garantizados. No usamos plantillas, cada proyecto es único y escalable.",
    features: [
      "Desarrollo con Next.js / React",
      "Arquitectura de Conversión (CRO)",
      "UX Research + Wireframes + Prototipos",
      "Core Web Vitals garantizado (90+)",
      "SEO Técnico empresarial",
      "Schema Markup automático",
      "Estructura semántica perfecta",
      "Optimización de indexación desde el inicio",
      "Velocidad ultrarrápida (0.3–1.5s)",
      "Seguridad Avanzada (anti-bots, hardening)",
      "Animaciones premium (GSAP, Framer Motion)",
      "Documentación + capacitación",
      "Garantía exclusiva BLXK: 6 meses antibugs",
    ],
    benefits: [
      "Sitios 10x más rápidos que WordPress con plantillas",
      "Incremento del 30% al 80% en conversión",
      "Preparados para escalar sin migrar tecnología",
      "Diseño realmente personalizado",
      "SEO técnico desde el día 1",
      "Experiencia visual nivel marca global",
      "Seguridad web real (no básica)",
      "Soporte técnico profesional, no básico",
    ],
    useCases: [
      {
        title: "Agencias de Marketing Digital",
        description:
          "Necesitan sitios de conversión que cierren deals. Nuestros sitios generan leads de calidad.",
      },
      {
        title: "E-commerce Premium",
        description: "Requieren velocidad y UX impecables. Logramos +40% en conversión respecto a WordPress.",
      },
      {
        title: "Startups en crecimiento",
        description: "Buscan escalabilidad sin migrar código. Next.js permite crecer sin límites técnicos.",
      },
      {
        title: "Negocios de servicios B2B",
        description:
          "Necesitan presencia profesional que genere confianza. Nuestro diseño institucional cierra acuerdos.",
      },
    ],
    metrics: [
      { label: "Velocidad Promedio", value: "0.8s" },
      { label: "Core Web Vitals", value: "90+" },
      { label: "Aumento Conversión", value: "+30-80%" },
      { label: "Garantía Antibugs", value: "6 meses" },
    ],
    testimonials: [
      {
        name: "Carlos M.",
        company: "E-commerce Premium",
        text: "El sitio que nos hizo BLXK multiplicó nuestras conversiones. Pasamos de 2% a 8% en 3 meses. Increíble.",
        avatar: "👨‍💼",
      },
      {
        name: "Sofia R.",
        company: "Agencia Digital",
        text: "Es la única agencia que entiende realmente CRO. Nuestros clientes ven resultados inmediatos.",
        avatar: "👩‍💼",
      },
    ],
    cta: {
      primary: "Solicitar Cotización",
      secondary: "Ver Portfolio",
    },
  },
  {
    id: 2,
    slug: "corporativas",
    title: "Páginas Corporativas / Institucionales",
    subtitle: "Nivel Empresarial 🔥",
    icon: "🏢",
    shortDescription: "Presencia digital profesional para empresas consolidadas",
    fullDescription:
      "Creamos portales corporativos que comunican tu identidad empresarial con autoridad. Diseñadas para licitaciones, inversionistas y alianzas estratégicas. Incluye manual corporativo digital, secciones premium y un diseño institucional que transmite confianza.",
    features: [
      "Manual corporativo digital",
      "Diseño institucional con branding estratégico",
      "Secciones: Nosotros, Misión, Historia, Equipo",
      "Proyectos ejecutados",
      "Certificaciones y cumplimiento normativo",
      "Informe PDF inteligente descargable",
      "Formularios avanzados con CRM integrado",
      "Integración WhatsApp Business API",
      "Infraestructura escalable y segura",
      "Soporte + mantenimiento garantizado",
    ],
    benefits: [
      "Imagen corporativa sólida y profesional",
      "Percepción de empresa confiable",
      "Ideal para licitaciones y alianzas",
      "Impresión positiva para inversionistas",
      "Facilita procesos comerciales B2B",
      "Documentación centralizada",
      "Soporte profesional incluido",
    ],
    useCases: [
      {
        title: "Empresas Constructoras",
        description: "Necesitan mostrar proyectos ejecutados. Creamos galerías y timelines profesionales.",
      },
      {
        title: "Consultorías empresariales",
        description: "Requieren proyectar solidez. El diseño institucional genera confianza inmediata.",
      },
      {
        title: "Organismos públicos y ONG",
        description: "Buscan transparencia y profesionalismo. Nuestro diseño lo comunica claramente.",
      },
      {
        title: "Distribuidoras y traders",
        description: "Necesitan mostrar certificaciones y capacidad operativa. Lo hacemos visible.",
      },
    ],
    metrics: [
      { label: "Secciones Premium", value: "10+" },
      { label: "Integración CRM", value: "Completa" },
      { label: "Certificaciones Visibles", value: "Ilimitadas" },
      { label: "Proyectos Mostrados", value: "Galerías 4K" },
    ],
    testimonials: [
      {
        name: "Roberto G.",
        company: "Constructora Premium",
        text: "El sitio corporativo que nos hizo BLXK fue clave para ganar 3 licitaciones importantes.",
        avatar: "👨‍💼",
      },
    ],
    cta: {
      primary: "Agendar Consulta",
      secondary: "Ver Ejemplos",
    },
  },
  {
    id: 3,
    slug: "ecommerce",
    title: "E-commerce de Alto Rendimiento",
    subtitle: "Ventas Automatizadas 🔥",
    icon: "🛒",
    shortDescription: "Plataforma de venta online optimizada para máxima conversión",
    fullDescription:
      "Construimos tiendas online que venden. Carrito optimizado en 3 clics, recuperación de ventas perdidas, métodos de pago locales, integración logística automática y tracking en tiempo real. Sistema preparado para vender 24/7 sin intervención manual.",
    features: [
      "Carrito optimizado (menos clics = más ventas)",
      "Recuperación de carritos abandonados",
      "Email + WhatsApp + Push automático",
      "Integración logística local (Olva, Urbano)",
      "Pago: Yape, Plin, Culqi, Niubiz",
      "Cálculo automático por zonas geográficas",
      "Checkout de alta conversión",
      "Recomendador inteligente de productos",
      "Tracking en tiempo real (automático)",
      "Panel con métricas avanzadas",
      "Integración ERP/POS opcional",
      "Notificaciones automáticas",
    ],
    benefits: [
      "Recuperación +20% a +40% de ventas perdidas",
      "Mayor conversión con pagos locales",
      "Operación más rápida y eficiente",
      "Escalable para miles de productos",
      "Sistema preparado para vender 24/7",
      "Menos trabajo manual",
      "Análisis de datos en tiempo real",
    ],
    useCases: [
      {
        title: "Tiendas de retail online",
        description: "Necesitan máxima conversión. Nuestro carrito logra 3-5x más ventas que Shopify.",
      },
      {
        title: "Distribuidoras multicanal",
        description: "Requieren integración con ERP. Lo hacemos transparent a cliente y operaciones.",
      },
      {
        title: "Marcas de moda y accesorios",
        description: "Buscan experiencia premium. Fotografía 4K + recomendador inteligente.",
      },
      {
        title: "Negocios de delivery/F&B",
        description: "Necesitan integración logística. Conectamos con Olva, Urbano, repartidores propios.",
      },
    ],
    metrics: [
      { label: "Aumento Conversión", value: "+30-80%" },
      { label: "Recuperación Carritos", value: "+40%" },
      { label: "Métodos de Pago", value: "6+" },
      { label: "Escalabilidad", value: "Ilimitada" },
    ],
    testimonials: [
      {
        name: "María L.",
        company: "Tienda Online Premium",
        text: "Con BLXK pasamos de 3% a 12% conversión. El carrito optimizado es un game changer.",
        avatar: "👩‍💼",
      },
    ],
    cta: {
      primary: "Comenzar Tienda",
      secondary: "Demo en Vivo",
    },
  },
  {
    id: 4,
    slug: "lms",
    title: "BLXK LMS",
    subtitle: "Plataformas Educativas Profesionales 🔥",
    icon: "📚",
    shortDescription: "Campus virtual estilo Udemy con todas las herramientas",
    fullDescription:
      "Plataforma educativa profesional para vender cursos online. Campus virtual completo con certificados automáticos, gamificación, clases en vivo, foros comunitarios y sistema de pagos local. Escalable para miles de estudiantes.",
    features: [
      "Panel estudiante + panel de instructores",
      "Certificados automáticos",
      "Cursos por módulos, niveles, evaluaciones",
      "Progreso del alumno en tiempo real",
      "Campus virtual elegante y rápido",
      "Gamificación: puntos, insignias, logros",
      "App móvil optimizada",
      "Clases en vivo (Zoom integrado)",
      "Foros + comunidad privada",
      "Recordatorios automáticos por WhatsApp",
      "Pasarela de pago Yape/Plin/Niubiz/Culqi",
      "Reportes inteligentes de alumnos",
      "100% con tu marca (white label)",
    ],
    benefits: [
      "Retención alta de alumnos (gamificación)",
      "Incremento en ventas de cursos",
      "Certificación automática profesional",
      "Flujo educativo moderno (no Moodle anticuado)",
      "Escalable a miles de estudiantes",
      "Comunidad enganchada",
      "Datos y análisis en tiempo real",
    ],
    useCases: [
      {
        title: "Academias online",
        description: "Necesitan vender cursos. Nuestro LMS incrementa ingresos 3x respecto a plataformas.",
      },
      {
        title: "Emprendedores educativos",
        description: "Buscan escalar sin complejidad. LMS white label, listo para producción.",
      },
      {
        title: "Empresas capacitando empleados",
        description: "Requieren onboarding y entrenamiento. Sistema de certificación incluido.",
      },
      {
        title: "Influencers monetizando conocimiento",
        description: "Necesitan comunidad + cursos pagos. Gamificación mantiene usuarios activos.",
      },
    ],
    metrics: [
      { label: "Retención Estudiantes", value: "+70%" },
      { label: "Escalabilidad", value: "10k+ alumnos" },
      { label: "Métodos de Pago", value: "6+" },
      { label: "Certificados", value: "Automáticos" },
    ],
    testimonials: [
      {
        name: "Juan P.",
        company: "Academia Online Premium",
        text: "Con el LMS de BLXK triplicamos ingresos. La gamificación mantiene a estudiantes comprometidos.",
        avatar: "👨‍🏫",
      },
    ],
    cta: {
      primary: "Lanzar Academia",
      secondary: "Probarlo Gratis",
    },
  },
  {
    id: 5,
    slug: "automations",
    title: "BLXK Automations",
    subtitle: "Automatización con IA y n8n 🔥",
    icon: "⚙️",
    shortDescription: "Workflows automáticos inteligentes para tu negocio",
    fullDescription:
      "Automatizamos procesos operativos críticos con IA integrada. Bots inteligentes por WhatsApp, workflows de pedidos, CRM automático, facturación, embudos de ventas y analítica avanzada. Ahorra 60-80% del tiempo operativo.",
    features: [
      "Bots inteligentes WhatsApp (ventas/soporte)",
      "IA integrada (GPT/Gemini para respuestas reales)",
      "Workflows: Pedidos, Pagos, Confirmaciones",
      "Recordatorios automáticos",
      "Integración CRM automática",
      "Conexión Homers, TAS, Rebrotal",
      "Automatización contable",
      "Facturación automática",
      "Embudos automatizados (funnels)",
      "Notificaciones inteligentes",
      "Envío masivo segmentado",
      "Analítica avanzada de automatización",
    ],
    benefits: [
      "Ahorro del 60% al 80% del tiempo operativo",
      "Respuestas rápidas → menos pérdida de clientes",
      "Cero errores humanos en procesos",
      "Escalabilidad sin contratar personal adicional",
      "Datos actualizados en tiempo real",
      "Reducción de costos operativos",
    ],
    useCases: [
      {
        title: "E-commerce con alto volumen",
        description: "Necesitan automatizar confirmaciones y tracking. IA responde preguntas frecuentes.",
      },
      {
        title: "Agencias de servicios",
        description: "Requieren flujos de cotización automatizados. Sistemas de CRM inteligente.",
      },
      {
        title: "Restaurantes y delivery",
        description: "Buscan menos trabajo manual. Pedidos → Cocina → Entrega → Confirmación automático.",
      },
      {
        title: "Consultorías B2B",
        description: "Necesitan leads nurturing automático. Embudos de ventas sin intervención.",
      },
    ],
    metrics: [
      { label: "Ahorro de Tiempo", value: "60-80%" },
      { label: "Reducción Costos", value: "-40%" },
      { label: "Precisión Procesos", value: "99.9%" },
      { label: "Escalabilidad", value: "Ilimitada" },
    ],
    testimonials: [
      {
        name: "Luis M.",
        company: "E-commerce Multi-canal",
        text: "Con las automations de BLXK liberamos 20 horas semanales de trabajo manual. Increíble ROI.",
        avatar: "👨‍💼",
      },
    ],
    cta: {
      primary: "Automatizar Procesos",
      secondary: "Ver Demo",
    },
  },
  {
    id: 6,
    slug: "homers",
    title: "Homers",
    subtitle: "Solución Completa para Restaurantes 🔥",
    icon: "🍔",
    shortDescription: "Sistema integral para delivery y operación de restaurantes",
    fullDescription:
      "Plataforma integral para restaurantes y delivery. Sistema de pedidos multicanal, panel de cocina profesional (KDS), app para repartidores, gestión de zonas de entrega, integración WhatsApp y métodos de pago locales. Reportes automáticos.",
    features: [
      "Sistema de pedidos multicanal",
      "Panel cocina (KDS) profesional",
      "App para repartidores con GPS",
      "Gestión de zonas de entrega",
      "Integración WhatsApp Business",
      "Métodos de pago locales",
      "Reportes diarios y mensuales",
      "Gestión de combos y costos",
      "Seguimiento en tiempo real",
      "Notificaciones automáticas",
      "Analítica de ventas",
    ],
    benefits: [
      "Aumenta ventas significativamente",
      "Reduce tiempos en cocina (KDS)",
      "Más control en entregas",
      "Mejora experiencia del cliente",
      "Operación más eficiente",
      "Reportes automáticos",
    ],
    useCases: [
      {
        title: "Restaurantes con delivery propio",
        description: "Necesitan gestionar pedidos, cocina y repartidores. Sistema integrado completo.",
      },
      {
        title: "Cadenas de comida rápida",
        description: "Requieren escalabilidad. KDS multilocales con reportes centralizados.",
      },
      {
        title: "Negocios gastronómicos premium",
        description: "Buscan experiencia cliente mejorada. Seguimiento en tiempo real.",
      },
    ],
    metrics: [
      { label: "Aumento Ventas", value: "+25-40%" },
      { label: "Reducción Tiempos", value: "-35%" },
      { label: "Satisfacción Cliente", value: "95%+" },
      { label: "Canales Pedidos", value: "Ilimitados" },
    ],
    testimonials: [
      {
        name: "Chef Ricardo",
        company: "Restaurante Premium Lima",
        text: "Homers revolucionó nuestra operación. El KDS es increíble y los pedidos llegan perfecto.",
        avatar: "👨‍🍳",
      },
    ],
    cta: {
      primary: "Implementar Ahora",
      secondary: "Agendar Demo",
    },
  },
  {
    id: 7,
    slug: "tas",
    title: "TAS",
    subtitle: "Sistema de Logística y Transporte 🔥",
    icon: "🚚",
    shortDescription: "Plataforma completa para gestión de reparto tercerizado",
    fullDescription:
      "Sistema profesional para empresas de logística y transporte. Seguimiento en tiempo real, tarifas dinámicas por zona, panel del conductor, reportes de tiempos y modo empresa para flota propia. Integración con tiendas y plataformas.",
    features: [
      "Sistema completo de reparto",
      "Seguimiento en tiempo real (GPS)",
      "Tarifas dinámicas por zona",
      "Panel intuitivo del conductor",
      "Reportes de tiempos y eficiencia",
      "Modo empresa (control de flota)",
      "Integración con tiendas y Homers",
      "Asignación automática de rutas",
      "Notificaciones a cliente",
      "Panel administrativo avanzado",
    ],
    benefits: [
      "Mayor control logístico",
      "Optimización de rutas (ahorro combustible)",
      "Menos costos de operación",
      "Entregas más rápidas",
      "Datos en tiempo real",
      "Escalable para múltiples ciudades",
    ],
    useCases: [
      {
        title: "Empresas de logística",
        description: "Necesitan control de flota. Seguimiento GPS + reportes profesionales.",
      },
      {
        title: "E-commerce grandes volúmenes",
        description: "Requieren logística propia. Integración automática con tiendas.",
      },
      {
        title: "Distribuidores y wholesalers",
        description: "Buscan optimizar rutas. Sistema reduce combustible 20-30%.",
      },
    ],
    metrics: [
      { label: "Ahorro Combustible", value: "20-30%" },
      { label: "Velocidad Entregas", value: "+40%" },
      { label: "Cobertura", value: "Multi-ciudad" },
      { label: "Conductores", value: "Ilimitados" },
    ],
    testimonials: [
      {
        name: "Miguel L.",
        company: "Empresa Logística Regional",
        text: "TAS nos ayudó a optimizar rutas y reducir costos. La mejor inversión operativa.",
        avatar: "👨‍💼",
      },
    ],
    cta: {
      primary: "Optimizar Flota",
      secondary: "Consultar Precios",
    },
  },
  {
    id: 8,
    slug: "rebrotal",
    title: "Rebrotal",
    subtitle: "Micro Logística Inteligente 🔥",
    icon: "📦",
    shortDescription: "Delivery local instantáneo con ruteo inteligente",
    fullDescription:
      "Solución de micro logística para entregas rápidas en zonas urbanas. Ruteo inteligente, delivery instantáneo, integración con e-commerce y Homers. Notificaciones automáticas y panel administrativo optimizado.",
    features: [
      "Delivery local instantáneo",
      "Ruteo inteligente (optimizado)",
      "Integración e-commerce/Homers",
      "Notificaciones automáticas al cliente",
      "Panel administrativo optimizado",
      "Asignación automática de pedidos",
      "Seguimiento en tiempo real",
      "Reportes diarios",
      "Integración con múltiples tiendas",
    ],
    benefits: [
      "Atención más rápida (same-day delivery)",
      "Menos errores en entregas",
      "Entregas organizadas y eficientes",
      "Mejor experiencia del cliente",
      "Costos operativos reducidos",
      "Integración transparente",
    ],
    useCases: [
      {
        title: "Tiendas locales con delivery",
        description: "Necesitan entregas rápidas intra-ciudad. Ruteo optimizado automático.",
      },
      {
        title: "Marketplace locales",
        description: "Requieren logística integrada. Rebrotal conecta múltiples vendedores.",
      },
      {
        title: "Negocios de comida a domicilio",
        description: "Buscan entregas super rápidas. Sistema pensado para máxima velocidad.",
      },
    ],
    metrics: [
      { label: "Tiempo Entrega", value: "15-30 min" },
      { label: "Eficiencia Rutas", value: "95%+" },
      { label: "Satisfacción Cliente", value: "98%+" },
      { label: "Capacidad", value: "500+ pedidos/día" },
    ],
    testimonials: [
      {
        name: "Ana G.",
        company: "Marketplace Local",
        text: "Rebrotal es el mejor sistema de micro logística. Nuestros clientes adoran las entregas rápidas.",
        avatar: "👩‍💼",
      },
    ],
    cta: {
      primary: "Activar Entregas Rápidas",
      secondary: "Ver Cobertura",
    },
  },
  {
    id: 9,
    slug: "estudios",
    title: "BLXK Estudios",
    subtitle: "Producción Audiovisual Premium 🔥",
    icon: "🎬",
    shortDescription: "Contenido audiovisual profesional para tu marca",
    fullDescription:
      "Producción audiovisual de alta calidad. Fotografía profesional, videos corporativos, edición cinematográfica, branding visual, diseño gráfico y contenido para redes. Catálogos digitales 4K y materiales de campaña premium.",
    features: [
      "Fotografía profesional",
      "Videos corporativos y comerciales",
      "Banners 4K",
      "Edición cinematográfica",
      "Branding empresarial completo",
      "Diseño de portadas y flyers",
      "Contenido TikTok/Reels/Ads",
      "Catálogos digitales de alta calidad",
      "Motion graphics",
      "Animación 2D/3D",
      "Consultoría creativa",
    ],
    benefits: [
      "Imagen profesional de alto impacto",
      "Aumento conversión visual",
      "Branding fuerte y recordable",
      "Diferenciación en mercado",
      "Contenido viral-ready",
      "Material reutilizable",
    ],
    useCases: [
      {
        title: "Marcas lanzando productos",
        description: "Necesitan contenido premium. Producción completa desde concepto a distribución.",
      },
      {
        title: "Agencias de publicidad",
        description: "Requieren proveedores audiovisuales confiables. Socios creative.",
      },
      {
        title: "E-commerce premium",
        description: "Buscan fotografía y video 4K para productos. Catálogos digitales impactantes.",
      },
      {
        title: "Empresas B2B corporativas",
        description: "Necesitan videos institucionales y branding. Comunican expertise visual.",
      },
    ],
    metrics: [
      { label: "Resolución Máxima", value: "4K 60fps" },
      { label: "Turnaround", value: "14-21 días" },
      { label: "Entregas Formatos", value: "50+" },
      { label: "Equipamiento", value: "Cinema grade" },
    ],
    testimonials: [
      {
        name: "Carla V.",
        company: "Marca Premium Fashion",
        text: "El equipo de BLXK Estudios es increíble. Nuestras campañas ahora lucen como marcas internacionales.",
        avatar: "👩‍💼",
      },
    ],
    cta: {
      primary: "Solicitar Producción",
      secondary: "Ver Portfolio",
    },
  },
]
