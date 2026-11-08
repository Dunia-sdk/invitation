import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Geometry ────────────────────────────────────────────────────────────────
// A wedding band is a lathe of a rounded cross-section: flat comfort-fit inside,
// softly domed outside. Built from a super-ellipse so the edges stay crisp.
function bandGeometry(inner, thickness, width) {
  const cx = inner + thickness / 2
  const a = thickness / 2
  const b = width / 2
  const pts = []
  const steps = 96
  for (let i = 0; i <= steps; i++) {
    const th = (i / steps) * Math.PI * 2
    const c = Math.cos(th)
    const s = Math.sin(th)
    const n = c >= 0 ? 2.5 : 6 // outside: dome · inside: flat
    const p = 2 / n
    pts.push(new THREE.Vector2(cx + a * Math.sign(c) * Math.abs(c) ** p, b * Math.sign(s) * Math.abs(s) ** p))
  }
  return new THREE.LatheGeometry(pts, 240)
}

// Brilliant-cut stone: table, crown, girdle, pavilion — flat shaded for facets.
function gemGeometry() {
  const pts = [[0, -0.95], [1, -0.06], [1, 0], [0.9, 0.14], [0.45, 0.5], [0, 0.5]].map(([x, y]) => new THREE.Vector2(x, y))
  return new THREE.LatheGeometry(pts, 16)
}

// ─── Procedural studio lighting (no network, no HDR file) ────────────────────
function Studio({ onReady }) {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = new THREE.Scene()
    env.add(new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), new THREE.MeshBasicMaterial({ color: 0x14050c, side: THREE.BackSide })))
    const panel = (w, h, pos, color, k) => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(k), side: THREE.DoubleSide, toneMapped: false }),
      )
      m.position.set(...pos)
      m.lookAt(0, 0, 0)
      env.add(m)
    }
    panel(12, 4, [0, 9, 3], '#fff3da', 7) // overhead softbox
    panel(3, 10, [-9, 1, 4], '#ffe0ac', 4.5) // warm left strip
    panel(3, 10, [9, 1, 4], '#ffffff', 4) // cool right strip
    panel(10, 2.5, [0, -8, 4], '#b01c40', 2.4) // burgundy bounce from below
    panel(8, 8, [0, 1, -10], '#ffd59a', 2) // warm back wash
    const rt = pmrem.fromScene(env, 0.02)
    scene.environment = rt.texture
    invalidate()
    // wait two frames so the first painted frame is already fully lit
    const id = requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()))
    return () => {
      cancelAnimationFrame(id)
      scene.environment = null
      rt.dispose()
      pmrem.dispose()
      env.traverse((o) => { o.geometry?.dispose(); o.material?.dispose() })
    }
  }, [gl, scene, invalidate, onReady])
  return null
}

// ─── The rings ───────────────────────────────────────────────────────────────
const TILT = 0.42 // ± tilt about the X axis is what physically links the two bands

function Rings({ reduce, pointer }) {
  const group = useRef()
  const intro = useRef(0)

  const { bride, groom, gem, goldA, goldB, stone } = useMemo(
    () => ({
      bride: bandGeometry(0.74, 0.07, 0.2),
      groom: bandGeometry(0.76, 0.085, 0.3),
      gem: gemGeometry(),
      goldA: new THREE.MeshStandardMaterial({ color: '#efd9a5', metalness: 1, roughness: 0.17, envMapIntensity: 1.35 }),
      goldB: new THREE.MeshStandardMaterial({ color: '#d9ab5f', metalness: 1, roughness: 0.2, envMapIntensity: 1.3 }),
      stone: new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0.05, roughness: 0.02, envMapIntensity: 3.2, flatShading: true }),
    }),
    [],
  )
  useEffect(() => () => [bride, groom, gem, goldA, goldB, stone].forEach((o) => o.dispose()), [bride, groom, gem, goldA, goldB, stone])

  useFrame(({ clock }, dt) => {
    const g = group.current
    if (!g || reduce) return
    const t = clock.elapsedTime
    intro.current = THREE.MathUtils.damp(intro.current, 1, 1.1, dt)
    const k = 1 - intro.current
    const px = pointer.current.x
    const py = pointer.current.y
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.3 + Math.sin(t * 0.42) * 0.32 + px * 0.28 + k * 0.9, 3, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.5 + Math.sin(t * 0.31) * 0.05 - py * 0.16, 3, dt)
    g.position.y = Math.sin(t * 0.8) * 0.045
    g.scale.setScalar(1.0 + 0.12 * intro.current)
  })

  return (
    <group ref={group} rotation={[0.5, -0.3, 0.1]} scale={reduce ? 1.12 : 1}>
      {/* Bride — slim champagne band with a single brilliant */}
      <group position={[-0.42, 0, 0]} rotation={[Math.PI / 2 + TILT, 0, 0]}>
        <mesh geometry={bride} material={goldA} />
        <mesh geometry={gem} material={stone} position={[0, 0, -0.835]} rotation={[-Math.PI / 2, 0, 0]} scale={0.082} />
      </group>
      {/* Groom — wider, warmer band */}
      <group position={[0.42, 0, 0]} rotation={[Math.PI / 2 - TILT, 0, 0]}>
        <mesh geometry={groom} material={goldB} />
      </group>
    </group>
  )
}

export default function RingsScene({ active, reduce, pointer, onReady }) {
  return (
    <Canvas
      className="rings__canvas"
      frameloop={reduce ? 'demand' : active ? 'always' : 'never'}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.5], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
        gl.toneMappingExposure = 1.05
      }}
    >
      <Studio onReady={onReady} />
      <directionalLight position={[2.5, 3, 4]} intensity={1.1} color="#fff1d6" />
      <Rings reduce={reduce} pointer={pointer} />
    </Canvas>
  )
}
