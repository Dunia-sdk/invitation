// ─── Moorish pointed-arch geometry ───────────────────────────────────────────
// Every contour of the hero door is a concentric offset of one master arch, so
// the bands, hairlines, studs and the festooned (lobed) fringe stay perfectly
// parallel at any scale. Coordinates live in a 600 × 900 viewBox.

export const ARCH = {
  W: 600, H: 900,
  cx: 300,
  A: 250,       // half-width of the outer arch
  e: 60,        // offset of the two arc centres → how pointed the arch is
  S: 420,       // springing line (where the straight jambs become the arch)
  frameTop: 24, // outer rectangular frame (alfiz)
  bottom: 876,
  floor: 846,   // top of the threshold inside the door
}
const R = ARCH.A + ARCH.e
const f = (n) => Math.round(n * 100) / 100

export function apexY(inset) {
  return ARCH.S - Math.sqrt((R - inset) ** 2 - ARCH.e ** 2)
}

/** Arch contour offset inwards by `inset`. Closed by default (filled shape). */
export function archPath(inset, { yStart = ARCH.bottom, close = true } = {}) {
  const { cx, A, S } = ARCH
  const a = A - inset
  const r = R - inset
  return (
    `M${f(cx - a)} ${yStart}V${S}` +
    `A${f(r)} ${f(r)} 0 0 1 ${cx} ${f(apexY(inset))}` +
    `A${f(r)} ${f(r)} 0 0 1 ${f(cx + a)} ${S}V${yStart}` +
    (close ? 'Z' : '')
  )
}

/** Evenly spaced points along an arch contour, bottom-left → over the top → bottom-right. */
export function outlinePoints(inset, spacing, yStart = ARCH.bottom) {
  const { cx, A, e, S } = ARCH
  const a = A - inset
  const r = R - inset
  const dy = Math.sqrt(r * r - e * e)
  const phiL2 = Math.atan2(-dy, -e) + Math.PI * 2
  const phiR1 = Math.atan2(-dy, e)
  const dense = []
  const step = 1.5

  for (let y = yStart; y > S; y -= step) dense.push([cx - a, y])
  const nL = Math.ceil((r * (phiL2 - Math.PI)) / step)
  for (let i = 0; i <= nL; i++) {
    const p = Math.PI + ((phiL2 - Math.PI) * i) / nL
    dense.push([cx + e + r * Math.cos(p), S + r * Math.sin(p)])
  }
  const nR = Math.ceil((r * (0 - phiR1)) / step)
  for (let i = 1; i <= nR; i++) {
    const p = phiR1 + ((0 - phiR1) * i) / nR
    dense.push([cx - e + r * Math.cos(p), S + r * Math.sin(p)])
  }
  for (let y = S + step; y <= yStart; y += step) dense.push([cx + a, y])

  // Re-sample at equal arc length so lobes/studs are evenly spaced.
  const cum = [0]
  for (let i = 1; i < dense.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]))
  }
  const total = cum[cum.length - 1]
  const n = Math.max(2, Math.round(total / spacing))
  const out = []
  let j = 1
  for (let k = 0; k <= n; k++) {
    const target = (total * k) / n
    while (j < cum.length - 1 && cum[j] < target) j++
    const t = (target - cum[j - 1]) / (cum[j] - cum[j - 1] || 1)
    out.push({
      x: dense[j - 1][0] + (dense[j][0] - dense[j - 1][0]) * t,
      y: dense[j - 1][1] + (dense[j][1] - dense[j - 1][1]) * t,
    })
  }
  return out
}

/** Festooned edge: a run of small outward-bulging arcs between consecutive points. */
export function scallopPath(points, { close = false, yClose = ARCH.floor } = {}) {
  let d = `M${f(points[0].x)} ${f(points[0].y)}`
  for (let i = 1; i < points.length; i++) {
    const p = points[i]
    const q = points[i - 1]
    const r = Math.hypot(p.x - q.x, p.y - q.y) * 0.56
    d += `A${f(r)} ${f(r)} 0 0 1 ${f(p.x)} ${f(p.y)}`
  }
  if (close) d += `L${f(points[points.length - 1].x)} ${yClose}L${f(points[0].x)} ${yClose}Z`
  return d
}

// ── Precomputed once at import time (pure maths, a few hundred bytes of path data) ──
export const SHAPES = (() => {
  const lobes = outlinePoints(30, 34, ARCH.floor)
  return {
    outer: archPath(0),
    outerLine: archPath(0, { close: false }),
    bead: archPath(6, { close: false }),
    innerLine: archPath(26, { close: false }),
    fringeFill: scallopPath(lobes, { close: true }),
    fringeLine: scallopPath(lobes),
    studs: outlinePoints(14, 30, ARCH.bottom - 14),
    // spandrel field = frame rectangle minus the arch opening (even-odd)
    spandrel: `M${ARCH.frameTop} ${ARCH.frameTop}H${ARCH.W - ARCH.frameTop}V${ARCH.bottom}H${ARCH.frameTop}Z` + archPath(0),
    apex: apexY(0),
    innerApex: apexY(30),
  }
})()
