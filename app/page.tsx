"use client";

import { FounderHero } from "@/components/founder-hero";
import { About } from "@/components/about";
import { Services3D } from "@/components/services-3d";
import { ProductsShowcase } from "@/components/products-showcase";
import { TechStack } from "@/components/tech-stack";
import { Portfolio } from "@/components/portfolio";
import { Contact } from "@/components/contact";
import { Navigation } from "@/components/navigation";
import { BlxkChatbot } from "@/components/blxk-chatbot";
import { FloatingThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <FounderHero />
      <About />
      <Services3D />
      <ProductsShowcase />
      <TechStack />
      <Portfolio />
      <Contact />
      <BlxkChatbot />
    </main>
  );
}
