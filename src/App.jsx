import { useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { LanguageProvider } from './context/LanguageContext'
import { MusicProvider } from './context/MusicContext'
import EnvelopeOpening from './components/EnvelopeOpening'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import InvitationMessage from './components/InvitationMessage'
import WeddingDetails from './components/WeddingDetails'
import Countdown from './components/Countdown'
import WeddingTimeline from './components/WeddingTimeline'
import RSVPForm from './components/RSVPForm'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'
import LanguageToggle from './components/LanguageToggle'

function AppInner() {
  const [opened, setOpened] = useState(false)

  return (
    <>
      {/* Sealed envelope — fixed overlay above everything until opened */}
      <AnimatePresence>
        {!opened && <EnvelopeOpening key="envelope" onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      {/* The invitation renders underneath from the start (so the 3D scene can warm up);
          `inert` keeps it out of the tab order until the envelope is opened. */}
      <div inert={!opened}>
        <Navigation />
        <main>
          <Hero ready={opened} />
          <InvitationMessage />
          <WeddingDetails />
          <Countdown />
          <WeddingTimeline />
          <RSVPForm />
        </main>
        <Footer />
      </div>

      {opened && (
        <>
          <MusicPlayer />
          <LanguageToggle />
        </>
      )}
    </>
  )
}

export default function App() {
  return (
    // reducedMotion="user": visitors with the OS setting get no transform/travel animations.
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <MusicProvider>
          <AppInner />
        </MusicProvider>
      </LanguageProvider>
    </MotionConfig>
  )
}
