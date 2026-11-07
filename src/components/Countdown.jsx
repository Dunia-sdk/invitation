import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GoldDivider } from './Ornaments'
import { CONFIG } from '../config'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n'

function pad(n) { return String(n).padStart(2, '0') }

function getTimeLeft() {
  const diff = Math.max(0, CONFIG.weddingDate.getTime() - Date.now())
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function CountdownUnit({ value, label }) {
  const [prev, setPrev] = useState(value)
  const [flip, setFlip] = useState(false)

  useEffect(() => {
    if (value !== prev) {
      setFlip(true)
      const t = setTimeout(() => { setFlip(false); setPrev(value) }, 350)
      return () => clearTimeout(t)
    }
  }, [value, prev])

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'clamp(8px,2vw,12px)' }}>
      <div style={{
        position:'relative', display:'flex', alignItems:'center', justifyContent:'center',
        width:'clamp(68px,16vw,100px)', height:'clamp(78px,18vw,112px)',
        background:'linear-gradient(145deg, rgba(248,242,232,0.1) 0%, rgba(248,242,232,0.05) 100%)',
        border:'1px solid rgba(198,161,91,0.3)', borderRadius:4,
        boxShadow:'inset 0 1px 0 rgba(198,161,91,0.15), 0 8px 32px rgba(0,0,0,0.3)',
        overflow:'hidden',
      }}>
        {/* Centre fold line */}
        <div style={{ position:'absolute', left:0, right:0, top:'50%', height:1, background:'rgba(0,0,0,0.25)', zIndex:2 }}/>
        {/* Gradient overlay */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 30% 30%, rgba(198,161,91,0.08) 0%, transparent 70%)' }}/>

        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={flip ? { rotateX:-90, opacity:0 } : false}
            animate={{ rotateX:0, opacity:1 }}
            exit={{ rotateX:90, opacity:0 }}
            transition={{ duration:0.28, ease:'easeOut' }}
            style={{
              fontFamily:'"Cormorant Garamond", serif',
              fontSize:'clamp(1.8rem, 6vw, 3.2rem)',
              fontWeight:600, lineHeight:1,
              background:'linear-gradient(180deg, #E8D5A0 0%, #C6A15B 50%, #a07c3a 100%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              display:'block', zIndex:1, position:'relative',
            }}
          >
            {pad(value)}
          </motion.span>
        </AnimatePresence>
      </div>
      <p style={{
        fontFamily:'Lato, sans-serif', fontSize:'clamp(0.55rem,1.5vw,0.72rem)',
        letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(198,161,91,0.7)',
      }}>{label}</p>
    </div>
  )
}

function Colon() {
  return (
    <div style={{
      display:'flex', flexDirection:'column', gap:6, paddingBottom:'clamp(24px,5vw,36px)',
      color:'rgba(198,161,91,0.5)', fontFamily:'"Cormorant Garamond", serif',
      fontSize:'clamp(1.2rem,3vw,2rem)', userSelect:'none',
    }}>
      <span>·</span><span>·</span>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft)
  const { lang } = useLanguage()
  const t = translations[lang]

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="countdown" className="velvet-bg"
      style={{ position:'relative', padding:'clamp(60px,10vw,96px) clamp(16px,5vw,32px)', overflow:'hidden' }}>

      {/* Particles */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div key={i}
            style={{
              position:'absolute', width:2, height:2, borderRadius:'50%', background:'#C6A15B',
              left:`${10 + Math.random()*80}%`, top:`${10 + Math.random()*80}%`, opacity:0.25,
            }}
            animate={{ y:[0,-18,0], opacity:[0.15,0.5,0.15] }}
            transition={{ duration:3+Math.random()*3, repeat:Infinity, delay:Math.random()*3 }}
          />
        ))}
      </div>

      <div style={{ position:'relative', zIndex:10, maxWidth:800, margin:'0 auto', textAlign:'center' }}>

        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8 }} viewport={{ once:true }}
          style={{ marginBottom:'clamp(36px,7vw,56px)' }}>
          <p style={{ fontFamily:'Lato, sans-serif', fontSize:'clamp(0.6rem,2vw,0.75rem)', letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(198,161,91,0.7)', marginBottom:'clamp(12px,2vw,16px)' }}>
            ✦ &nbsp;{t.grandDayApproaches}&nbsp; ✦
          </p>
          <h2 style={{
            fontFamily:'"Playfair Display", serif', fontSize:'clamp(1.8rem,5vw,3rem)', fontWeight:700,
            background:'linear-gradient(135deg, #a07c3a, #C6A15B, #E8D5A0, #C6A15B, #a07c3a)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          }}>{t.countdown}</h2>
          <div style={{ marginTop:'clamp(16px,3vw,24px)' }}><GoldDivider /></div>
        </motion.div>

        <motion.div
          initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }}
          transition={{ duration:0.8, delay:0.2 }} viewport={{ once:true }}
          style={{ display:'flex', alignItems:'flex-end', justifyContent:'center', flexWrap:'wrap', gap:'clamp(6px,2vw,16px)' }}
        >
          <CountdownUnit value={time.days}    label={t.days}    />
          <Colon/>
          <CountdownUnit value={time.hours}   label={t.hours}   />
          <Colon/>
          <CountdownUnit value={time.minutes} label={t.minutes} />
          <Colon/>
          <CountdownUnit value={time.seconds} label={t.seconds} />
        </motion.div>

        <motion.p
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.4 }} viewport={{ once:true }}
          style={{ marginTop:'clamp(28px,6vw,48px)', fontFamily:'"Cormorant Garamond", serif', fontSize:'clamp(0.9rem,2.5vw,1.2rem)', color:'rgba(248,242,232,0.5)', fontStyle:'italic', letterSpacing:'0.2em' }}
        >
          {t.dateFootnote}
        </motion.p>
      </div>
    </section>
  )
}
