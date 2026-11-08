import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useT } from '../context/LanguageContext'
import { useMusic } from '../context/MusicContext'
import { PauseIcon, PlayIcon, VolumeIcon } from './ui/icons'

export default function MusicPlayer() {
  const t = useT()
  const { playing, toggle, volume, setVolume } = useMusic()
  const [showVolume, setShowVolume] = useState(false)

  return (
    <motion.div
      className="dock dock--music"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 2.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence initial={false}>
        {showVolume && (
          <motion.div className="dock__slider" initial={{ width: 0, opacity: 0 }} animate={{ width: 84, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <input type="range" min="0" max="1" step="0.05" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} aria-label={t.volume} />
          </motion.div>
        )}
      </AnimatePresence>
      <button type="button" className="dock__icon" onClick={() => setShowVolume((v) => !v)} aria-label={t.volume} aria-expanded={showVolume}>
        <VolumeIcon size={18} level={volume === 0 ? 0 : volume < 0.5 ? 1 : 2} />
      </button>
      <button type="button" className="dock__play" onClick={toggle} aria-label={playing ? t.musicPause : t.musicPlay} aria-pressed={playing}>
        {playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
      </button>
      <span className={`eq ${playing ? 'is-playing' : ''}`} aria-hidden="true"><i /><i /><i /><i /></span>
    </motion.div>
  )
}
