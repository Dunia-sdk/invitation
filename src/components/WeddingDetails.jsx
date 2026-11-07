import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GoldDivider, FloralOrnament, CornerOrnament } from './Ornaments'
import { CONFIG } from '../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay } },
})

// ─── Gold icon disk with FA icon ─────────────────────────────────────────────
function GoldIconDisk({ icon }) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Outer glow ring */}
      <div style={{
        position: 'absolute',
        inset: -4,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(198,161,91,0.25) 0%, transparent 72%)',
        pointerEvents: 'none',
      }} />
      {/* Main gold disk */}
      <div style={{
        position: 'relative',
        width: 'clamp(52px, 11vw, 64px)',
        height: 'clamp(52px, 11vw, 64px)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(145deg, #E8D5A0 0%, #C6A15B 25%, #a07c3a 55%, #C6A15B 80%, #E8D5A0 100%)',
        boxShadow: `
          0 6px 20px rgba(160,124,58,0.45),
          0 2px 6px rgba(160,124,58,0.3),
          inset 0 1px 2px rgba(255,255,255,0.5),
          inset 0 -1px 2px rgba(100,60,0,0.3)
        `,
      }}>
        {/* Inner emboss ring */}
        <div style={{
          position: 'absolute',
          inset: 5,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          pointerEvents: 'none',
        }} />
        {/* FA Icon */}
        <FontAwesomeIcon
          icon={icon}
          style={{
            fontSize: 'clamp(1.1rem, 2.8vw, 1.35rem)',
            color: '#45101F',
            filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.25)) drop-shadow(0 1px 2px rgba(50,10,10,0.3))',
          }}
        />
      </div>
    </div>
  )
}

// ─── Individual detail card ───────────────────────────────────────────────────
function DetailCard({ icon, label, value, delay = 0 }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={fadeUp(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(10px, 2vw, 16px)',
        padding: 'clamp(24px, 4.5vw, 36px) clamp(20px, 3.5vw, 32px)',
        textAlign: 'center',
        flex: '1 1 180px',
        minWidth: 0,
        background: hovered
          ? 'linear-gradient(145deg, rgba(255,252,245,1) 0%, rgba(248,242,232,0.98) 100%)'
          : 'linear-gradient(145deg, rgba(248,242,232,0.97) 0%, rgba(242,235,222,0.93) 100%)',
        border: hovered
          ? '1px solid rgba(198,161,91,0.55)'
          : '1px solid rgba(198,161,91,0.28)',
        borderRadius: 3,
        boxShadow: hovered
          ? '0 12px 40px rgba(69,16,31,0.14), 0 4px 16px rgba(198,161,91,0.15), inset 0 1px 0 rgba(255,255,255,0.9)'
          : '0 4px 24px rgba(69,16,31,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'default',
      }}
    >
      {/* Inner gold border frame */}
      <div style={{
        position: 'absolute',
        inset: 7,
        border: `1px solid ${hovered ? 'rgba(198,161,91,0.22)' : 'rgba(198,161,91,0.1)'}`,
        borderRadius: 2,
        pointerEvents: 'none',
        transition: 'border-color 0.35s ease',
      }} />

      {/* Top gold line accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        right: '20%',
        height: 2,
        background: 'linear-gradient(90deg, transparent, #C6A15B, transparent)',
        borderRadius: '0 0 2px 2px',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease',
      }} />

      {/* Icon */}
      <GoldIconDisk icon={icon} />

      {/* Label */}
      <p style={{
        fontFamily: 'Lato, sans-serif',
        fontSize: 'clamp(0.55rem, 1.4vw, 0.68rem)',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: '#a07c3a',
        fontWeight: 700,
        lineHeight: 1,
      }}>
        {label}
      </p>

      {/* Thin gold separator */}
      <div style={{
        width: 'clamp(32px, 8vw, 48px)',
        height: 1,
        background: 'linear-gradient(90deg, transparent, #C6A15B, transparent)',
        opacity: 0.6,
      }} />

      {/* Value */}
      <p style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 'clamp(1rem, 2.8vw, 1.35rem)',
        color: '#641B30',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '0.02em',
      }}>
        {value}
      </p>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function WeddingDetails() {
  const [mapHovered, setMapHovered] = useState(false)
  const { lang } = useLanguage()
  const t = translations[lang]

  return (
    <section
      id="details"
      className="velvet-bg"
      style={{ position: 'relative', padding: 'clamp(60px,10vw,96px) clamp(16px,5vw,32px)', overflow: 'hidden' }}
    >
      {/* Top Moroccan arch border */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <svg width="100%" height="52" viewBox="0 0 1200 52" preserveAspectRatio="none">
          <defs>
            <linearGradient id="archTopDet" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="transparent" />
              <stop offset="20%"  stopColor="#C6A15B" stopOpacity="0.5" />
              <stop offset="50%"  stopColor="#E8D5A0" stopOpacity="0.75" />
              <stop offset="80%"  stopColor="#C6A15B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M0,47 Q75,8 150,47 Q225,8 300,47 Q375,8 450,47 Q525,8 600,47 Q675,8 750,47 Q825,8 900,47 Q975,8 1050,47 Q1125,8 1200,47"
            stroke="url(#archTopDet)" strokeWidth="1.5" fill="none"
          />
          <path
            d="M0,52 Q75,16 150,52 Q225,16 300,52 Q375,16 450,52 Q525,16 600,52 Q675,16 750,52 Q825,16 900,52 Q975,16 1050,52 Q1125,16 1200,52"
            stroke="url(#archTopDet)" strokeWidth="0.6" fill="none" opacity="0.4"
          />
        </svg>
      </div>

      {/* Corner ornaments */}
      <div style={{ position: 'absolute', top: 20, left: 10, opacity: 0.3 }}>
        <CornerOrnament rotate={0} />
      </div>
      <div style={{ position: 'absolute', top: 20, right: 10, opacity: 0.3 }}>
        <CornerOrnament rotate={90} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 900, margin: '0 auto' }}>

        {/* ── Section header ── */}
        <motion.div
          variants={fadeUp(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px,8vw,64px)' }}
        >
          <p style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: 'clamp(0.6rem, 2vw, 0.72rem)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: 'rgba(198,161,91,0.72)',
            marginBottom: 'clamp(10px,2vw,16px)',
          }}>
            ✦ &nbsp;{t.joinUs}&nbsp; ✦
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #a07c3a, #C6A15B, #E8D5A0, #C6A15B, #a07c3a)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {t.ceremonyDetails}
          </h2>
          <div style={{ marginTop: 'clamp(14px,3vw,22px)' }}>
            <GoldDivider />
          </div>
        </motion.div>

        {/* ── Detail cards ── */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(14px, 3vw, 24px)',
          justifyContent: 'center',
          marginBottom: 'clamp(32px,6vw,52px)',
        }}>
          <DetailCard icon={faCalendarDays} label={t.dateLabel}  value={t.dateValue}        delay={0.1} />
          <DetailCard icon={faClock}        label={t.timeLabel}  value={t.timeValue}        delay={0.2} />
          <DetailCard icon={faLocationDot}  label={t.venueLabel} value={CONFIG.venueName}   delay={0.3} />
        </div>

        {/* ── Google Maps button ── */}
        <motion.div
          variants={fadeUp(0.4)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <a
            href={CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setMapHovered(true)}
            onMouseLeave={() => setMapHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'clamp(8px, 2vw, 12px)',
              padding: 'clamp(12px,2.5vw,15px) clamp(22px,5vw,44px)',
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(0.88rem, 2.3vw, 1.05rem)',
              letterSpacing: '0.08em',
              color: mapHovered ? '#E8D5A0' : '#C6A15B',
              textDecoration: 'none',
              border: `1px solid ${mapHovered ? 'rgba(198,161,91,0.75)' : 'rgba(198,161,91,0.45)'}`,
              borderRadius: 2,
              background: mapHovered
                ? 'rgba(198,161,91,0.1)'
                : 'rgba(255,255,255,0.03)',
              boxShadow: mapHovered
                ? '0 4px 20px rgba(198,161,91,0.15), inset 0 1px 0 rgba(198,161,91,0.08)'
                : 'none',
              transform: mapHovered ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{
                fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                color: '#C6A15B',
                filter: 'drop-shadow(0 0 4px rgba(198,161,91,0.5))',
                flexShrink: 0,
                transition: 'filter 0.3s ease',
              }}
            />
            <span>{t.viewOnMaps}</span>
          </a>
        </motion.div>

        {/* ── Bottom floral ── */}
        <motion.div
          variants={fadeUp(0.5)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(44px,8vw,68px)' }}
        >
          <FloralOrnament />
        </motion.div>
      </div>

      {/* Bottom arch border */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, transform: 'scaleY(-1)' }}>
        <svg width="100%" height="52" viewBox="0 0 1200 52" preserveAspectRatio="none">
          <path
            d="M0,47 Q75,8 150,47 Q225,8 300,47 Q375,8 450,47 Q525,8 600,47 Q675,8 750,47 Q825,8 900,47 Q975,8 1050,47 Q1125,8 1200,47"
            stroke="url(#archTopDet)" strokeWidth="1.5" fill="none"
          />
        </svg>
      </div>
    </section>
  )
}
