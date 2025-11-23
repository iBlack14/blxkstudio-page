"use client"

import { ReactNode } from "react"

interface Card3DHoverProps {
  children: any
  className?: string
  delay?: number
}

export function Card3DHover({ children, className = "", delay = 0 }: Card3DHoverProps) {
  return (
    <div
      className={`group relative perspective transition-all duration-500 ${className}`}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        animationDelay: `${delay}ms`,
      }}
      onMouseMove={(e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5

        card.style.transform = `
          rotateX(${-y * 15}deg)
          rotateY(${x * 15}deg)
          translateZ(30px)
          scale(1.02)
        `
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)"
      }}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {children}
      </div>
    </div>
  )
}
