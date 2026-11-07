// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Edit all configurable values here without touching component code.

import bgMusic from './assets/background-instru.mp3'

export const CONFIG = {
  // Couple info
  bride: 'Kaoutar',
  groom: 'Abdsamad',
  weddingDate: new Date('2027-01-26T20:00:00'),

  // Venue
  venueName: 'Salle de fête Ryan',
  venueAddress: '', // Fill in full address when known
  // Replace with real Google Maps URL when venue address is confirmed:
  googleMapsUrl: 'https://www.google.com/maps/place/Salle+de+F%C3%AAte+Rayane/@33.6000229,-7.5445875,17z/data=!3m1!4b1!4m6!3m5!1s0xda7cc929ddf426f:0x250f8014472f4ed9!8m2!3d33.6000229!4d-7.5445875!16s%2Fg%2F11b7rnbj08?entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D',

  // RSVP – WhatsApp
  whatsappNumber: '+212614063897', // Replace with bride/groom number (with country code)

  // RSVP – Email
  rsvpEmail: 'kawtarkassri7@gmail.com',

  // Music – imported from src/assets (bundled by Vite)
  musicUrl: bgMusic,

  // Event time
  ceremonyTime: '20:00',
}
