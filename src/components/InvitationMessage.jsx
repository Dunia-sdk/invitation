import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useT } from '../context/LanguageContext'
import { ArchEdge, Monogram, Star8 } from './ui/Ornaments'
import Reveal from './ui/Reveal'

// Each word brightens as the reader scrolls — the message is "read aloud" by the page.
function Word({ progress, i, n, reduce, children }) {
  const start = (i / n) * 0.8
  const opacity = useTransform(progress, [start, Math.min(start + 0.2, 1)], [0.2, 1])
  return <motion.span style={{ opacity: reduce ? 1 : opacity }}>{children} </motion.span>
}

export default function InvitationMessage() {
  const t = useT()
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.55'] })
  const words = t.romanticMessage.split(' ')

  return (
    <section id="message" ref={ref} className="section section--wine zellige message">
      <ArchEdge />
      <Star8 className="message__star" size={520} strokeWidth={0.18} />
      <div className="container message__inner">
        <Reveal><Monogram className="monogram--lg" /></Reveal>
        <p className="message__text">
          <span className="sr-only">{t.romanticMessage}</span>
          <span aria-hidden="true">
            {words.map((w, i) => (<Word key={`${w}-${i}`} progress={scrollYProgress} i={i} n={words.length} reduce={reduce}>{w}</Word>))}
          </span>
        </p>
        <Reveal delay={0.1}>
          <p className="message__sign">
            <span className="foil">{t.brideName}</span>
            <em>&amp;</em>
            <span className="foil">{t.groomName}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
