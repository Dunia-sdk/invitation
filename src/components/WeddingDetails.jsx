import { CONFIG } from '../config'
import { useLanguage } from '../context/LanguageContext'
import { ArchEdge } from './ui/Ornaments'
import { ArrowIcon, CalendarIcon, ClockIcon, PinIcon } from './ui/icons'
import Reveal from './ui/Reveal'

// A pointed-arch niche. The path is stretched to the card; vector-effect keeps the gold line a constant hairline.
function NicheFrame() {
  return (
    <svg className="niche__frame" viewBox="0 0 100 140" preserveAspectRatio="none" aria-hidden="true">
      <path d="M1 140V52Q1 26 50 1Q99 26 99 52V140Z" className="niche__fill" />
      <path d="M1 140V52Q1 26 50 1Q99 26 99 52V140" className="niche__line" vectorEffect="non-scaling-stroke" />
      <path d="M8 140V54Q8 32 50 11Q92 32 92 54V140" className="niche__line niche__line--inner" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export default function WeddingDetails() {
  const { lang, t } = useLanguage()
  const items = [
    { Icon: CalendarIcon, label: t.dateLabel, value: t.dateValue },
    { Icon: ClockIcon, label: t.timeLabel, value: t.timeValue },
    { Icon: PinIcon, label: t.venueLabel, value: CONFIG.venueName },
  ]

  return (
    <section id="details" className="section section--ivory zellige details">
      <ArchEdge />
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="niche-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6a1228" /><stop offset=".55" stopColor="#4a1024" /><stop offset="1" stopColor="#35091a" />
          </linearGradient>
        </defs>
      </svg>
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{t.joinUs}</p>
          <h2 className="h2">{t.ceremonyDetails}</h2>
        </Reveal>

        <div className="niches">
          {items.map(({ Icon, label, value }, i) => (
            <Reveal key={label} delay={i * 0.14} className="niche">
              <NicheFrame />
              <div className="niche__body">
                <Icon size={34} />
                <p className="niche__label">{label}</p>
                <span className="niche__rule" aria-hidden="true" />
                <p className="niche__value">{value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="details__cta">
          <a className="btn btn--burgundy" href={CONFIG.googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <PinIcon size={18} />
            <span>{t.viewOnMaps}</span>
            <ArrowIcon size={18} flip={lang === 'ar'} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
