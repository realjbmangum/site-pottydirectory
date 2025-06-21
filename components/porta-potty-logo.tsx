import Image from "next/image"

interface PortaPottyLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export default function PortaPottyLogo({ className = "", size = "md" }: PortaPottyLogoProps) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  }

  return (
    <Image
      src="/images/portapotty-logo.png"
      alt="Porta Potty Directory Logo"
      width={40}
      height={40}
      className={`${sizeClasses[size]} ${className}`}
    />
  )
}
