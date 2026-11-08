// Fine-line icon set (1.25px stroke, currentColor). Replaces the Font Awesome bundle.
const base = {
  width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.25, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
}
const Svg = ({ size = 24, children, ...rest }) => (
  <svg {...base} width={size} height={size} {...rest}>{children}</svg>
)

export const CalendarIcon = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
    <path d="M12 12.6l1.1 1.9 2.2.3-1.6 1.5.4 2.2-2.1-1-2.1 1 .4-2.2-1.6-1.5 2.2-.3z" strokeWidth="1" />
  </Svg>
)
export const ClockIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 6.8V12l3.4 2" />
    <path d="M12 3.5v1M12 19.5v1M3.5 12h1M19.5 12h1" strokeWidth="1" />
  </Svg>
)
export const PinIcon = (p) => (
  <Svg {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.4" />
  </Svg>
)
export const ArrowIcon = ({ flip, ...p }) => (
  <Svg {...p} style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
    <path d="M4 12h15M14 7l5 5-5 5" />
  </Svg>
)
export const PlayIcon = (p) => (<Svg {...p}><path d="M8 5.5v13l10-6.5z" fill="currentColor" strokeWidth="0" /></Svg>)
export const PauseIcon = (p) => (<Svg {...p}><path d="M8 5.5v13M16 5.5v13" strokeWidth="2.2" /></Svg>)
export const NoteIcon = (p) => (
  <Svg {...p}>
    <path d="M9 17.5V6l10-2v11.5" />
    <circle cx="6.8" cy="17.5" r="2.4" /><circle cx="16.8" cy="15.5" r="2.4" />
  </Svg>
)
export const VolumeIcon = ({ level = 2, ...p }) => (
  <Svg {...p}>
    <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" />
    {level === 0 ? <path d="M16 9.5l5 5M21 9.5l-5 5" /> : null}
    {level >= 1 ? <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5" /> : null}
    {level >= 2 ? <path d="M18 7a7 7 0 0 1 0 10" /> : null}
  </Svg>
)
export const CopyIcon = (p) => (
  <Svg {...p}><rect x="8.5" y="8.5" width="12" height="12" rx="1.5" /><path d="M15.5 8.5V5A1.5 1.5 0 0 0 14 3.5H5A1.5 1.5 0 0 0 3.5 5v9A1.5 1.5 0 0 0 5 15.5h3.5" /></Svg>
)
export const CheckIcon = (p) => (<Svg {...p}><path d="M4.5 12.5l5 5 10-11" strokeWidth="1.6" /></Svg>)
export const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41" />
  </svg>
)
