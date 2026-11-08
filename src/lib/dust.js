/** Deterministic drifting-dust particles (no Math.random → stable across re-renders). */
export const makeDust = (n, seed = 0) =>
  Array.from({ length: n }, (_, i) => ({
    x: ((i + seed) * 37 + 11) % 100,
    size: 1.5 + ((i + seed) % 3) * 0.8,
    dur: 8 + ((i + seed) % 5) * 1.6,
    delay: -(((i + seed) * 1.3) % 9),
  }))
