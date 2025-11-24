"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Home, Info, Briefcase, Code, FolderOpen, Mail } from "lucide-react"
import { ProjectFormModal } from "./project-form-modal"
import { useTheme } from "@/hooks/use-theme"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [pathname, setPathname] = useState("/")
  const [mounted, setMounted] = useState(false)
  const mobileNavRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    setPathname(window.location.pathname)
  }, [])

  useEffect(() => {
    if (pathname === "/projects" || pathname === "/portfolio") {
      setActiveSection("portfolio")
    } else {
      setActiveSection("hero")
    }
  }, [pathname])

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const sections = ["hero", "about", "services", "tech", "portfolio", "contact"]
        const current = sections.find((section) => {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            return rect.top <= 150 && rect.bottom >= 150
          }
          return false
        })

        if (current) {
          setActiveSection(current)
        }
      }, 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [])

  useEffect(() => {
    if (mobileNavRef.current) {
      const activeButton = mobileNavRef.current.querySelector(`[data-section="${activeSection}"]`)
      if (activeButton) {
        activeButton.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
      }
    }
  }, [activeSection])

  const navItems = [
    { label: "Inicio", href: "/", icon: Home, id: "hero" },
    { label: "Nosotros", href: "/#about", icon: Info, id: "about" },
    { label: "Servicios", href: "/servicios", icon: Briefcase, id: "services" },
    { label: "Stack", href: "/#tech", icon: Code, id: "tech" },
    { label: "Portafolio", href: "/projects", icon: FolderOpen, id: "portfolio" },
    { label: "Contacto", href: "/#contact", icon: Mail, id: "contact" },
  ]

  const infiniteNavItems = [...navItems, ...navItems, ...navItems]

  useEffect(() => {
    if (mobileNavRef.current) {
      const scrollWidth = mobileNavRef.current.scrollWidth
      mobileNavRef.current.scrollLeft = scrollWidth / 3
    }
  }, [])

  useEffect(() => {
    const handleInfiniteScroll = () => {
      if (!mobileNavRef.current) return

      const { scrollLeft, scrollWidth, clientWidth } = mobileNavRef.current
      const itemWidth = scrollWidth / 3

      if (scrollLeft <= 0) {
        mobileNavRef.current.scrollLeft = itemWidth
      } else if (scrollLeft >= itemWidth * 2) {
        mobileNavRef.current.scrollLeft = itemWidth
      }
    }

    const navElement = mobileNavRef.current
    if (navElement) {
      navElement.addEventListener("scroll", handleInfiniteScroll)
      return () => navElement.removeEventListener("scroll", handleInfiniteScroll)
    }
  }, [])

  return (
    <>
      {mounted && (
        <>
          {/* Desktop Navigation */}
          <nav
            className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              isScrolled ? "bg-background/95 backdrop-blur-md neon-border" : "bg-transparent"
            }`}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <a href="#hero" className="text-2xl font-bold neon-text font-mono">
                  BLXK STUDIO
                </a>

                <div className="flex items-center gap-8">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`text-sm transition-all duration-300 ${
                        activeSection === item.id
                          ? "text-primary neon-text-sm scale-110"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Iniciar Proyecto
                  </Button>
                </div>
              </div>
            </div>
          </nav>

          <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-primary/30 shadow-[0_-4px_20px_rgba(0,255,255,0.2)]">
            <div
              ref={mobileNavRef}
              className="flex items-center gap-2 px-2 py-3 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {infiniteNavItems.map((item, index) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <a
                    key={`${item.href}-${index}`}
                    href={item.href}
                    data-section={item.id}
                    className={`flex flex-col items-center gap-1 transition-all duration-300 px-4 py-2 rounded-lg flex-shrink-0 ${
                      isActive
                        ? "text-primary neon-text-sm scale-110 bg-primary/10 neon-border"
                        : "text-muted-foreground hover:text-primary active:scale-95"
                    }`}
                  >
                    <Icon size={20} className="stroke-current" />
                    <span className="text-[10px] font-medium whitespace-nowrap">{item.label}</span>
                  </a>
                )
              })}
            </div>
          </nav>

          <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-primary/30">
            <div className="container mx-auto px-4 py-3 flex items-center justify-center">
              <a href="#hero" className="text-xl font-bold neon-text font-mono text-center">
                BLXK STUDIO
              </a>
            </div>
          </div>
        </>
      )}

      <ProjectFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      <style jsx global>{`
        @media (max-width: 768px) {
          body {
            padding-top: 60px;
            padding-bottom: 80px;
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}
