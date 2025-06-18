"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface PageBackgroundProps {
  children: React.ReactNode
  variant?: "default" | "hero" | "minimal"
  className?: string
}

export default function PageBackground({ children, variant = "default", className = "" }: PageBackgroundProps) {
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5
        backgroundRef.current.style.transform = `translate3d(0, ${rate}px, 0)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Parallax Background Image */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 w-full h-[120vh] bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url('/images/blue-porta-potties-background.jpg')`,
          top: "-10vh",
        }}
      />

      {/* Animated Grid Overlay */}
      <div className="fixed inset-0 opacity-15">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
            animation: "gridMove 20s linear infinite",
          }}
        />
      </div>

      {/* Gradient Overlays for different variants */}
      {variant === "hero" && (
        <div className="fixed inset-0 bg-gradient-to-br from-white/70 via-white/60 to-primary-50/65" />
      )}

      {variant === "default" && (
        <div className="fixed inset-0 bg-gradient-to-br from-white/65 via-white/60 to-white/55" />
      )}

      {variant === "minimal" && <div className="fixed inset-0 bg-white/70" />}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
