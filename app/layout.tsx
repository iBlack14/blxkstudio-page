
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Alonso | BLXK Studio - Desarrollo Web, IA y Automatización N8N | Full-Stack Developer Perú",
  description:
    "Alonso, fundador de BLXK Studio. Especialista en desarrollo web empresarial, automatización N8N, IA e integraciones API. Transformamos negocios con tecnología escalable y eficiente.",
  keywords:
    "Alonso BLXK, desarrollador full-stack Perú, automatización N8N, chatbot WhatsApp, desarrollo web empresarial, agencia software, integraciones API, IA empresarial, transformación digital, backend developer, startup tech",
  authors: [{ name: "Alonso", url: "https://blxkstudio.com" }],
  creator: "Alonso",
  generator: "v0.app",
  metadataBase: new URL("https://blxkstudio.com"),
  alternates: {
    canonical: "https://blxkstudio.com",
    languages: {
      "es-PE": "https://blxkstudio.com",
      es: "https://blxkstudio.com",
    },
  },
  openGraph: {
    title: "Alonso - BLXK Studio | Desarrollo Web, IA y Automatización",
    description:
      "Fundador de BLXK Studio. Especialista en software empresarial, automatización inteligente y soluciones digitales. Transformamos negocios con tecnología.",
    url: "https://blxkstudio.com",
    siteName: "BLXK Studio",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alonso - BLXK Studio Founder",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BLXK Studio - Desarrollo Web y Automatización",
    description: "Soluciones tech premium para transformar tu negocio. N8N, chatbots, APIs y software empresarial.",
    images: ["/og-image-twitter.jpg"],
    creator: "@blxkstudio",
    site: "@blxkstudio",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
    bingbot: {
      index: true,
      follow: true,
    },
  },
  applicationName: "BLXK Studio",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    email: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: any
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BLXK Studio",
              url: "https://blxkstudio.com",
              creator: {
                "@type": "Person",
                name: "Alonso",
                jobTitle: "Founder & Full-Stack Developer",
                affiliation: {
                  "@type": "Organization",
                  name: "BLXK Studio",
                },
                knowsAbout: ["Software Development", "N8N Automation", "AI", "API Design"],
              },
              organization: {
                "@type": "Organization",
                name: "BLXK Studio",
                url: "https://blxkstudio.com",
                logo: "https://blxkstudio.com/logo.png",
                description:
                  "Agencia tecnológica peruana especializada en desarrollo web, automatización y soluciones digitales.",
                sameAs: [
                  "https://twitter.com/blxkstudio",
                  "https://linkedin.com/company/blxkstudio",
                  "https://github.com/blxkstudio",
                ],
                areaServed: ["PE", "MX", "CO", "CL", "AR"],
              },
            }),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
