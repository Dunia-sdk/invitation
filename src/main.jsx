import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted fonts (latin + arabic subsets only) — no third-party request, works offline
import '@fontsource/pinyon-script/latin-400.css'
import '@fontsource/cormorant-garamond/latin-400.css'
import '@fontsource/cormorant-garamond/latin-400-italic.css'
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/latin-600.css'
import '@fontsource/jost/latin-300.css'
import '@fontsource/jost/latin-400.css'
import '@fontsource/jost/latin-500.css'
import '@fontsource/amiri/arabic-400.css'
import '@fontsource/amiri/arabic-700.css'
import '@fontsource/amiri/latin-400.css'
import '@fontsource/aref-ruqaa/arabic-400.css'
import '@fontsource/aref-ruqaa/arabic-700.css'

import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
