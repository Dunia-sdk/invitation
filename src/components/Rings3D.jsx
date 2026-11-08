import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// The 3D scene (three.js + R3F) is a separate chunk: the envelope and the rest of
// the page never wait for it, and a failure can never take the page down.
const RingsScene = lazy(() => import('./WeddingRings3D'))

class Boundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(err) { console.warn('[rings] 3D scene unavailable, using static fallback', err) }
  render() { return this.state.failed ? null : this.props.children }
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch { return false }
}

/** Static SVG rings: shown while the 3D chunk loads, and forever if WebGL is unavailable. */
function RingsFallback() {
  return (
    <svg className="rings__fallback" viewBox="0 0 400 240" aria-hidden="true">
      <defs>
        <linearGradient id="rf-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f6e6bd" /><stop offset=".5" stopColor="#d8b46c" /><stop offset="1" stopColor="#a17b42" /></linearGradient>
        <linearGradient id="rf-b" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9c98a" /><stop offset=".5" stopColor="#c8974a" /><stop offset="1" stopColor="#8d6730" /></linearGradient>
      </defs>
      <g fill="none" transform="rotate(-8 200 120)">
        <ellipse cx="160" cy="120" rx="82" ry="70" stroke="url(#rf-a)" strokeWidth="9" />
        <ellipse cx="240" cy="120" rx="82" ry="70" stroke="url(#rf-b)" strokeWidth="11" />
      </g>
    </svg>
  )
}

export default function Rings3D() {
  const reduce = useReducedMotion()
  const wrap = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })
  const [webgl] = useState(hasWebGL)
  const [inView, setInView] = useState(true)
  const [tabVisible, setTabVisible] = useState(true)
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])

  // Pause rendering when the hero is off-screen or the tab is hidden.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 })
    if (wrap.current) io.observe(wrap.current)
    const vis = () => setTabVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', vis)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', vis) }
  }, [])

  // Gentle pointer parallax (fine pointers only — no gyro, no scroll hijack).
  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reduce])

  return (
    <div ref={wrap} className={`rings ${ready ? 'is-ready' : ''}`} aria-hidden="true">
      <RingsFallback />
      {webgl && (
        <Boundary>
          <Suspense fallback={null}>
            <RingsScene active={inView && tabVisible} reduce={!!reduce} pointer={pointer} onReady={onReady} />
          </Suspense>
        </Boundary>
      )}
    </div>
  )
}
