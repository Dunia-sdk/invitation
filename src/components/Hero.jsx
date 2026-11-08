import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useT } from '../context/LanguageContext'
import MoroccanArch from './MoroccanArch'
import Rings3D from './Rings3D'
import { EASE } from '../lib/motion'
import { Star8 } from './ui/Ornaments'
import { makeDust } from '../lib/dust'

const DUST = makeDust(16)

const nameIn = (ready, delay) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(10px)' },
  animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
  transition: { duration: 1.5, delay, ease: EASE },
})

export default function Hero({ ready }) {
  const t = useT()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.965])
  const sideOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section id="invitation" ref={ref} className="hero" aria-labelledby="hero-names">
      <div className="hero__paper" aria-hidden="true" />

      <motion.p
        className="eyebrow hero__eyebrow"
        initial={{ opacity: 0, y: -8 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
      >
        {t.invitationLabel}
      </motion.p>

      {/* Desktop-only editorial side captions */}
      <motion.p className="hero__side hero__side--start" style={{ opacity: sideOpacity }} aria-hidden="true">
        <Star8 size={14} /> {t.invitationLabel}
      </motion.p>
      <motion.p className="hero__side hero__side--end" style={{ opacity: sideOpacity }} aria-hidden="true">
        {t.weddingDate} <Star8 size={14} />
      </motion.p>

      <motion.div className="hero__stage" style={{ y: stageY, scale: stageScale }}>
        <motion.div
          className="arch"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <MoroccanArch ready={ready} />
          <div className="arch__glow" aria-hidden="true" />
          <motion.div
            className="arch__rings"
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 2, delay: 1.4, ease: EASE }}
          >
            <Rings3D />
          </motion.div>
          <div className="arch__dust" aria-hidden="true">
            {DUST.map((d, i) => (
              <i key={i} style={{ '--x': `${d.x}%`, '--s': `${d.size}px`, '--d': `${d.dur}s`, '--w': `${d.delay}s` }} />
            ))}
          </div>

          <div className="arch__content">
            <h1 id="hero-names" className="arch__names" aria-label={`${t.brideName} & ${t.groomName}`}>
              <motion.span className="arch__name foil" {...nameIn(ready, 2.1)}>{t.brideName}</motion.span>
              <motion.span className="arch__amp" {...nameIn(ready, 2.4)} aria-hidden="true">&amp;</motion.span>
              <motion.span className="arch__name foil" {...nameIn(ready, 2.7)}>{t.groomName}</motion.span>
            </h1>
            <motion.p className="arch__tag" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ duration: 1.6, delay: 3.1 }}>
              {t.gettingMarried}
            </motion.p>
            <motion.p className="arch__date" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ duration: 1.6, delay: 3.3 }}>
              {t.dateDisplay}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#message"
        className="hero__cue"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 1.4, delay: 3.8 }}
      >
        <span>{t.scrollHint}</span>
        <i aria-hidden="true" />
      </motion.a>
    </section>
  )
}
