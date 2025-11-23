"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

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

  useEffect(() => {
    const getInitialTheme = (): Theme => {
      // Check localStorage first
      const savedTheme = localStorage.getItem("theme") as Theme | null
      if (savedTheme) return savedTheme

      // Check system preference
      const systemPreference = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"

      // Get current hour for time-based detection
      const hour = new Date().getHours()
      const isDayTime = hour >= 6 && hour < 18

      return isDayTime ? "light" : "dark"
    }

    const initialTheme = getInitialTheme()
    applyTheme(initialTheme)
    setTheme(initialTheme)
    setMounted(true)

    // Check theme every minute to update based on time
    const interval = setInterval(() => {
      const hour = new Date().getHours()
      const isDayTime = hour >= 6 && hour < 18
      const newTheme = isDayTime ? "light" : "dark"

      const savedTheme = localStorage.getItem("theme") as Theme | null
      // Only auto-update if no saved preference
      if (!savedTheme && newTheme !== theme) {
        setTheme(newTheme)
        applyTheme(newTheme)
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  return { theme, toggleTheme, mounted }
}
