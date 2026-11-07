import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LanguageProvider } from './context/LanguageContext'
import EnvelopeOpening from './components/EnvelopeOpening'
import WeddingInvitation from './components/WeddingInvitation'
import WeddingDetails from './components/WeddingDetails'
import Countdown from './components/Countdown'
import WeddingTimeline from './components/WeddingTimeline'
import RSVPForm from './components/RSVPForm'
import MusicPlayer from './components/MusicPlayer'
import LanguageToggle from './components/LanguageToggle'
import Footer from './components/Footer'

function AppInner() {
  const [opened, setOpened] = useState(false)

  return (
    <>
      {/* Envelope — fixed overlay, always on top during intro */}
      <AnimatePresence>
        {!opened && (
          <EnvelopeOpening key="envelope" onOpen={() => setOpened(true)} />
        )}
      </AnimatePresence>

      {/* Main invitation — always in DOM but hidden until opened */}
      <div
        style={{
          visibility: opened ? 'visible' : 'hidden',
          opacity: opened ? 1 : 0,
          transition: 'opacity 1.2s ease',
          minHeight: '100vh',
          background: '#F8F2E8',
        }}
      >
        <WeddingInvitation />
        <WeddingDetails />
        <Countdown />
        <WeddingTimeline />
        <RSVPForm />
        <Footer />
      </div>

      {/* Floating controls — appear after envelope opens */}
      {opened && <MusicPlayer />}
      {opened && <LanguageToggle />}
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  )
}
