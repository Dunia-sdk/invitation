import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()
  const isAr = lang === 'ar'

  return (
    <motion.button
      onClick={() => setLang(isAr ? 'fr' : 'ar')}
      initial={{ opacity: 0, y: 20, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 2.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-label={isAr ? 'Switch to French' : 'Passer en Arabe'}
      title={isAr ? 'Français' : 'العربية'}
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 9000,
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: '1px solid rgba(198,161,91,0.45)',
        background: 'rgba(69, 16, 31, 0.88)',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        outline: 'none',
        fontFamily: isAr ? 'Lato, sans-serif' : '"Cormorant Garamond", serif',
        fontSize: isAr ? '0.72rem' : '1.05rem',
        fontWeight: 700,
        letterSpacing: isAr ? '0.05em' : '0.03em',
        color: '#C6A15B',
        transition: 'color 0.2s, border-color 0.2s',
      }}
      whileHover={{
        scale: 1.1,
        borderColor: 'rgba(198,161,91,0.75)',
        color: '#E8D5A0',
      }}
      whileTap={{ scale: 0.92 }}
    >
      {isAr ? 'FR' : 'ع'}
    </motion.button>
  )
}

