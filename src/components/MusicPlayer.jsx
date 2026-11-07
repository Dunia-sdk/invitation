import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faVolumeHigh, faVolumeLow, faVolumeXmark, faMusic } from '@fortawesome/free-solid-svg-icons'
import { CONFIG } from '../config'

export default function MusicPlayer() {
  const [playing, setPlaying]       = useState(false)
  const [volume, setVolume]         = useState(0.4)
  const [showVolume, setShowVolume] = useState(false)
  const [interacted, setInteracted] = useState(false)
  const audioRef = useRef(null)

  // After first user interaction anywhere on the page → try autoplay
  useEffect(() => {
    const handleFirst = () => {
      setInteracted(true)
      window.removeEventListener('click', handleFirst)
      window.removeEventListener('touchstart', handleFirst)
    }
    window.addEventListener('click', handleFirst, { passive: true })
    window.addEventListener('touchstart', handleFirst, { passive: true })
    return () => {
      window.removeEventListener('click', handleFirst)
      window.removeEventListener('touchstart', handleFirst)
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current || !interacted) return
    audioRef.current.volume = volume
    audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interacted])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setPlaying(true)
    }
  }

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  const volumeIcon = volume === 0 ? faVolumeXmark : volume < 0.5 ? faVolumeLow : faVolumeHigh

  return (
    <>
      <audio ref={audioRef} src={CONFIG.musicUrl} loop preload="auto" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9000 }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 10px', borderRadius: 40,
          background: 'rgba(69, 16, 31, 0.88)',
          border: '1px solid rgba(198,161,91,0.45)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(14px)',
        }}>

          {/* Volume slider (expandable) */}
          <AnimatePresence>
            {showVolume && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 72, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: 'hidden' }}
              >
                <input
                  type="range" min="0" max="1" step="0.05"
                  value={volume} onChange={handleVolume}
                  style={{
                    width: 68, accentColor: '#C6A15B',
                    cursor: 'pointer', display: 'block',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Volume icon button */}
          <button
            onClick={() => setShowVolume(v => !v)}
            aria-label="Volume"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px 5px', display: 'flex', alignItems: 'center',
              color: showVolume ? '#E8D5A0' : '#C6A15B',
              transition: 'color 0.2s',
            }}
          >
            <FontAwesomeIcon icon={volumeIcon} style={{ fontSize: '0.78rem' }} />
          </button>

          {/* Play / Pause button */}
          <motion.button
            onClick={toggle}
            aria-label={playing ? 'Pause music' : 'Play music'}
            style={{
              position: 'relative', width: 36, height: 36, borderRadius: '50%',
              border: 'none', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #a07c3a 0%, #C6A15B 30%, #E8D5A0 50%, #C6A15B 70%, #a07c3a 100%)',
              boxShadow: '0 3px 12px rgba(198,161,91,0.4), inset 0 1px rgba(255,255,255,0.3)',
              flexShrink: 0,
            }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon
              icon={playing ? faPause : faPlay}
              style={{ fontSize: '0.75rem', color: '#45101F', marginLeft: playing ? 0 : 1 }}
            />
            {/* Pulsing ring when playing */}
            {playing && (
              <motion.div
                style={{
                  position: 'absolute', inset: -3, borderRadius: '50%',
                  border: '1px solid rgba(198,161,91,0.5)',
                  pointerEvents: 'none',
                }}
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
          </motion.button>

          {/* Music note icon */}
          <div style={{ padding: '0 2px' }}>
            <FontAwesomeIcon
              icon={faMusic}
              style={{
                fontSize: '0.7rem', color: '#C6A15B',
                animation: playing ? 'pulseGold 1.8s ease-in-out infinite' : 'none',
              }}
            />
          </div>
        </div>
      </motion.div>
    </>
  )
}
