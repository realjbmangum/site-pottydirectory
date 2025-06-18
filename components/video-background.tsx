"use client"

import { useEffect, useRef, useState } from "react"

interface VideoBackgroundProps {
  videoUrl: string
  className?: string
  overlay?: boolean
  parallax?: boolean
}

export default function VideoBackground({
  videoUrl,
  className = "",
  overlay = true,
  parallax = false,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsLoaded(true)
      video.play().catch(console.error)
    }

    video.addEventListener("loadeddata", handleLoadedData)

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData)
    }
  }, [])

  useEffect(() => {
    if (!parallax) return

    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      container.style.transform = `translateY(${rate}px)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [parallax])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 ${
          isLoaded ? "opacity-0" : "opacity-100"
        } transition-opacity duration-1000`}
      />

      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/30" />}
    </div>
  )
}
