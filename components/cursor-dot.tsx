"use client"

import { useEffect, useRef, useState } from "react"

export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX + 12}px`
        dotRef.current.style.top = `${e.clientY - 4}px`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      ref={dotRef}
      className="fixed w-1.5 h-1.5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 pointer-events-none z-50 shadow-sm"
      style={{
        boxShadow: "0 0 8px rgba(74, 222, 128, 0.5), 0 0 12px rgba(74, 222, 128, 0.3)",
        filter: "blur(0.5px)"
      }}
    />
  )
}
