import React from 'react'
import { motion } from 'framer-motion'
import { GoldDivider, FloralOrnament, MoroccanStar } from './Ornaments'
import { CONFIG } from '../config'

export default function Footer() {
  return (
    <footer id="footer" className="velvet-bg"
      style={{ position: 'relative', padding: 'clamp(60px,10vw,96px) clamp(16px,5vw,32px)', overflow: 'hidden' }}>

      {/* Pattern overlay */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.07, pointerEvents: 'none' }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="foot-p" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="#E8D5A0" strokeWidth="0.6" />
              <path d="M40 15 L65 40 L40 65 L15 40 Z" fill="none" stroke="#E8D5A0" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#foot-p)" />
        </svg>
      </div>

      {/* Top border line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(198,161,91,0.4), transparent)'
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <MoroccanStar size={44} style={{ animation: 'rotateSlow 20s linear infinite' }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(32px,6vw,48px)' }}>
          <FloralOrnament />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}
          style={{ marginBottom: 'clamp(24px,5vw,40px)' }}>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1rem,2.5vw,1.35rem)', color: 'rgba(248,242,232,0.75)', fontStyle: 'italic', lineHeight: 1.9, marginBottom: 20 }}>
            Nous avons hâte de partager ce moment inoubliable avec vous.
          </p>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(0.85rem,2vw,1rem)', color: 'rgba(198,161,91,0.75)', letterSpacing: '0.15em', fontStyle: 'italic', marginBottom: 14 }}>
            Avec tout notre amour,
          </p>
          <div style={{
            fontFamily: '"Great Vibes", cursive',
            fontSize: 'min(7vw, 3.8rem)',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #a07c3a, #C6A15B, #E8D5A0, #C6A15B, #a07c3a)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            backgroundSize: '200% auto', animation: 'goldShimmer 4s linear infinite', lineHeight: 1.2,
          }}>
            {CONFIG.bride} &amp; {CONFIG.groom}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}>
          <GoldDivider />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true }}
          style={{
            marginTop: 'clamp(20px,4vw,32px)', fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.2rem,3vw,1.7rem)', fontWeight: 600, letterSpacing: '0.3em',
            background: 'linear-gradient(135deg, #a07c3a, #C6A15B, #E8D5A0, #C6A15B, #a07c3a)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>
          26 · 01 · 2027
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(24px,5vw,40px)' }}>
          <FloralOrnament flip />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} viewport={{ once: true }}
          style={{ marginTop: 'clamp(24px,5vw,40px)', fontSize: '0.72rem', color: 'rgba(198,161,91,0.25)', fontFamily: 'Lato, sans-serif', letterSpacing: '0.15em' }}>
          © 2027 Kaoutar &amp; Abdsamad
        </motion.p>
      </div>
    </footer>
  )
}
