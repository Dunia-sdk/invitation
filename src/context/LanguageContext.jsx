import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext({ lang: 'fr', setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr')

  // Apply dir attribute to <html> for RTL support
  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook for components
export function useLanguage() {
  return useContext(LanguageContext)
}

