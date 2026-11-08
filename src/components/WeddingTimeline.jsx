import { motion } from 'framer-motion'
import { CONFIG } from '../config'
import { useT } from '../context/LanguageContext'
import { ArchEdge, Divider, Star8 } from './ui/Ornaments'
import Reveal from './ui/Reveal'
import { EASE } from '../lib/motion'

function Event({ event }) {
  return (
    <li className="event">
      <motion.span
        className="event__line"
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <Reveal className="event__node" aria-hidden="true"><Star8 size={30} /></Reveal>
      <Reveal delay={0.1} className="event__time">{event.time}</Reveal>
      <Reveal delay={0.2} className="event__body">
        <h3>{event.title}</h3>
        <p>{event.description}</p>
      </Reveal>
    </li>
  )
}

export default function WeddingTimeline() {
  const t = useT()
  // Programme content is unchanged: one event, time taken from CONFIG so it can't drift.
  const events = [{ time: CONFIG.ceremonyTime, title: t.eventTitle, description: t.eventDescription }]

  return (
    <section id="programme" className="section section--cream timeline">
      <ArchEdge />
      <div className="container container--narrow">
        <Reveal className="section-head">
          <p className="eyebrow">{t.programme}</p>
          <h2 className="h2">{t.ourSpecialDay}</h2>
        </Reveal>

        <ol className="timeline__list">
          {events.map((e) => (<Event key={e.time + e.title} event={e} />))}
        </ol>

        <Reveal delay={0.2} className="timeline__note">
          <p>{t.programmeNote}</p>
          <Divider />
        </Reveal>
      </div>
    </section>
  )
}
