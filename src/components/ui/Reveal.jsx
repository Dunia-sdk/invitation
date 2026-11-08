import { motion } from 'framer-motion'
import { EASE } from '../../lib/motion'

/**
 * Scroll-triggered entrance. One shared recipe keeps every section's motion
 * consistent: a soft rise + fade, once, slightly before the element is centred.
 * (<MotionConfig reducedMotion="user"> at the app root removes the travel for
 * visitors who prefer reduced motion.)
 */
export default function Reveal({ as = 'div', delay = 0, y = 26, duration = 1.05, className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
