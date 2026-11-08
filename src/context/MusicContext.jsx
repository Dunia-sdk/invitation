import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { CONFIG } from '../config'

const MusicContext = createContext(null)

/**
 * Owns the <audio> element so the envelope's "open" click (a real user gesture)
 * can start the soundtrack — browsers block autoplay otherwise.
 */
export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.4)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const play = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (audioRef.current?.paused) play()
    else pause()
  }, [play, pause])

  const value = useMemo(
    () => ({ playing, volume, play, pause, toggle, setVolume: setVolumeState }),
    [playing, volume, play, pause, toggle],
  )

  return (
    <MusicContext.Provider value={value}>
      <audio ref={audioRef} src={CONFIG.musicUrl} loop preload="none" />
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  return useContext(MusicContext)
}
