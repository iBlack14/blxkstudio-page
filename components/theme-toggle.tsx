"use client"

import { useTheme } from "@/hooks/use-theme"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <div className="w-12 h-7 rounded-full bg-muted animate-pulse" />
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-7 w-12 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background"
      style={{
        background: theme === "light"
          ? "linear-gradient(135deg, #FFE5E5 0%, #FFE5F0 50%, #E5F3FF 100%)"
          : "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
      }}
      title={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className={`absolute w-6 h-6 rounded-full transition-all duration-500 ${
          theme === "light"
            ? "translate-x-0.5 bg-gradient-to-br from-yellow-200 to-orange-200"
            : "translate-x-5 bg-gradient-to-br from-indigo-200 to-purple-300"
        }`} />
      </div>

      {/* Icon container */}
      <div className="relative z-10 w-full h-full flex items-center px-1">
        <div className={`absolute transition-all duration-300 ${
          theme === "light"
            ? "opacity-100 scale-100 translate-x-0"
            : "opacity-0 scale-0 -translate-x-full"
        }`}>
          <Sun className="w-5 h-5 text-orange-600" />
        </div>
        <div className={`absolute right-1 transition-all duration-300 ${
          theme === "dark"
            ? "opacity-100 scale-100 translate-x-0"
            : "opacity-0 scale-0 translate-x-full"
        }`}>
          <Moon className="w-5 h-5 text-indigo-600" />
        </div>
      </div>
    </button>
  )
}
