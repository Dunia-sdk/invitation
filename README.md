# Kaoutar & Abdsamad — Wedding Invitation (2027 redesign)

React 19 · Vite · Framer Motion · React Three Fiber (lazy-loaded) · Tailwind v4 (preflight + tokens only)

```bash
npm install
npm run dev      # development
npm run build    # production build → dist/
npm run preview  # serve the production build
npm run lint
```

## Where to edit things
| What | File |
|---|---|
| Names, date (with timezone), venue, Maps link, WhatsApp, email, music | `src/config.js` |
| All FR / AR text (and Arabic names) | `src/i18n.js` |
| Colour, type, spacing tokens | top of `src/index.css` (`:root`) |
| Hero door geometry (arch, lobes, studs) | `src/lib/arch.js` |
| 3D rings (geometry, metals, lighting) | `src/components/WeddingRings3D.jsx` |

## Architecture
- `components/Hero.jsx` + `MoroccanArch.jsx` — the palace-door hero; `Rings3D.jsx` lazy-loads the WebGL scene
  (`WeddingRings3D.jsx`, own chunk) behind an error boundary, with a static SVG fallback.
- `EnvelopeOpening.jsx` — sealed-envelope intro. Its click starts the music (a real user gesture).
- Sections: `InvitationMessage`, `WeddingDetails`, `Countdown`, `WeddingTimeline`, `RSVPForm`, `Footer`.
- `context/LanguageContext.jsx` — FR/AR, sets `<html lang dir>`; all CSS uses logical properties so RTL is automatic.
- `context/MusicContext.jsx` — owns the `<audio>` element.
- Fonts are self-hosted via `@fontsource` (Latin + Arabic subsets only) — no third-party requests at runtime.

## Notes
- Lighting for the rings is generated procedurally; nothing is fetched from a CDN.
- `prefers-reduced-motion` is honoured globally (`MotionConfig`), in CSS, and by the 3D scene (static pose, no render loop).
- Arabic is never letter-spaced (it breaks letter joining) — see `:lang(ar)` rules in `index.css`.
