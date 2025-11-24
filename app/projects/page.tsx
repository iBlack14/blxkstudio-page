import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Navigation } from "@/components/navigation"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { ProjectsHero } from "@/components/projects-hero"
import { ProjectsComparison } from "@/components/projects-comparison"
import { ProjectsTestimonials } from "@/components/projects-testimonials"
import { ProjectDemos } from "@/components/project-demos"

const ProjectsStats = dynamic(() => import("@/components/projects-stats").then(m => ({ default: m.ProjectsStats })), {
  loading: () => null,
  ssr: true,
})
const Contact = dynamic(() => import("@/components/contact").then(m => ({ default: m.Contact })), {
  loading: () => null,
  ssr: true,
})
const BlxkChatbot = dynamic(() => import("@/components/blxk-chatbot").then(m => ({ default: m.BlxkChatbot })), {
  loading: () => null,
})

export const metadata: Metadata = {
  title: "Portafolio Premium | BLXK Studio - Proyectos de Desarrollo Full Stack",
  description:
    "Descubre 5 soluciones empresariales premium desarrolladas por BLXK Studio. Desde WhatsApp Payment Gateway hasta dashboards administrativos. Expertise en automatización, N8N, Next.js, React, Supabase y más.",
  keywords:
    "portafolio desarrollo web, proyectos fullstack, whatsapp payment, n8n automation, next.js, react, supabase, dashboard administrativo, chatbot whatsapp",
  authors: [{ name: "BLXK Studio" }],
  creator: "BLXK Studio",
  publisher: "BLXK Studio",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://blxkstudio.com/projects",
    title: "Portafolio Premium | BLXK Studio - Proyectos de Desarrollo Full Stack",
    description:
      "5 soluciones empresariales que demuestran expertise en desarrollo full stack, automatización y arquitectura de sistemas",
    siteName: "BLXK Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portafolio Premium | BLXK Studio",
    description: "Descubre proyectos premium de desarrollo full stack",
  },
  alternates: {
    canonical: "https://blxkstudio.com/projects",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProjectsHero />
      <ProjectDemos />
      <Suspense fallback={null}>
        <ProjectsStats />
      </Suspense>
      <ProjectsShowcase />
      <ProjectsComparison />
      <ProjectsTestimonials />
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
      <Suspense fallback={null}>
        <BlxkChatbot />
      </Suspense>
    </main>
  )
}
