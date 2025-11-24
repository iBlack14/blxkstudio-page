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
      return systemPreference
    }

    const initialTheme = getInitialTheme()
    applyTheme(initialTheme)
    setTheme(initialTheme)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  return { theme, toggleTheme, mounted }
}
