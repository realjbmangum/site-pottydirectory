interface PortaPottyLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export default function PortaPottyLogo({ className = "", size = "md" }: PortaPottyLogoProps) {
  const sizeClasses = {
    sm: "w-5 h-6",
    md: "w-6 h-7",
    lg: "w-8 h-9",
    xl: "w-10 h-12",
  }

  return (
    <svg
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClasses[size]} ${className}`}
      aria-label="Potty Icon"
    >
      {/* Toilet Bowl Base */}
      <ellipse cx="40" cy="85" rx="25" ry="12" fill="currentColor" />

      {/* Toilet Bowl */}
      <path d="M20 50 Q20 40 30 40 L50 40 Q60 40 60 50 L60 75 Q60 85 50 85 L30 85 Q20 85 20 75 Z" fill="currentColor" />

      {/* Toilet Seat */}
      <ellipse cx="40" cy="50" rx="18" ry="8" fill="white" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="40" cy="50" rx="12" ry="5" fill="currentColor" opacity="0.3" />

      {/* Toilet Tank */}
      <rect x="25" y="15" width="30" height="35" rx="5" fill="currentColor" />

      {/* Flush Handle */}
      <rect x="58" y="25" width="4" height="8" rx="2" fill="currentColor" />

      {/* Tank Lid */}
      <rect x="23" y="12" width="34" height="6" rx="3" fill="currentColor" opacity="0.8" />

      {/* Water Lines */}
      <line x1="30" y1="25" x2="50" y2="25" stroke="white" strokeWidth="1" opacity="0.5" />
      <line x1="30" y1="30" x2="50" y2="30" stroke="white" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}
