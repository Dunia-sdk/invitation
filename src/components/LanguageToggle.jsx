import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle() {
  const { lang, setLang, t } = useLanguage()
  const isAr = lang === 'ar'
  return (
    <motion.button
      type="button"
      className="dock dock--lang"
      onClick={() => setLang(isAr ? 'fr' : 'ar')}
      aria-label={t.switchLang}
      title={t.switchLang}
      lang={isAr ? 'fr' : 'ar'}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 2.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.92 }}
    >
      {t.switchLangShort}
    </motion.button>
  )
}
