import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

// Professional color palette
const BLUE = "#2563eb";
const DARK_BLUE = "#1e40af";
const NAVY = "#0f172a";
const GOLD = "#fbbf24";
const WHITE = "#ffffff";
const GRAY = "#64748b";
const LIGHT_GRAY = "#f8fafc";

// Modern glassmorphism card
const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: 24,
      ...style,
    }}
  >
    {children}
  </div>
);

// Scene 1: Epic Opening (0-3s = 90 frames)
const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 30], [0, 1]);
  const titleY = interpolate(frame, [0, 40], [100, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Subtitle delayed entrance
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1]);
  const subtitleY = interpolate(frame, [30, 50], [50, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Particles/accent animation
  const accentScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 100, stiffness: 200 },
  });

  // Background gradient animation
  const gradientRotation = interpolate(frame, [0, 90], [0, 10]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${135 + gradientRotation}deg, ${NAVY} 0%, ${DARK_BLUE} 50%, ${BLUE} 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${GOLD}40 0%, transparent 70%)`,
          borderRadius: "50%",
          transform: `scale(${accentScale})`,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "10%",
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${BLUE}30 0%, transparent 70%)`,
          borderRadius: "50%",
          transform: `scale(${accentScale * 0.8})`,
          filter: "blur(80px)",
        }}
      />

      {/* Content */}
      <div style={{ textAlign: "center", zIndex: 1 }}>
        {/* Logo/Icon */}
        <div
          style={{
            fontSize: 120,
            marginBottom: 40,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))",
          }}
        >
          🚽
        </div>

        {/* Main Title */}
        <h1
          style={{
            fontSize: 96,
            fontWeight: 800,
            margin: 0,
            background: `linear-gradient(135deg, ${WHITE} 0%, ${GOLD} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "0 0 80px rgba(251, 191, 36, 0.3)",
          }}
        >
          Potty Directory
        </h1>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 30,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 600,
              color: WHITE,
              marginBottom: 15,
              letterSpacing: "-0.01em",
            }}
          >
            Welcome WWETT 2026 Attendees
          </div>
          <div
            style={{
              fontSize: 32,
              color: GOLD,
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            The Industry's Digital Hub
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Cinematic Stats (3-7s = 120 frames)
const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { number: "4,500+", label: "Active Listings", gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" },
    { number: "50", label: "States Covered", gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" },
    { number: "25,000+", label: "Monthly Searches", gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" },
    { number: "500+", label: "New Leads/Month", gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at center, ${NAVY} 0%, #000000 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
      }}
    >
      {/* Grid layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          maxWidth: 1600,
          margin: "0 auto",
        }}
      >
        {stats.map((stat, i) => {
          const delay = i * 15;
          const scale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 100, stiffness: 200 },
          });

          const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
          });

          // Number count-up animation
          const displayNumber = stat.number.includes("+")
            ? Math.floor(
                interpolate(
                  frame - delay,
                  [0, 40],
                  [0, parseInt(stat.number.replace(/[^0-9]/g, ""))],
                  { extrapolateRight: "clamp" }
                )
              ).toLocaleString() + "+"
            : stat.number;

          return (
            <GlassCard
              key={i}
              style={{
                transform: `scale(${scale})`,
                opacity,
                padding: 60,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Gradient accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 8,
                  background: stat.gradient,
                }}
              />

              {/* Number */}
              <div
                style={{
                  fontSize: 96,
                  fontWeight: 800,
                  background: stat.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 20,
                  letterSpacing: "-0.02em",
                }}
              >
                {displayNumber}
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: 32,
                  color: WHITE,
                  fontWeight: 600,
                  opacity: 0.9,
                  letterSpacing: "-0.01em",
                }}
              >
                {stat.label}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Minimalist Benefits (7-11s = 120 frames)
const BenefitsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const benefits = [
    { title: "Free Listing", desc: "Get started instantly", icon: "⚡" },
    { title: "Featured Placement", desc: "Premium visibility", icon: "⭐" },
    { title: "Verified Badge", desc: "Build trust instantly", icon: "✓" },
    { title: "Local SEO", desc: "Dominate your market", icon: "📍" },
    { title: "Direct Leads", desc: "Phone starts ringing", icon: "📞" },
    { title: "Mobile-First", desc: "Perfect everywhere", icon: "📱" },
  ];

  // Title animation
  const titleY = interpolate(frame, [0, 30], [50, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${LIGHT_GRAY} 0%, ${WHITE} 100%)`,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: 72,
          fontWeight: 800,
          textAlign: "center",
          marginBottom: 80,
          color: NAVY,
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Why Industry Leaders Choose Us
      </h2>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 40,
          maxWidth: 1600,
          margin: "0 auto",
        }}
      >
        {benefits.map((benefit, i) => {
          const delay = i * 8;
          const y = spring({
            frame: frame - delay,
            fps,
            from: 80,
            to: 0,
            config: { damping: 100, stiffness: 200 },
          });

          const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                transform: `translateY(${y}px)`,
                opacity,
                padding: 50,
                background: WHITE,
                borderRadius: 24,
                boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.05)",
                textAlign: "center",
                transition: "transform 0.3s ease",
              }}
            >
              <div
                style={{
                  fontSize: 72,
                  marginBottom: 24,
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                }}
              >
                {benefit.icon}
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  marginBottom: 12,
                  color: NAVY,
                  letterSpacing: "-0.01em",
                }}
              >
                {benefit.title}
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: GRAY,
                  fontWeight: 500,
                }}
              >
                {benefit.desc}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Dramatic Comparison (11-15s = 120 frames)
const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const basicX = spring({
    frame: frame - 20,
    fps,
    from: -800,
    to: 0,
    config: { damping: 100, stiffness: 180 },
  });

  const featuredX = spring({
    frame: frame - 35,
    fps,
    from: 800,
    to: 0,
    config: { damping: 100, stiffness: 180 },
  });

  const arrowScale = spring({
    frame: frame - 50,
    fps,
    config: { damping: 100, stiffness: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: NAVY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 80,
          maxWidth: 1600,
        }}
      >
        {/* Basic Card */}
        <div
          style={{
            flex: 1,
            transform: `translateX(${basicX}px)`,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 32,
              padding: 60,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 80, marginBottom: 30 }}>📋</div>
            <h3
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: WHITE,
                marginBottom: 40,
                opacity: 0.7,
              }}
            >
              Basic Listing
            </h3>
            <div
              style={{
                fontSize: 28,
                color: WHITE,
                lineHeight: 2,
                opacity: 0.6,
                textAlign: "left",
              }}
            >
              • Business info
              <br />
              • Contact details
              <br />
              • Service list
              <br />• Location
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            transform: `scale(${arrowScale})`,
            fontSize: 80,
            color: GOLD,
            filter: "drop-shadow(0 0 40px rgba(251, 191, 36, 0.5))",
          }}
        >
          →
        </div>

        {/* Featured Card */}
        <div
          style={{
            flex: 1,
            transform: `translateX(${featuredX}px)`,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${GOLD} 0%, #f59e0b 100%)`,
              borderRadius: 32,
              padding: 60,
              textAlign: "center",
              boxShadow: "0 40px 100px rgba(251, 191, 36, 0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Shine effect */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: -100,
                width: 100,
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                transform: `translateX(${frame * 20}px)`,
              }}
            />

            <div style={{ fontSize: 80, marginBottom: 30 }}>👑</div>
            <h3
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: "#78350f",
                marginBottom: 20,
              }}
            >
              Featured Listing
            </h3>
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: "#78350f",
                marginBottom: 40,
              }}
            >
              $99/mo
            </div>
            <div
              style={{
                fontSize: 28,
                color: "#78350f",
                lineHeight: 2,
                fontWeight: 600,
                textAlign: "left",
              }}
            >
              ✨ Premium placement
              <br />
              ✨ Gold badge
              <br />
              ✨ 3x visibility
              <br />✨ Priority support
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Sleek CTA (15-18s = 90 frames)
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const contentScale = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 200 },
  });

  const pulse = Math.sin(frame / 15) * 0.03 + 1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${BLUE} 0%, ${DARK_BLUE} 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 800,
          height: 800,
          background: `radial-gradient(circle, ${GOLD}30 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(100px)",
        }}
      />

      <div
        style={{
          transform: `scale(${contentScale})`,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        {/* QR Code */}
        <div
          style={{
            width: 400,
            height: 400,
            background: WHITE,
            borderRadius: 32,
            margin: "0 auto 60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 200,
            boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
            border: `8px solid ${GOLD}`,
          }}
        >
          📱
        </div>

        {/* Text */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: WHITE,
            marginBottom: 30,
            letterSpacing: "-0.01em",
          }}
        >
          Scan to See Your Future Listing
        </div>

        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: GOLD,
            marginBottom: 60,
            letterSpacing: "-0.02em",
            textShadow: "0 0 60px rgba(251, 191, 36, 0.5)",
          }}
        >
          PottyDirectory.com
        </div>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${pulse})`,
            fontSize: 48,
            fontWeight: 700,
            color: NAVY,
            background: GOLD,
            padding: "30px 80px",
            borderRadius: 100,
            display: "inline-block",
            boxShadow: "0 20px 60px rgba(251, 191, 36, 0.4)",
          }}
        >
          Get Listed in 5 Minutes →
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Explosive Finale (18-20s = 60 frames)
const FinaleScene: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 30], [0.8, 1.1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const opacity = interpolate(frame, [0, 15], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #dc2626 0%, #991b1b 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 1000,
          height: 1000,
          background: `radial-gradient(circle, ${GOLD}40 0%, transparent 60%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(120px)",
        }}
      />

      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <div style={{ fontSize: 140, marginBottom: 40 }}>🎉</div>
        <h2
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: WHITE,
            marginBottom: 40,
            letterSpacing: "-0.02em",
            textShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
        >
          WWETT 2026 SPECIAL
        </h2>
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: GOLD,
            marginBottom: 30,
            textShadow: "0 0 80px rgba(251, 191, 36, 0.6)",
          }}
        >
          20% OFF
        </div>
        <div
          style={{
            fontSize: 52,
            color: WHITE,
            fontWeight: 600,
            opacity: 0.95,
          }}
        >
          Your First Year of Featured Listing
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Main Composition
export const WWETTPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Sequence from={0} durationInFrames={90}>
        <OpeningScene />
      </Sequence>

      <Sequence from={90} durationInFrames={120}>
        <StatsScene />
      </Sequence>

      <Sequence from={210} durationInFrames={120}>
        <BenefitsScene />
      </Sequence>

      <Sequence from={330} durationInFrames={120}>
        <ComparisonScene />
      </Sequence>

      <Sequence from={450} durationInFrames={90}>
        <CTAScene />
      </Sequence>

      <Sequence from={540} durationInFrames={60}>
        <FinaleScene />
      </Sequence>
    </AbsoluteFill>
  );
};
