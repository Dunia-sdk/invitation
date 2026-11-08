import { useT } from '../../context/LanguageContext'

/** Eight-pointed Moroccan star (khatam) drawn as two interlaced squares. */
export function Star8({ size = 28, filled = false, className, strokeWidth = 1 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="-16 -16 32 32" fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden="true">
      <rect x="-8" y="-8" width="16" height="16" />
      <rect x="-8" y="-8" width="16" height="16" transform="rotate(45)" />
      <circle r="2.4" fill={filled ? 'currentColor' : 'none'} />
    </svg>
  )
}

/** Hairline — star — hairline. Colour comes from the surrounding section. */
export function Divider({ className = '' }) {
  return (
    <div className={`divider ${className}`} aria-hidden="true">
      <span className="divider__line" />
      <Star8 size={22} />
      <span className="divider__line" />
    </div>
  )
}

/** Initial · star · initial. Follows the active language's script. */
export function Monogram({ className = '' }) {
  const t = useT()
  return (
    <span className={`monogram ${className}`} aria-hidden="true">
      <span>{t.brideName.charAt(0)}</span>
      <Star8 size={14} filled />
      <span>{t.groomName.charAt(0)}</span>
    </span>
  )
}

/** Pointed-arch skyline that sits on top of a section and rises into the previous one. */
export function ArchEdge() {
  return <span className="arch-edge" aria-hidden="true" />
}
