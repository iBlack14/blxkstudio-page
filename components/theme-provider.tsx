"use client"

import type React from "react"

import { useTheme } from "@/hooks/use-theme"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mounted } = useTheme()

  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}
