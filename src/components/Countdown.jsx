import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CONFIG } from '../config'
import { useT } from '../context/LanguageContext'
import { makeDust } from '../lib/dust'
import { ArchEdge } from './ui/Ornaments'
import Reveal from './ui/Reveal'
import { EASE } from '../lib/motion'

const DUST = makeDust(12, 3)
const pad = (n) => String(n).padStart(2, '0')

function getTimeLeft() {
  const diff = Math.max(0, CONFIG.weddingDate.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Unit({ value, label }) {
  return (
    <div className="unit">
      <div className="unit__box">
        <span className="unit__num" aria-hidden="true">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={value}
              initial={{ y: '45%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-45%', opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              {pad(value)}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
      <span className="unit__label">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const t = useT()
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  // Screen readers get one stable sentence that updates each minute, not a ticking clock.
  const spoken = `${time.days} ${t.days}, ${time.hours} ${t.hours}, ${time.minutes} ${t.minutes}`

  return (
    <section id="countdown" className="section section--night zellige countdown">
      <ArchEdge />
      <div className="dust-field" aria-hidden="true">
        {DUST.map((d, i) => (<i key={i} style={{ '--x': `${d.x}%`, '--s': `${d.size}px`, '--d': `${d.dur}s`, '--w': `${d.delay}s` }} />))}
      </div>
      <div className="container countdown__inner">
        <Reveal className="section-head">
          <p className="eyebrow">{t.grandDayApproaches}</p>
          <h2 className="h2">{t.countdown}</h2>
        </Reveal>

        <Reveal delay={0.15} className="countdown__grid" role="timer" aria-label={spoken}>
          <Unit value={time.days} label={t.days} />
          <i className="sep" aria-hidden="true" />
          <Unit value={time.hours} label={t.hours} />
          <i className="sep" aria-hidden="true" />
          <Unit value={time.minutes} label={t.minutes} />
          <i className="sep" aria-hidden="true" />
          <Unit value={time.seconds} label={t.seconds} />
        </Reveal>

        <Reveal delay={0.3}>
          <p className="countdown__date">{t.dateFootnote}</p>
        </Reveal>
      </div>
    </section>
  )
}
