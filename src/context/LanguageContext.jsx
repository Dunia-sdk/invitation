import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../i18n'

const LanguageContext = createContext({ lang: 'fr', setLang: () => {}, t: translations.fr })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr')

  // Keep <html lang/dir> and the tab title in sync — dir drives every logical CSS property.
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    root.setAttribute('lang', lang)
    document.title = translations[lang].pageTitle
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}

/** Shortcut: the translation table of the active language. */
export function useT() {
  return useContext(LanguageContext).t
}
