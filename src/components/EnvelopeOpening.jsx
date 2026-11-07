import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Floral vine SVG ─────────────────────────────────────────────────────────
function FloralVine() {
  const flowers = [40, 90, 140, 190, 240, 290, 340, 390]
  return (
    <svg viewBox="0 0 60 440" fill="none" style={{ width: '100%', height: '100%' }}>
      {/* Main stem */}
      <path
        d="M30 5 C28 55 32 105 30 155 C28 205 32 255 30 305 C28 355 32 405 30 440"
        stroke="rgba(190,170,140,0.3)" strokeWidth="1" fill="none" strokeLinecap="round"
      />
      {flowers.map((y, i) => (
        <g key={i} transform={`translate(30, ${y})`}>
          {/* Centre circle */}
          <circle cx="0" cy="0" r="4" fill="rgba(190,170,140,0.18)" stroke="rgba(190,170,140,0.25)" strokeWidth="0.6"/>
          {/* 5 petals */}
          {[0, 72, 144, 216, 288].map((angle, j) => {
            const rad = (angle * Math.PI) / 180
            const px = 7 * Math.cos(rad), py = 7 * Math.sin(rad)
            return <ellipse key={j} cx={px} cy={py} rx="3" ry="2"
              transform={`rotate(${angle}, ${px}, ${py})`}
              fill="rgba(190,170,140,0.15)" stroke="rgba(190,170,140,0.2)" strokeWidth="0.4"/>
          })}
          {/* Two leaf branches */}
          <path d={`M0 0 C-10 -6 -16 -2 -14 6`} stroke="rgba(190,170,140,0.22)" strokeWidth="0.7" fill="none"/>
          <ellipse cx="-10" cy="-1" rx="5" ry="2" transform="rotate(-25,-10,-1)" fill="rgba(190,170,140,0.14)"/>
          <path d={`M0 0 C10 -6 16 -2 14 6`} stroke="rgba(190,170,140,0.22)" strokeWidth="0.7" fill="none"/>
          <ellipse cx="10" cy="-1" rx="5" ry="2" transform="rotate(25,10,-1)" fill="rgba(190,170,140,0.14)"/>
        </g>
      ))}
    </svg>
  )
}

// ─── Realistic wax seal ───────────────────────────────────────────────────────
function WaxSeal({ size, breaking, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      style={{ width: size, height: size, cursor: 'pointer', position: 'relative', flexShrink: 0 }}
      whileHover={{ scale: 1.05 }}
      animate={breaking
        ? { scale: [1, 1.1, 0.8, 0], rotate: [0, -6, 10, 20], opacity: [1, 0.9, 0.5, 0] }
        : {}}
      transition={breaking ? { duration: 0.65, ease: 'easeIn' } : {}}
    >
      <svg width={size} height={size} viewBox="0 0 130 130">
        <defs>
          <radialGradient id="waxG" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#8B2035"/>
            <stop offset="40%" stopColor="#6B1525"/>
            <stop offset="75%" stopColor="#4A0F1A"/>
            <stop offset="100%" stopColor="#300A10"/>
          </radialGradient>
          <radialGradient id="waxShine" cx="28%" cy="22%" r="45%">
            <stop offset="0%" stopColor="rgba(210,110,120,0.4)"/>
            <stop offset="100%" stopColor="rgba(210,110,120,0)"/>
          </radialGradient>
          <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8a6520"/>
            <stop offset="30%" stopColor="#C6A15B"/>
            <stop offset="55%" stopColor="#E8D5A0"/>
            <stop offset="80%" stopColor="#C6A15B"/>
            <stop offset="100%" stopColor="#8a6520"/>
          </linearGradient>
          <filter id="sealShadow">
            <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="#200510" floodOpacity="0.5"/>
          </filter>
        </defs>
        {/* Irregular wax blob */}
        <path
          d="M65 5 C77 4,89 8,98 15 C108 22,116 33,122 45 C128 57,129 70,126 82 C123 94,116 105,106 113 C96 121,83 126,70 127 C57 128,44 125,34 118 C24 111,16 100,11 87 C6 74,5 60,9 47 C13 34,22 23,34 15 C44 7,53 6,65 5Z"
          fill="url(#waxG)" filter="url(#sealShadow)"
        />
        <path
          d="M65 5 C77 4,89 8,98 15 C108 22,116 33,122 45 C128 57,129 70,126 82 C123 94,116 105,106 113 C96 121,83 126,70 127 C57 128,44 125,34 118 C24 111,16 100,11 87 C6 74,5 60,9 47 C13 34,22 23,34 15 C44 7,53 6,65 5Z"
          fill="url(#waxShine)"
        />
        {/* Rim ring */}
        <circle cx="65" cy="65" r="43" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
        {/* Dot pattern on rim */}
        {Array.from({ length: 20 }).map((_, i) => {
          const a = (i * 18 * Math.PI) / 180
          return <circle key={i} cx={65 + 42 * Math.cos(a)} cy={65 + 42 * Math.sin(a)}
            r="1.3" fill="rgba(255,255,255,0.1)"/>
        })}
        {/* K & A text */}
        <text x="65" y="75" textAnchor="middle"
          fontFamily='"Great Vibes", cursive' fontSize="30" fill="url(#goldText)"
          style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.6))' }}
        >K &amp; A</text>
      </svg>

      {/* Crack lines on break */}
      {breaking && (
        <motion.svg width={size} height={size} viewBox="0 0 130 130"
          style={{ position: 'absolute', top: 0, left: 0 }}
          initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.65 }}>
          <path d="M65 65 L42 28 M65 65 L92 22 M65 65 L112 58 M65 65 L78 102 M65 65 L38 95"
            stroke="rgba(248,242,232,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
        </motion.svg>
      )}
    </motion.div>
  )
}

// ─── Main EnvelopeOpening component ─────────────────────────────────────────
export default function EnvelopeOpening({ onOpen }) {
  const [phase, setPhase] = useState('idle')
  // idle → breaking → opening → sliding → zooming → (onOpen called)
  const [sealSize, setSealSize] = useState(120)

  useEffect(() => {
    const updateSize = () => {
      setSealSize(Math.min(130, Math.max(80, window.innerWidth * 0.26)))
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const handleOpen = () => {
    if (phase !== 'idle') return
    setPhase('breaking')
    setTimeout(() => setPhase('opening'), 650)
    setTimeout(() => setPhase('sliding'), 1500)
    setTimeout(() => setPhase('zooming'), 2500)
    setTimeout(() => onOpen(), 3200)
  }

  const isFlapped = phase === 'opening' || phase === 'sliding' || phase === 'zooming'
  const showCard  = phase === 'sliding' || phase === 'zooming'
  const showSeal  = phase === 'idle' || phase === 'breaking'

  return (
    <motion.div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(145deg, #6a1d33 0%, #45101F 50%, #5a1828 100%)',
        overflow: 'hidden',
      }}
      animate={phase === 'zooming' ? { scale: 2.2, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={phase === 'zooming' ? { duration: 0.75, ease: [0.4, 0, 1, 1] } : { duration: 0 }}
    >
      {/* Background zellige */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.07, pointerEvents:'none' }}>
        <defs>
          <pattern id="bg-z" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="#E8D5A0" strokeWidth="0.5"/>
            <path d="M40 16 L64 40 L40 64 L16 40 Z" fill="none" stroke="#E8D5A0" strokeWidth="0.3"/>
            <circle cx="40" cy="40" r="5" fill="none" stroke="#E8D5A0" strokeWidth="0.2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-z)"/>
      </svg>

      {/* Floating gold particles */}
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div key={i}
          style={{
            position: 'absolute', borderRadius: '50%', background: '#C6A15B',
            width: 1 + (i % 3), height: 1 + (i % 3),
            left: `${5 + (i * 6.1) % 90}%`,
            top: `${5 + (i * 7.3) % 85}%`,
            opacity: 0.2,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* ─── Main layout ─── */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'clamp(16px, 3.5vh, 36px)',
        padding: 'clamp(16px, 4vw, 32px)',
        width: '100%', maxWidth: 480,
      }}>

        {/* Top gold line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          style={{ height: 1, width: 'min(180px, 55%)', background: 'linear-gradient(90deg, transparent, rgba(198,161,91,0.6), transparent)' }}
        />

        {/* Cordialement */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          style={{
            fontFamily: 'Lato, sans-serif', letterSpacing: '0.4em', textTransform: 'uppercase',
            fontSize: 'clamp(0.55rem, 1.8vw, 0.72rem)', color: 'rgba(198,161,91,0.75)',
          }}
        >
          Vous êtes cordialement invités
        </motion.p>

        {/* ─── Ivory Envelope ─── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            width: 'min(300px, 82vw)',
            aspectRatio: '9/14',
            filter: 'drop-shadow(0 25px 60px rgba(0,0,0,0.45))',
          }}
        >
          {/* Envelope body */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 6,
            background: 'linear-gradient(150deg, #F5EFE4 0%, #EEE5D4 45%, #F2EAD8 70%, #EAE0CC 100%)',
            overflow: 'hidden',
          }}>
            {/* ── Bottom flap ── */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
              clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
              background: 'linear-gradient(to top, #E8DEC8, #EDE5D2)',
            }}/>
            {/* ── Left flap ── */}
            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: '50%',
              clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
              background: 'linear-gradient(to right, #EAE0CA, #EDE5D2)',
            }}/>
            {/* ── Right flap ── */}
            <div style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%',
              clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)',
              background: 'linear-gradient(to left, #E6DCC6, #EDE5D2)',
            }}/>

            {/* ── Top flap (opens upward) ── */}
            <motion.div
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
                clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
                background: 'linear-gradient(to bottom, #EDE5D2, #E8DEC8)',
                transformOrigin: 'top center',
                zIndex: 10,
              }}
              animate={isFlapped
                ? { rotateX: -185, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] } }
                : { rotateX: 0 }
              }
            >
              {/* Inner shadow on flap */}
              <div style={{
                position: 'absolute', inset: 0,
                clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.03), rgba(0,0,0,0.1))',
              }}/>
            </motion.div>

            {/* ── Floral vines ── */}
            <div style={{ position: 'absolute', left: '3%', top: '4%', bottom: '4%', width: '14%', pointerEvents:'none' }}>
              <FloralVine />
            </div>
            <div style={{ position: 'absolute', right: '3%', top: '4%', bottom: '4%', width: '14%', transform: 'scaleX(-1)', pointerEvents:'none' }}>
              <FloralVine />
            </div>

            {/* Subtle fold-line shadows */}
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              background: 'linear-gradient(to bottom right, rgba(0,0,0,0.03) 0%, transparent 50%), linear-gradient(to bottom left, rgba(0,0,0,0.03) 0%, transparent 50%)',
            }}/>

            {/* ── Card sliding out ── */}
            <AnimatePresence>
              {showCard && (
                <motion.div
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '-6%', opacity: 1 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                  style={{
                    position: 'absolute', inset: '3% 5%', zIndex: 15,
                    background: 'linear-gradient(145deg, #FBF7F0, #F8F2E8)',
                    borderRadius: 3,
                    boxShadow: '0 -4px 24px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <div style={{ textAlign:'center', padding: '12px' }}>
                    <div style={{ fontFamily:'"Great Vibes", cursive', fontSize:'clamp(1.2rem,4vw,1.8rem)',
                      background:'linear-gradient(135deg, #a07c3a, #C6A15B, #E8D5A0, #C6A15B, #a07c3a)',
                      WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                    }}>Kaoutar &amp; Abdelsamad</div>
                    <div style={{ marginTop:8, fontFamily:'"Cormorant Garamond", serif', fontSize:'clamp(0.65rem,1.8vw,0.8rem)',
                      color:'rgba(100,27,48,0.6)', letterSpacing:'0.2em', textTransform:'uppercase' }}>
                      26 · 01 · 2027
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Wax Seal ── */}
            <AnimatePresence>
              {showSeal && (
                <motion.div
                  exit={{ scale: 0, opacity: 0, transition: { duration: 0.25 } }}
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20,
                  }}
                >
                  <WaxSeal
                    size={sealSize}
                    breaking={phase === 'breaking'}
                    onClick={handleOpen}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ─── CTA Button ─── */}
        <AnimatePresence>
          {phase === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: 14 }}
            >
              {/* Bounce arrow */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2 L9 16 M4 11 L9 16 L14 11"
                    stroke="rgba(198,161,91,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>

              <motion.button
                onClick={handleOpen}
                style={{
                  padding: 'clamp(10px,2.5vw,14px) clamp(28px,6vw,48px)',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: '#3A100E', border: 'none', borderRadius: 2, cursor: 'pointer',
                  background: 'linear-gradient(135deg, #a07c3a 0%, #C6A15B 25%, #E8D5A0 50%, #C6A15B 75%, #a07c3a 100%)',
                  backgroundSize: '200% auto',
                  boxShadow: '0 4px 20px rgba(198,161,91,0.3)',
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 6px 28px rgba(198,161,91,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                ✦ &nbsp;Ouvrir votre invitation&nbsp; ✦
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} transition={{ delay: 1.8 }}
          style={{
            fontFamily: '"Cormorant Garamond", serif', letterSpacing: '0.3em',
            fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', color: '#C6A15B',
          }}
        >
          26 · 01 · 2027
        </motion.p>
      </div>
    </motion.div>
  )
}
