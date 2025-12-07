import { Suspense } from "react";
import dynamic from "next/dynamic";
import { FounderHero } from "@/components/founder-hero";
import { Navigation } from "@/components/navigation";
import { FloatingThemeToggle } from "@/components/theme-toggle";

const About = dynamic(() => import("@/components/about").then(m => ({ default: m.About })), {
  loading: () => null,
  ssr: true,
})
const ServicesDetailed = dynamic(() => import("@/components/services-detailed").then(m => ({ default: m.ServicesDetailed })), {
  loading: () => null,
  ssr: true,
})
const ServicesProposal = dynamic(() => import("@/components/services-proposal").then(m => ({ default: m.ServicesProposal })), {
  loading: () => null,
  ssr: true,
})
const ProductsShowcase = dynamic(() => import("@/components/products-showcase").then(m => ({ default: m.ProductsShowcase })), {
  loading: () => null,
  ssr: true,
})
const TechStack = dynamic(() => import("@/components/tech-stack").then(m => ({ default: m.TechStack })), {
  loading: () => null,
  ssr: true,
})
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
