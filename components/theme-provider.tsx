"use client"

import { type ReactNode } from "react"

import { useTheme } from "@/hooks/use-theme"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { mounted } = useTheme()

  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}
