export interface ServiceProposalFeature {
  label: string
  blxk: string
  standard: string
}

export interface ServiceProposal {
  id: number
  slug: string
  title: string
  icon: string
  description: string
  introduction: string
  features: ServiceProposalFeature[]
  advantages: string[]
  useCases: string[]
  metrics: {
    label: string
    value: string
  }[]
}

export const servicesProposalData: ServiceProposal[] = [
  {
    id: 1,
    slug: "desarrollo-web",
    title: "Desarrollo de Páginas Web",
    icon: "🌐",
    description: "Ingeniería de Conversión + Performance",
    introduction:
      "Nuestros planes de desarrollo web se centran en la ingeniería de conversión, asegurando que cada sitio no solo sea visualmente atractivo, sino una herramienta de negocio de alto rendimiento.",
    features: [
      {
        label: "Tecnología Base",
        standard: "Uso de CMS genéricos (ej. WordPress con Elementor)",
        blxk: "Desarrollo con Frameworks Modernos (ej. Next.js/React) o Headless CMS para máxima velocidad y escalabilidad",
      },
      {
        label: "Rendimiento",
        standard: "No se garantiza el rendimiento específico",
        blxk: "Garantía de Core Web Vitals: Optimización técnica para alcanzar puntuaciones altas en métricas de Google (LCP, FID, CLS)",
      },
      {
        label: "Diseño y UX",
        standard: "Diseño 'a gusto del cliente' con plantillas",
        blxk: "Diseño Centrado en el Usuario (UX/CRO): Incluye fase de Investigación, Prototipado (Wireframes) y Pruebas de Usabilidad",
      },
      {
        label: "SEO Técnico",
        standard: "Plantilla 'Ideal para SEO'",
        blxk: "Estructura SEO Avanzada: Configuración de Schema Markup, Mapa del Sitio XML y Estructura de Contenido optimizada",
      },
      {
        label: "Soporte Post-Lanzamiento",
        standard: "Soporte limitado al plazo del hosting",
        blxk: "Garantía de Desarrollo de 6 Meses: Cobertura total contra errores de programación y bugs postentrega",
      },
    ],
    advantages: [
      "Rendimiento Garantizado: Sitios hasta 10 veces más rápidos, crucial para el SEO y la experiencia del usuario",
      "Optimización de Conversión: El diseño está validado para guiar al usuario hacia la acción deseada",
      "Máximo SEO Técnico: Asegura el mejor posicionamiento orgánico desde el lanzamiento",
      "Tranquilidad del Cliente: Minimiza el riesgo y el costo de mantenimiento inicial",
    ],
    useCases: [
      "Agencias de Marketing Digital - Necesitan sitios de conversión que cierren deals",
      "E-commerce Premium - Requieren velocidad y UX impecables",
      "Startups en crecimiento - Buscan escalabilidad sin migrar código",
      "Negocios de servicios B2B - Necesitan presencia profesional que genere confianza",
    ],
    metrics: [
      { label: "Velocidad Promedio", value: "0.8s" },
      { label: "Core Web Vitals", value: "90+" },
      { label: "Aumento Conversión", value: "+30-80%" },
      { label: "Garantía Antibugs", value: "6 meses" },
    ],
  },
  {
    id: 2,
    slug: "ecommerce",
    title: "Tiendas Virtuales",
    icon: "🛒",
    description: "E-commerce de Alto Impacto",
    introduction:
      "Las soluciones de e-commerce de BLXK vanen más allá de la simple venta, integrando logística, marketing de conversión y gestión avanzada.",
    features: [
      {
        label: "Logística",
        standard: "No se especifica integración logística",
        blxk: "Integración Logística Local: Conexión con al menos dos plataformas de envío locales populares (ej. Olva Courier, Urbano)",
      },
      {
        label: "Marketing de Conversión",
        standard: "Funcionalidades básicas de carrito",
        blxk: "Módulo de Recuperación de Carritos Abandonados: Configuración de automatizaciones por email o WhatsApp",
      },
      {
        label: "Medios de Pago",
        standard: "Pagos con tarjeta y depósitos",
        blxk: "Integración con Pasarelas Locales: Conexión con pasarelas de pago locales de alta conversión (ej. Culqi, Niubiz)",
      },
      {
        label: "Gestión de Inventario",
        standard: "Panel de administración básico",
        blxk: "Integración ERP/POS (Opcional): Posibilidad de conectar con sistemas de gestión de inventario automática",
      },
      {
        label: "Analítica",
        standard: "No se detalla la analítica",
        blxk: "Configuración Avanzada de GA4 y Píxeles: Implementación de seguimiento de eventos de e-commerce",
      },
    ],
    advantages: [
      "Recuperación +20% a +40% de ventas perdidas",
      "Mayor conversión con métodos de pago locales",
      "Operación más rápida y eficiente",
      "Escalable para miles de productos",
      "Sistema preparado para vender 24/7",
    ],
    useCases: [
      "Tiendas de retail online - Necesitan máxima conversión",
      "Distribuidoras multicanal - Requieren integración con ERP",
      "Marcas de moda y accesorios - Buscan experiencia premium",
      "Negocios de delivery/F&B - Necesitan integración logística",
    ],
    metrics: [
      { label: "Aumento Conversión", value: "+30-80%" },
      { label: "Recuperación Carritos", value: "+40%" },
      { label: "Métodos de Pago", value: "6+" },
      { label: "Escalabilidad", value: "Ilimitada" },
    ],
  },
  {
    id: 3,
    slug: "hosting",
    title: "Hosting Web",
    icon: "🔐",
    description: "Infraestructura de Alto Rendimiento",
    introduction:
      "El servicio de hosting de BLXK está diseñado para la velocidad y la seguridad, superando las limitaciones de recursos compartidos.",
    features: [
      {
        label: "Recursos de Servidor",
        standard: "Recursos fijos (ej. 2GB RAM/12 Cores) para todos los planes",
        blxk: "Recursos Dedicados y Escalables: Asignación de CPU y RAM que escala con el plan",
      },
      {
        label: "Seguridad de Datos",
        standard: "Seguridad básica (Imunify360)",
        blxk: "Política de Backups Robusta: Copias de seguridad diarias automatizadas con retención de 30 días",
      },
      {
        label: "Ubicación del Servidor",
        standard: "No se especifica",
        blxk: "Servidores Optimizados para Latencia: Ubicación estratégica del centro de datos para la menor latencia",
      },
      {
        label: "Soporte Técnico",
        standard: "Soporte en horario de oficina",
        blxk: "Soporte Técnico Crítico 24/7: Soporte disponible las 24 horas con un Acuerdo de Nivel de Servicio (SLA)",
      },
      {
        label: "Certificados SSL",
        standard: "SSL básico incluido",
        blxk: "SSL Wildcard + Certificados Premium: Certificados avanzados para máxima seguridad",
      },
    ],
    advantages: [
      "Estabilidad y Velocidad: El sitio nunca se ralentizará por el tráfico de otros clientes",
      "Máxima Protección: Tranquilidad total ante cualquier pérdida de datos o ataque",
      "Carga Ultra Rápida: Mejora la experiencia del usuario y el ranking SEO",
      "Disponibilidad Total: El negocio del cliente nunca se detiene",
    ],
    useCases: [
      "E-commerce con alto volumen de tráfico",
      "Aplicaciones web empresariales críticas",
      "SaaS y plataformas de alta disponibilidad",
      "Proyectos que requieren máxima confiabilidad",
    ],
    metrics: [
      { label: "Uptime Garantizado", value: "99.9%" },
      { label: "Velocidad Promedio", value: "< 100ms" },
      { label: "Backups", value: "Diarios (30 días)" },
      { label: "Soporte", value: "24/7" },
    ],
  },
  {
    id: 4,
    slug: "marketing-digital",
    title: "Marketing Digital",
    icon: "📈",
    description: "Estrategia Multicanal y Medible",
    introduction:
      "La estrategia de marketing de BLXK es integral, multicanal y enfocada en métricas de negocio reales, no en vanidad.",
    features: [
      {
        label: "Canales de Publicidad",
        standard: "Exclusivamente Facebook (Meta Ads)",
        blxk: "Estrategia Multicanal: Gestión de campañas en Meta Ads, Google Ads (Search y Display) y TikTok Ads",
      },
      {
        label: "Reportes",
        standard: "No se detalla la frecuencia ni el contenido",
        blxk: "Reportes de ROI Semanales/Quincenales: Informes detallados enfocados en métricas de negocio (CPA, ROAS, ROI)",
      },
      {
        label: "Estrategia de Contenido",
        standard: "Enfocado solo en publicidad (banners)",
        blxk: "Integración Orgánica: Incluye componente de estrategia de contenido orgánico para construir marca",
      },
      {
        label: "Investigación",
        standard: "Segmentación básica",
        blxk: "Investigación de Audiencia Profunda: Creación de Buyer Personas detallados y análisis de competencia",
      },
      {
        label: "Optimización",
        standard: "Ajustes manuales ocasionales",
        blxk: "Optimización Continua: Tests A/B, Landing Page Optimization, y mejora semanal de campañas",
      },
    ],
    advantages: [
      "Máximo Alcance: El mensaje del cliente llega a su audiencia dondequiera que esté",
      "Transparencia y Medición: El cliente sabe exactamente el retorno de su inversión publicitaria",
      "Crecimiento Sostenible: La publicidad se apoya en una marca fuerte y contenido de valor",
      "Efectividad: Cada sol invertido en publicidad está dirigido al cliente ideal",
    ],
    useCases: [
      "E-commerce buscando escalar ventas",
      "Startups en fase de growth",
      "Negocios B2B buscando leads de calidad",
      "Marcas buscando posicionamiento integral",
    ],
    metrics: [
      { label: "Promedio ROAS", value: "3-5x" },
      { label: "Reducción CPA", value: "-40%" },
      { label: "Canales Gestionados", value: "3+" },
      { label: "Reportes", value: "Semanales" },
    ],
  },
]
