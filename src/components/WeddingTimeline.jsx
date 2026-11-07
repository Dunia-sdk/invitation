import React from 'react'
import { motion } from 'framer-motion'
import { GoldDivider, FloralOrnament } from './Ornaments'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay } },
})

function TimelineEvent({ event, index }) {
  return (
    <motion.div
      variants={fadeUp(index * 0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}
      style={{ display:'flex', alignItems:'flex-start', gap:'clamp(16px,4vw,32px)' }}
    >
      {/* Icon circle */}
      <div style={{
        flexShrink: 0, width:'clamp(44px,10vw,56px)', height:'clamp(44px,10vw,56px)',
        borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'clamp(1.1rem,2.5vw,1.4rem)',
        background:'linear-gradient(135deg, #a07c3a 0%, #C6A15B 40%, #E8D5A0 60%, #C6A15B 80%, #a07c3a 100%)',
        boxShadow:'0 4px 16px rgba(198,161,91,0.4)',
        marginTop: 4,
      }}>
        {event.icon}
      </div>

      {/* Content */}
      <div style={{
        flex:1, padding:'clamp(14px,3vw,20px)', borderRadius:2,
        background:'rgba(248,242,232,0.6)',
        border:'1px solid rgba(198,161,91,0.2)',
      }}>
        <span style={{
          display:'block', marginBottom:6, fontFamily:'"Cormorant Garamond", serif',
          fontSize:'clamp(0.85rem,2vw,1rem)', fontWeight:600, letterSpacing:'0.1em',
          background:'linear-gradient(135deg, #a07c3a, #C6A15B, #E8D5A0)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
        }}>{event.time}</span>
        <h3 style={{ fontFamily:'"Playfair Display", serif', fontSize:'clamp(1rem,2.5vw,1.15rem)', color:'#641B30', fontWeight:600, marginBottom:6 }}>
          {event.title}
        </h3>
        <p style={{ fontFamily:'"Cormorant Garamond", serif', fontSize:'clamp(0.9rem,2vw,1rem)', color:'rgba(100,27,48,0.7)', fontStyle:'italic', lineHeight:1.7 }}>
          {event.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function WeddingTimeline() {
  const { lang } = useLanguage()
  const t = translations[lang]

  const events = [
    { time: '20:00', title: t.eventTitle, description: t.eventDescription, icon: '✨' },
  ]

  return (
    <section id="programme" className="ivory-paper"
      style={{ position:'relative', padding:'clamp(60px,10vw,96px) clamp(16px,5vw,32px)', overflow:'hidden' }}>

      <div style={{ position:'relative', zIndex:10, maxWidth:640, margin:'0 auto' }}>

        {/* Header */}
        <motion.div variants={fadeUp(0)} initial="hidden" whileInView="visible" viewport={{ once:true }}
          style={{ textAlign:'center', marginBottom:'clamp(40px,8vw,64px)' }}>
          <p style={{ fontFamily:'Lato, sans-serif', fontSize:'clamp(0.6rem,2vw,0.72rem)', letterSpacing:'0.4em', textTransform:'uppercase', color:'#a07c3a', marginBottom:'clamp(10px,2vw,16px)' }}>
            ✦ &nbsp;{t.programme}&nbsp; ✦
          </p>
          <h2 style={{ fontFamily:'"Playfair Display", serif', fontSize:'clamp(1.8rem,5vw,3rem)', color:'#641B30', fontWeight:700 }}>
            {t.ourSpecialDay}
          </h2>
          <div style={{ marginTop:'clamp(14px,3vw,24px)' }}><GoldDivider/></div>
        </motion.div>

        {/* Events */}
        <div style={{ display:'flex', flexDirection:'column', gap:'clamp(20px,4vw,32px)' }}>
          {events.map((event, i) => <TimelineEvent key={i} event={event} index={i}/>)}
        </div>

        {/* Note */}
        <motion.p variants={fadeUp(0.4)} initial="hidden" whileInView="visible" viewport={{ once:true }}
          style={{ marginTop:32, textAlign:'center', fontFamily:'"Cormorant Garamond", serif', fontSize:'clamp(0.85rem,2vw,1rem)', color:'rgba(100,27,48,0.45)', fontStyle:'italic' }}>
          {t.programmeNote}
        </motion.p>

        {/* Bottom floral */}
        <motion.div variants={fadeUp(0.5)} initial="hidden" whileInView="visible" viewport={{ once:true }}
          style={{ display:'flex', justifyContent:'center', marginTop:'clamp(32px,6vw,48px)' }}>
          <FloralOrnament/>
        </motion.div>
      </div>
    </section>
  )
}
