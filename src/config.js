// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Edit all configurable values here without touching component code.

import bgMusic from './assets/background-instru.mp3'

export const CONFIG = {
  // Couple info
  bride: 'Kaoutar',
  groom: 'Abdelsamad',
  weddingDate: new Date('2027-01-26T20:00:00'),

  // Venue
  venueName: 'Salle de fête Ryan',
  venueAddress: '', // Fill in full address when known
  // Replace with real Google Maps URL when venue address is confirmed:
  googleMapsUrl: 'https://maps.google.com/?q=Salle+de+fete+Ryan',

  // RSVP – WhatsApp
  whatsappNumber: '+212614063897', // Replace with bride/groom number (with country code)

  // RSVP – Email
  rsvpEmail: 'kawtarkassri7@gmail.com',

  // Music – imported from src/assets (bundled by Vite)
  musicUrl: bgMusic,

  // Event time
  ceremonyTime: '20:00',
}
