import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useT } from '../context/LanguageContext'
import { Monogram } from './ui/Ornaments'

const SECTIONS = ['details', 'countdown', 'programme', 'rsvp']

export default function Navigation() {
  const t = useT()
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const [on, setOn] = useState(false)
  const [active, setActive] = useState('')

  useMotionValueEvent(scrollY, 'change', (y) => setOn(y > window.innerHeight * 0.75))

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  const links = [
    ['details', t.navDetails],
    ['countdown', t.countdown],
    ['programme', t.programme],
  ]

  return (
    <header className={`nav ${on ? 'is-on' : ''}`}>
      <a href="#invitation" className="nav__brand" aria-label={`${t.brideName} & ${t.groomName}`}><Monogram /></a>
      <nav className="nav__links" aria-label={t.navLabel}>
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined}>{label}</a>
        ))}
      </nav>
      <a href="#rsvp" className="nav__cta" aria-current={active === 'rsvp' ? 'true' : undefined}>{t.rsvpLabel}</a>
      <motion.i className="nav__progress" style={{ scaleX: progress }} aria-hidden="true" />
    </header>
  )
}
