import type React from "react"
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
  title: "BLXK Studio - Innovación, Software y Automatización",
  description:
    "Startup tecnológica peruana especializada en desarrollo de software, automatización inteligente y soluciones digitales personalizadas.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
