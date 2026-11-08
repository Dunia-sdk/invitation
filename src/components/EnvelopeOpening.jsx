import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useMusic } from '../context/MusicContext'
import { EASE } from '../lib/motion'
import { Star8 } from './ui/Ornaments'
import { makeDust } from '../lib/dust'

const DUST = makeDust(14, 5)

// ─── Wax seal ────────────────────────────────────────────────────────────────
function WaxSeal({ initials, breaking }) {
  return (
    <motion.div
      className="env__seal-art"
      animate={breaking ? { scale: [1, 1.1, 0.8, 0], rotate: [0, -6, 10, 20], opacity: [1, 0.9, 0.5, 0] } : undefined}
      transition={{ duration: 0.65, ease: 'easeIn' }}
    >
      <svg viewBox="0 0 130 130" aria-hidden="true">
        <defs>
          <radialGradient id="wax-g" cx=".35" cy=".3" r=".65">
            <stop offset="0" stopColor="#a3213f" /><stop offset=".4" stopColor="#7a1530" /><stop offset=".75" stopColor="#560e22" /><stop offset="1" stopColor="#35091a" />
          </radialGradient>
          <radialGradient id="wax-shine" cx=".28" cy=".22" r=".45">
            <stop offset="0" stopColor="rgba(235,140,150,.45)" /><stop offset="1" stopColor="rgba(235,140,150,0)" />
          </radialGradient>
          <linearGradient id="wax-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a17b42" /><stop offset=".35" stopColor="#d9bd7e" /><stop offset=".6" stopColor="#f3e8c9" /><stop offset="1" stopColor="#a17b42" />
          </linearGradient>
          <filter id="wax-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#1a0309" floodOpacity=".55" /></filter>
        </defs>
        <path
          d="M65 5C77 4 89 8 98 15c10 7 18 18 24 30 6 12 7 25 4 37-3 12-10 23-20 31-10 8-23 13-36 14-13 1-26-2-36-9-10-7-18-18-23-31-5-13-6-27-2-40 4-13 13-24 25-32 10-8 19-9 31-10Z"
          fill="url(#wax-g)" filter="url(#wax-shadow)"
        />
        <path d="M65 5C77 4 89 8 98 15c10 7 18 18 24 30 6 12 7 25 4 37-3 12-10 23-20 31-10 8-23 13-36 14-13 1-26-2-36-9-10-7-18-18-23-31-5-13-6-27-2-40 4-13 13-24 25-32 10-8 19-9 31-10Z" fill="url(#wax-shine)" />
        <circle cx="65" cy="65" r="43" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="1.4" />
        <circle cx="65" cy="65" r="38" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="1" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 15 * Math.PI) / 180
          return <circle key={i} cx={65 + 41 * Math.cos(a)} cy={65 + 41 * Math.sin(a)} r="1.2" fill="rgba(255,255,255,.12)" />
        })}
        <text x="65" y="78" textAnchor="middle" fontFamily="var(--font-script)" fontSize="38" fill="url(#wax-gold)" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.55))' }}>
          {initials}
        </text>
      </svg>
      {breaking && (
        <motion.svg viewBox="0 0 130 130" className="env__crack" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.65 }} aria-hidden="true">
          <path d="M65 65 42 28M65 65 92 22M65 65 112 58M65 65 78 102M65 65 38 95" stroke="rgba(248,243,233,.75)" strokeWidth="1.2" strokeLinecap="round" />
        </motion.svg>
      )}
    </motion.div>
  )
}

// ─── Envelope ────────────────────────────────────────────────────────────────
export default function EnvelopeOpening({ onOpen }) {
  const { lang, setLang, t } = useLanguage()
  const music = useMusic()
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState('idle') // idle → breaking → opening → card → (onOpen)
  const [flapBehind, setFlapBehind] = useState(false)
  const timers = useRef([])

  // Lock page scroll while the invitation is sealed.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))

  const open = () => {
    if (phase !== 'idle') return
    music?.play() // a real user gesture → the soundtrack is allowed to start
    if (reduce) { setPhase('card'); later(onOpen, 500); return }
    setPhase('breaking')
    later(() => setPhase('opening'), 650)
    later(() => setFlapBehind(true), 650 + 480) // after the flap passes edge-on, drop it behind the card
    later(() => setPhase('card'), 1650)
    later(onOpen, 3350)
  }

  const isOpen = phase === 'opening' || phase === 'card'
  const initials = `${t.brideName.charAt(0)} ${lang === 'ar' ? '·' : '&'} ${t.groomName.charAt(0)}`

  return (
    <motion.div
      className="env"
      role="dialog"
      aria-modal="true"
      aria-label={t.cordiallyInvited}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.14, transition: { duration: reduce ? 0.3 : 1.15, ease: [0.65, 0, 0.35, 1] } }}
    >
      <div className="env__bg zellige" aria-hidden="true" />
      <div className="env__vignette" aria-hidden="true" />
      <div className="dust-field" aria-hidden="true">
        {DUST.map((d, i) => (<i key={i} style={{ '--x': `${d.x}%`, '--s': `${d.size}px`, '--d': `${d.dur}s`, '--w': `${d.delay}s` }} />))}
      </div>

      <div className="env__lang" role="group" aria-label="Language / اللغة">
        <button type="button" aria-pressed={lang === 'fr'} onClick={() => setLang('fr')}>FR</button>
        <span aria-hidden="true" />
        <button type="button" lang="ar" aria-pressed={lang === 'ar'} onClick={() => setLang('ar')}>العربية</button>
      </div>

      <div className="env__inner">
        <motion.p
          className="eyebrow env__kicker"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase === 'card' ? 0 : 1, y: 0 }}
          transition={{ duration: 0.9, delay: phase === 'idle' ? 0.5 : 0 }}
        >
          {t.cordiallyInvited}
        </motion.p>

        <motion.div
          className="env__shadow"
          initial={{ opacity: 0, y: 46, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.7, ease: EASE }}
        >
          <div className={`env__envelope ${flapBehind ? 'is-behind' : ''}`}>
            <div className="env__back" />

            {/* Invitation card that slides out */}
            <motion.div
              className="env__card"
              initial={false}
              animate={{ y: phase === 'card' ? '-72%' : '4%' }}
              transition={{ duration: reduce ? 0.4 : 1.5, ease: EASE }}
            >
              <div className="env__card-frame">
                <Star8 size={22} />
                <span className="env__card-name foil">{t.brideName}</span>
                <span className="env__card-amp">&amp;</span>
                <span className="env__card-name foil">{t.groomName}</span>
                <span className="env__card-date">{t.weddingDate}</span>
              </div>
            </motion.div>

            {/* Pocket (front of the envelope) */}
            <svg className="env__front" viewBox="0 0 700 500" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="pk-l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#e9dcc3" /><stop offset="1" stopColor="#f1e7d2" /></linearGradient>
                <linearGradient id="pk-r" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stopColor="#e9dcc3" /><stop offset="1" stopColor="#f1e7d2" /></linearGradient>
                <linearGradient id="pk-b" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#f6eedc" /><stop offset="1" stopColor="#ecdfc6" /></linearGradient>
              </defs>
              <path d="M0 0 350 262 0 500Z" fill="url(#pk-l)" />
              <path d="M700 0 350 262 700 500Z" fill="url(#pk-r)" />
              <path d="M0 500 350 262 700 500Z" fill="url(#pk-b)" />
              <path d="M0 0 350 262 700 0" fill="none" stroke="#C6A15B" strokeOpacity=".75" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              <path d="M0 500 350 262 700 500" fill="none" stroke="rgba(120,85,40,.28)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>

            {/* Flap — burgundy-lined, flips up and back */}
            <motion.div
              className="env__flap"
              initial={false}
              animate={{ rotateX: isOpen ? 180 : 0 }}
              transition={{ duration: reduce ? 0.01 : 0.95, ease: [0.4, 0, 0.2, 1] }}
            >
              <svg className="env__flap-face env__flap-face--out" viewBox="0 0 700 262" preserveAspectRatio="none" aria-hidden="true">
                <defs><linearGradient id="fl-o" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f6eedc" /><stop offset="1" stopColor="#e8dcc2" /></linearGradient></defs>
                <path d="M0 0H700L350 262Z" fill="url(#fl-o)" />
                <path d="M0 0 350 262 700 0" fill="none" stroke="#C6A15B" strokeOpacity=".85" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
              </svg>
              <svg className="env__flap-face env__flap-face--in" viewBox="0 0 700 262" preserveAspectRatio="none" aria-hidden="true">
                <defs><linearGradient id="fl-i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a1024" /><stop offset="1" stopColor="#800020" /></linearGradient></defs>
                <path d="M0 0H700L350 262Z" fill="url(#fl-i)" />
                <path d="M0 0 350 262 700 0" fill="none" stroke="#C6A15B" strokeOpacity=".7" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              </svg>
            </motion.div>

            {phase === 'idle' || phase === 'breaking' ? (
              <div className="env__seal" onClick={open} aria-hidden="true">
                <WaxSeal initials={initials} breaking={phase === 'breaking'} />
              </div>
            ) : null}
          </div>
        </motion.div>

        <motion.div
          className="env__cta"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: phase === 'idle' ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, delay: phase === 'idle' ? 1.6 : 0 }}
          style={{ pointerEvents: phase === 'idle' ? 'auto' : 'none' }}
        >
          <button type="button" className="btn" onClick={open} disabled={phase !== 'idle'}>
            <Star8 size={14} /> {t.openInvitation} <Star8 size={14} />
          </button>
          <p className="env__date">{t.weddingDate}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
