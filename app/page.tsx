"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { FounderHero } from "@/components/founder-hero";
import { About } from "@/components/about";
import { ServicesDetailed } from "@/components/services-detailed";
import { ProductsShowcase } from "@/components/products-showcase";
import { TechStack } from "@/components/tech-stack";
import { Navigation } from "@/components/navigation";
import { FloatingThemeToggle } from "@/components/theme-toggle";

const Portfolio = dynamic(() => import("@/components/portfolio").then(m => ({ default: m.Portfolio })), {
  loading: () => null,
  ssr: true,
})
const Contact = dynamic(() => import("@/components/contact").then(m => ({ default: m.Contact })), {
  loading: () => null,
  ssr: true,
})
const BlxkChatbot = dynamic(() => import("@/components/blxk-chatbot").then(m => ({ default: m.BlxkChatbot })), {
  loading: () => null,
  ssr: false,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <FloatingThemeToggle />
      <FounderHero />
      <About />
      <ServicesDetailed />
      <ProductsShowcase />
      <TechStack />
      <Suspense fallback={null}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
      <Suspense fallback={null}>
        <BlxkChatbot />
      </Suspense>
    </main>
  );
}
