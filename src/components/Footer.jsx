import { useT } from '../context/LanguageContext'
import { ArchEdge, Divider, Star8 } from './ui/Ornaments'
import Reveal from './ui/Reveal'

export default function Footer() {
  const t = useT()
  return (
    <footer id="footer" className="section section--night zellige footer">
      <ArchEdge />
      <div className="container footer__inner">
        <Reveal className="footer__star"><Star8 size={46} strokeWidth={0.8} /></Reveal>
        <Reveal delay={0.1}><p className="footer__message">{t.closingMessage}</p></Reveal>
        <Reveal delay={0.2}>
          <p className="footer__love">{t.withLove}</p>
          <p className="footer__names foil" aria-label={`${t.brideName} & ${t.groomName}`}>
            {t.brideName} <span aria-hidden="true">&amp;</span> {t.groomName}
          </p>
        </Reveal>
        <Reveal delay={0.3}><Divider /></Reveal>
        <Reveal delay={0.35}><p className="footer__date">{t.weddingDate}</p></Reveal>
        <Reveal delay={0.4}><p className="footer__copy">{t.copyright}</p></Reveal>
      </div>
    </footer>
  )
}
