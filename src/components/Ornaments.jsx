// Shared SVG ornaments for Moroccan luxury aesthetic
import React from 'react'

// ─── Metallic Gold Divider ────────────────────────────────────────────────────
export function GoldDivider({ className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px" style={{
        background: 'linear-gradient(90deg, transparent, #C6A15B, transparent)'
      }} />
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="2" fill="#C6A15B" />
        <path d="M16 4 L18 14 L28 16 L18 18 L16 28 L14 18 L4 16 L14 14 Z"
          fill="url(#goldStar)" stroke="#E8D5A0" strokeWidth="0.5" />
        <defs>
          <linearGradient id="goldStar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a07c3a" />
            <stop offset="40%" stopColor="#E8D5A0" />
            <stop offset="100%" stopColor="#C6A15B" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex-1 h-px" style={{
        background: 'linear-gradient(90deg, transparent, #C6A15B, transparent)'
      }} />
    </div>
  )
}

// ─── Moroccan Star Ornament ────────────────────────────────────────────────────
export function MoroccanStar({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={`${className}`}>
      <defs>
        <linearGradient id="goldGradStar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a07c3a" />
          <stop offset="30%" stopColor="#C6A15B" />
          <stop offset="55%" stopColor="#E8D5A0" />
          <stop offset="80%" stopColor="#C6A15B" />
          <stop offset="100%" stopColor="#a07c3a" />
        </linearGradient>
      </defs>
      {/* 8-pointed star */}
      <path d="M24 2 L26.5 20 L44 18 L29 26 L44 34 L26.5 32 L24 46 L21.5 32 L4 34 L19 26 L4 18 L21.5 20 Z"
        fill="url(#goldGradStar)" />
      <circle cx="24" cy="24" r="4" fill="url(#goldGradStar)" />
    </svg>
  )
}

// ─── Floral Ornament Top/Bottom ────────────────────────────────────────────────
export function FloralOrnament({ className = '', flip = false }) {
  return (
    <svg
      width="280" height="60" viewBox="0 0 280 60"
      className={className}
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <defs>
        <linearGradient id="floralGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="20%" stopColor="#C6A15B" />
          <stop offset="50%" stopColor="#E8D5A0" />
          <stop offset="80%" stopColor="#C6A15B" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {/* Center diamond */}
      <path d="M140 10 L146 30 L140 50 L134 30 Z" fill="url(#floralGold)" />
      {/* Left branch */}
      <path d="M134 30 Q110 20 80 25 Q90 30 110 30 Q90 32 80 38 Q110 36 134 30"
        fill="#C6A15B" opacity="0.7" />
      <path d="M80 25 Q60 15 30 20 Q45 25 65 26 Q45 27 30 32 Q60 32 80 38"
        fill="#C6A15B" opacity="0.5" />
      {/* Right branch (mirror) */}
      <path d="M146 30 Q170 20 200 25 Q190 30 170 30 Q190 32 200 38 Q170 36 146 30"
        fill="#C6A15B" opacity="0.7" />
      <path d="M200 25 Q220 15 250 20 Q235 25 215 26 Q235 27 250 32 Q220 32 200 38"
        fill="#C6A15B" opacity="0.5" />
      {/* Small dots */}
      {[50, 70, 90, 190, 210, 230].map((x, i) => (
        <circle key={i} cx={x} cy="30" r="2" fill="#E8D5A0" opacity="0.8" />
      ))}
    </svg>
  )
}

// ─── Moroccan Arch Border ─────────────────────────────────────────────────────
export function MoroccanBorder({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <svg width="100%" height="40" viewBox="0 0 400 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="borderGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="#C6A15B" />
            <stop offset="50%" stopColor="#E8D5A0" />
            <stop offset="85%" stopColor="#C6A15B" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M0,38 L380,38 M10,36 Q30,20 50,36 Q70,20 90,36 Q110,20 130,36 Q150,20 170,36 Q190,20 210,36 Q230,20 250,36 Q270,20 290,36 Q310,20 330,36 Q350,20 370,36 L390,38"
          stroke="url(#borderGold)" strokeWidth="1.5" fill="none"
        />
      </svg>
    </div>
  )
}

// ─── Wax Seal SVG ─────────────────────────────────────────────────────────────
export function WaxSeal({ initials = 'K & A', size = 120, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className}>
      <defs>
        <radialGradient id="sealGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#E8D5A0" />
          <stop offset="30%" stopColor="#C6A15B" />
          <stop offset="70%" stopColor="#a07c3a" />
          <stop offset="100%" stopColor="#7a5c20" />
        </radialGradient>
        <filter id="sealShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#45101F" floodOpacity="0.5" />
        </filter>
      </defs>
      {/* Outer ring with decorative teeth */}
      <circle cx="60" cy="60" r="56" fill="url(#sealGrad)" filter="url(#sealShadow)" />
      {/* Concentric ring decoration */}
      {[52, 46].map((r, i) => (
        <circle key={i} cx="60" cy="60" r={r}
          fill="none" stroke="#7a5c20" strokeWidth={i === 0 ? 1.5 : 0.8} opacity="0.6" />
      ))}
      {/* Star decoration points around edge */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24
        const rad = (angle * Math.PI) / 180
        const x1 = 60 + 54 * Math.cos(rad)
        const y1 = 60 + 54 * Math.sin(rad)
        const x2 = 60 + 48 * Math.cos(rad)
        const y2 = 60 + 48 * Math.sin(rad)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#7a5c20" strokeWidth="1" opacity="0.5" />
      })}
      {/* Inner circle */}
      <circle cx="60" cy="60" r="38" fill="none" stroke="#7a5c20" strokeWidth="1" opacity="0.4" />
      {/* Initials text */}
      <text
        x="60" y="67" textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="20" fontWeight="600"
        fill="#45101F" letterSpacing="1"
      >
        {initials}
      </text>
    </svg>
  )
}

// ─── Corner Ornament ─────────────────────────────────────────────────────────
export function CornerOrnament({ className = '', rotate = 0 }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className={className}
      style={{ transform: `rotate(${rotate}deg)` }}>
      <defs>
        <linearGradient id="cornerGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a07c3a" />
          <stop offset="50%" stopColor="#E8D5A0" />
          <stop offset="100%" stopColor="#C6A15B" />
        </linearGradient>
      </defs>
      <path d="M5,5 L5,40 Q5,10 40,5 Z" fill="url(#cornerGold)" opacity="0.8" />
      <path d="M5,5 L30,5 Q10,5 5,30 Z" fill="url(#cornerGold)" opacity="0.6" />
      <circle cx="5" cy="5" r="4" fill="#E8D5A0" />
      <path d="M15,5 Q10,15 5,15" stroke="url(#cornerGold)" strokeWidth="1.5" fill="none" />
      <path d="M5,15 Q5,25 15,30" stroke="url(#cornerGold)" strokeWidth="1" fill="none" opacity="0.6" />
    </svg>
  )
}

