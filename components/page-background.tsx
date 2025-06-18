"use client"

import type React from "react"

interface PageBackgroundProps {
  children: React.ReactNode
  variant?: "default" | "hero" | "minimal"
  className?: string
}

export default function PageBackground({ children, variant = "default", className = "" }: PageBackgroundProps) {
  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/porta-potty-event-background.png')`,
          backgroundAttachment: "fixed",
        }}
      />

      {/* Animated Grid Overlay */}
      <div className="fixed inset-0 opacity-20">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
            animation: "gridMove 20s linear infinite",
          }}
        />
      </div>

      {/* Gradient Overlays for different variants */}
      {variant === "hero" && (
        <div className="fixed inset-0 bg-gradient-to-br from-white/95 via-white/85 to-primary-50/90" />
      )}

      {variant === "default" && (
        <div className="fixed inset-0 bg-gradient-to-br from-white/90 via-white/85 to-white/80" />
      )}

      {variant === "minimal" && <div className="fixed inset-0 bg-white/95" />}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
