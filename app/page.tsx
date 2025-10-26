import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { TechStack } from "@/components/tech-stack"
import { Portfolio } from "@/components/portfolio"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { BlxkChatbot } from "@/components/blxk-chatbot"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <TechStack />
      <Portfolio />
      <Contact />
      <BlxkChatbot />
    </main>
  )
}
