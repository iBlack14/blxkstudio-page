"use client"



import * as React from "react"

interface CardEffectProps {
  children: any
  className?: string
}

export function Card3DEffect({ children, className = "" }: CardEffectProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 })
  const [shine, setShine] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotationX = ((y - centerY) / centerY) * 15
      const rotationY = ((x - centerX) / centerX) * 15

      setRotation({ x: rotationX, y: rotationY })
      setShine({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
    }

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 })
      setShine({ x: 50, y: 50 })
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-300 ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(0, 255, 255, 0.2), transparent)`,
          zIndex: 10,
        }}
      />
    </div>
  )
}
