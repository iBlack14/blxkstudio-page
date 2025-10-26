"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const getInitialTheme = (): Theme => {
      // Check system preference first
      if (typeof window !== "undefined") {
        const systemPreference = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"

        // Get current hour
        const hour = new Date().getHours()

        // Day: 6 AM to 6 PM, Night: 6 PM to 6 AM
        const isDayTime = hour >= 6 && hour < 18

        // If system preference is set, respect it; otherwise use time-based detection
        const savedTheme = localStorage.getItem("theme") as Theme | null
        if (savedTheme) return savedTheme

        return isDayTime ? "light" : "dark"
      }
      return "dark"
    }

    const initialTheme = getInitialTheme()
    setTheme(initialTheme)
    applyTheme(initialTheme)

    // Check theme every minute to update based on time
    const interval = setInterval(() => {
      const hour = new Date().getHours()
      const isDayTime = hour >= 6 && hour < 18
      const newTheme = isDayTime ? "light" : "dark"

      if (newTheme !== theme) {
        setTheme(newTheme)
        applyTheme(newTheme)
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement
    if (newTheme === "light") {
      html.classList.remove("dark")
      html.classList.add("light")
    } else {
      html.classList.remove("light")
      html.classList.add("dark")
    }
    localStorage.setItem("theme", newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  return { theme, toggleTheme, mounted }
}
