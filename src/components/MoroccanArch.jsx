import { motion, useReducedMotion } from 'framer-motion'
import { ARCH, SHAPES } from '../lib/arch'

const { W, H, cx, frameTop, bottom, floor } = ARCH

// Hairlines "draw" themselves; fills fade in behind them.
function Line({ d, ready, delay = 0, duration = 2.2, ...rest }) {
  const reduce = useReducedMotion()
  return (
    <motion.path
      d={d}
      fill="none"
      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
      animate={ready ? { pathLength: 1, opacity: 1 } : undefined}
      transition={{ duration, delay, ease: [0.65, 0, 0.35, 1] }}
      {...rest}
    />
  )
}

/**
 * The hero "palace door": zellige spandrels, a burgundy studded band, a gold
 * festooned fringe and a deep burgundy interior that the 3D rings float in.
 */
export default function MoroccanArch({ ready }) {
  const reduce = useReducedMotion()
  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0 },
    animate: ready ? { opacity: 1 } : undefined,
    transition: { duration: 1.4, delay, ease: 'easeOut' },
  })

  return (
    <svg className="arch__svg" viewBox={`0 0 ${W} ${H}`} role="presentation" aria-hidden="true">
      <defs>
        <pattern id="arch-zellige" width="60" height="60" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#A17B42" strokeWidth=".7" opacity=".55">
            <rect x="16" y="16" width="28" height="28" />
            <path d="M30 7 53 30 30 53 7 30Z" />
            <circle cx="30" cy="30" r="4.5" />
            <path d="M0 0 7 7M60 0 53 7M0 60 7 53M60 60 53 53" />
          </g>
        </pattern>
        <linearGradient id="arch-band" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8f0f2d" />
          <stop offset=".5" stopColor="#6e0c26" />
          <stop offset="1" stopColor="#4a1024" />
        </linearGradient>
        <radialGradient id="arch-interior" cx=".5" cy=".3" r=".85">
          <stop offset="0" stopColor="#7d1733" />
          <stop offset=".42" stopColor="#4a1024" />
          <stop offset="1" stopColor="#210511" />
        </radialGradient>
        <linearGradient id="arch-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E8D6A6" />
          <stop offset=".5" stopColor="#C6A15B" />
          <stop offset="1" stopColor="#A17B42" />
        </linearGradient>
      </defs>

      {/* Spandrel field with zellige lattice */}
      <motion.g {...fade(0.2)}>
        <path d={SHAPES.spandrel} fillRule="evenodd" fill="#EFE5D5" fillOpacity=".62" />
        <path d={SHAPES.spandrel} fillRule="evenodd" fill="url(#arch-zellige)" />
      </motion.g>

      {/* Rectangular frame (alfiz) */}
      <Line d={`M${frameTop} ${frameTop}H${W - frameTop}V${bottom}H${frameTop}Z`} ready={ready} duration={2.6} stroke="url(#arch-gold)" strokeWidth="1.6" />
      <Line d={`M${frameTop + 9} ${frameTop + 9}H${W - frameTop - 9}V${bottom - 9}H${frameTop + 9}Z`} ready={ready} delay={0.2} duration={2.6} stroke="#C6A15B" strokeWidth=".7" strokeOpacity=".7" />

      {/* Corner quarter-rosettes */}
      <motion.g {...fade(1.2)} fill="none" stroke="#A17B42" strokeWidth="1">
        {[[frameTop + 9, frameTop + 9, 1, 1], [W - frameTop - 9, frameTop + 9, -1, 1]].map(([x, y, sx, sy], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${sx} ${sy})`}>
            <path d="M0 46A46 46 0 0 0 46 0" />
            <path d="M0 32A32 32 0 0 0 32 0" strokeOpacity=".6" />
            <circle cx="12" cy="12" r="3" fill="#800020" stroke="none" />
          </g>
        ))}
      </motion.g>

      {/* Crown medallion above the arch */}
      <motion.g {...fade(1.6)} transform={`translate(${cx} ${(frameTop + SHAPES.apex) / 2 + 2})`}>
        <circle r="26" fill="#F8F3E9" stroke="#C6A15B" strokeWidth="1.2" />
        <circle r="21" fill="none" stroke="#C6A15B" strokeWidth=".6" strokeOpacity=".7" />
        <g stroke="#800020" strokeWidth="1.3" fill="none">
          <rect x="-11" y="-11" width="22" height="22" />
          <rect x="-11" y="-11" width="22" height="22" transform="rotate(45)" />
        </g>
        <circle r="3.4" fill="#800020" />
        <path d="M-70 0H-34M34 0H70" stroke="#C6A15B" strokeWidth="1" />
        <circle cx="-76" r="2.4" fill="#C6A15B" /><circle cx="76" r="2.4" fill="#C6A15B" />
      </motion.g>

      {/* Burgundy band */}
      <motion.path d={SHAPES.outer} fill="url(#arch-band)" initial={reduce ? false : { opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ duration: 1.6, delay: 0.5 }} />
      <Line d={SHAPES.outerLine} ready={ready} delay={0.3} stroke="url(#arch-gold)" strokeWidth="2.4" />
      <Line d={SHAPES.bead} ready={ready} delay={0.7} stroke="#E8D6A6" strokeWidth=".7" strokeOpacity=".65" />

      {/* Door studs */}
      <motion.g {...fade(1.9)} fill="#E8D6A6">
        {SHAPES.studs.map((p, i) => (<circle key={i} cx={p.x} cy={p.y} r="2.1" opacity={i % 2 ? 0.95 : 0.55} />))}
      </motion.g>

      {/* Interior: festooned fringe + deep burgundy */}
      <motion.path d={SHAPES.fringeFill} fill="url(#arch-interior)" initial={reduce ? false : { opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ duration: 1.8, delay: 0.9 }} />
      <Line d={SHAPES.innerLine} ready={ready} delay={1} stroke="#C6A15B" strokeWidth=".8" strokeOpacity=".8" />
      <Line d={SHAPES.fringeLine} ready={ready} delay={1.1} duration={2.8} stroke="url(#arch-gold)" strokeWidth="1.5" />

      {/* Threshold */}
      <motion.g {...fade(2)}>
        <rect x="80" y={floor} width="440" height={bottom - floor} fill="#35091a" />
        <path d={`M80 ${floor}H520`} stroke="#C6A15B" strokeWidth="1.2" />
        <path d={`M80 ${floor + 8}H520`} stroke="#C6A15B" strokeWidth=".5" strokeOpacity=".6" />
        {[-120, -60, 0, 60, 120].map((dx) => (
          <path key={dx} d={`M${cx + dx} ${floor + 12}l4 5-4 5-4-5z`} fill="#C6A15B" fillOpacity={dx === 0 ? 1 : 0.6} />
        ))}
      </motion.g>
    </svg>
  )
}

