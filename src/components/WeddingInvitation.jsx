import React from 'react'
import { motion } from 'framer-motion'
import { GoldDivider, FloralOrnament, MoroccanBorder, CornerOrnament } from './Ornaments'
import { CONFIG } from '../config'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay } },
})

export default function WeddingInvitation() {
  const { lang } = useLanguage()
  const t = translations[lang]

  return (
    <section
      id="invitation"
      className="ivory-paper"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(60px, 10vw, 100px) clamp(16px, 5vw, 48px)',
        overflow: 'hidden',
      }}
    >
      {/* Background zellige */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none' }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="inv-zellige" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#641B30" strokeWidth="0.8"/>
              <circle cx="30" cy="30" r="8" fill="none" stroke="#641B30" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#inv-zellige)"/>
        </svg>
      </div>

      {/* Corner ornaments */}
      <CornerOrnament className="absolute top-3 left-3 opacity-50" rotate={0} />
      <CornerOrnament className="absolute top-3 right-3 opacity-50" rotate={90} />
      <CornerOrnament className="absolute bottom-3 left-3 opacity-50" rotate={270} />
      <CornerOrnament className="absolute bottom-3 right-3 opacity-50" rotate={180} />

      {/* Gold border frames */}
      <div style={{ position:'absolute', inset: 'clamp(12px,3vw,24px)', border:'1px solid rgba(198,161,91,0.22)', borderRadius:2, pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset: 'clamp(20px,4vw,36px)', border:'1px solid rgba(198,161,91,0.10)', borderRadius:2, pointerEvents:'none' }} />

      <div style={{ position:'relative', zIndex:10, maxWidth: 640, width:'100%', textAlign:'center' }}>

        {/* Pre-title */}
        <motion.p
          variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ fontFamily:'Lato, sans-serif', fontSize:'clamp(0.6rem,2vw,0.75rem)', letterSpacing:'0.4em', textTransform:'uppercase', color:'#C6A15B', marginBottom:'clamp(20px,4vw,32px)' }}
        >
          ✦ &nbsp;{t.invitationLabel}&nbsp; ✦
        </motion.p>

        {/* Floral top */}
        <motion.div variants={fadeUp(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ display:'flex', justifyContent:'center', marginBottom:'clamp(16px,3vw,24px)' }}>
          <FloralOrnament />
        </motion.div>

        {/* Couple names */}
        <motion.div variants={fadeUp(0.3)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ marginBottom: 'clamp(12px,2vw,20px)', width: '100%', overflow: 'hidden' }}>
          <h1 style={{
            fontFamily:'"Great Vibes", cursive',
            /* Scale purely with viewport so it always stays on one line */
            fontSize: 'min(8.5vw, 6.5rem)',
            lineHeight: 1.15,
            whiteSpace: 'nowrap',
            display: 'block',
            width: '100%',
            textAlign: 'center',
            /* Shrink text if still too wide (last resort) */
            overflowX: 'hidden',
            background:'linear-gradient(135deg, #a07c3a 0%, #C6A15B 25%, #E8D5A0 45%, #C6A15B 55%, #a07c3a 75%, #C6A15B 100%)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            backgroundSize:'200% auto', animation:'goldShimmer 4s linear infinite',
            filter:'drop-shadow(0 2px 8px rgba(198,161,91,0.25))',
          }}>
            {CONFIG.bride} &amp; {CONFIG.groom}
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div variants={fadeUp(0.4)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ marginBottom: 'clamp(16px,3vw,24px)' }}>
          <GoldDivider />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp(0.5)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ fontFamily:'"Cormorant Garamond", serif', fontSize:'clamp(0.7rem,2.5vw,1rem)', letterSpacing:'0.3em', textTransform:'uppercase', color:'#641B30', fontStyle:'italic', marginBottom:'clamp(8px,1.5vw,12px)' }}
        >
          {t.gettingMarried}
        </motion.p>

        {/* Date */}
        <motion.div variants={fadeUp(0.6)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ marginBottom: 'clamp(24px,5vw,40px)' }}>
          <p style={{
            fontFamily:'"Playfair Display", serif',
            fontSize:'clamp(1.2rem, 4vw, 2rem)',
            fontWeight:600, letterSpacing:'0.15em',
            background:'linear-gradient(135deg, #a07c3a, #C6A15B, #E8D5A0, #C6A15B, #a07c3a)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          }}>
            {t.dateDisplay}
          </p>
        </motion.div>

        {/* Floral bottom */}
        <motion.div variants={fadeUp(0.7)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ display:'flex', justifyContent:'center', marginBottom:'clamp(24px,5vw,40px)' }}>
          <FloralOrnament flip />
        </motion.div>

        {/* Romantic message */}
        <motion.div
          variants={fadeUp(0.8)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ position:'relative', padding:'clamp(16px,4vw,28px) clamp(20px,5vw,40px)' }}
        >
          <span style={{ position:'absolute', top:0, left:'clamp(8px,2vw,16px)', fontSize:'clamp(2.5rem,6vw,4rem)', lineHeight:1, color:'rgba(198,161,91,0.25)', fontFamily:'Georgia,serif' }}>"</span>
          <p style={{
            fontFamily:'"Cormorant Garamond", serif',
            fontSize:'clamp(0.95rem, 2.5vw, 1.2rem)',
            color:'#641B30', fontStyle:'italic', lineHeight:1.9,
          }}>
            {t.romanticMessage}
          </p>
          <span style={{ position:'absolute', bottom:0, right:'clamp(8px,2vw,16px)', fontSize:'clamp(2.5rem,6vw,4rem)', lineHeight:1, color:'rgba(198,161,91,0.25)', fontFamily:'Georgia,serif' }}>"</span>
        </motion.div>

        {/* Bottom border */}
        <motion.div variants={fadeUp(0.9)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ display:'flex', justifyContent:'center', marginTop:'clamp(20px,4vw,32px)' }}>
          <MoroccanBorder />
        </motion.div>
      </div>
    </section>
  )
}
