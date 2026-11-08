import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CONFIG } from '../config'
import { useT } from '../context/LanguageContext'
import { ArchEdge, Divider, Star8 } from './ui/Ornaments'
import { CheckIcon, CopyIcon, WhatsAppIcon } from './ui/icons'
import Reveal from './ui/Reveal'
import { EASE } from '../lib/motion'

const INITIAL = { name: '', phone: '', guests: '1', attending: '', message: '' }

function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
  // Fallback for non-secure contexts / older webviews
  return new Promise((resolve, reject) => {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.cssText = 'position:fixed;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    try {
      if (document.execCommand('copy')) resolve()
      else reject(new Error('copy failed'))
    } catch (e) { reject(e) } finally { ta.remove() }
  })
}

function SuccessScreen({ data, onReset }) {
  const t = useT()
  const [copied, setCopied] = useState(false)
  const waHref = `https://wa.me/${CONFIG.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(t.rsvpWAText(data))}`

  const handleCopy = () =>
    copyToClipboard(t.rsvpEmailText(data)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }).catch(() => {})

  return (
    <motion.div className="rsvp-ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div className="rsvp-ok__badge">
        <motion.span className="rsvp-ok__ring" animate={{ scale: [1, 1.45], opacity: [0.5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }} />
        <CheckIcon size={30} />
      </div>
      <h3>{t.thanks(data.name.trim().split(/\s+/)[0])}</h3>
      <p className="rsvp-ok__msg">{data.attending === 'yes' ? t.successPresent : t.successAbsent}</p>
      <Divider />
      <p className="rsvp-ok__label">{t.sendConfirmation}</p>
      <div className="rsvp-ok__actions">
        <a className="btn btn--burgundy" href={waHref} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={17} /> WhatsApp</a>
        <button type="button" className="btn btn--outline" onClick={handleCopy} aria-live="polite">
          {copied ? <><CheckIcon size={16} /> {t.copied}</> : <><CopyIcon size={16} /> {t.copyMessage}</>}
        </button>
      </div>
      <p className="rsvp-ok__mail">{t.sendTo} <span>{CONFIG.rsvpEmail}</span></p>
      <button type="button" className="link-quiet" onClick={onReset}>{t.editAnswer}</button>
    </motion.div>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p className="field__error" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  )
}

export default function RSVPForm() {
  const t = useT()
  const uid = useId()
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(null)
  const [errors, setErrors] = useState({})

  const change = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = t.nameError
    if (!form.phone.trim()) errs.phone = t.phoneError
    if (!form.attending) errs.attending = t.attendingError
    if (Object.keys(errs).length) {
      setErrors(errs)
      document.getElementById(`${uid}-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    setSubmitted({ ...form })
  }

  const fid = (k) => `${uid}-${k}`
  const aria = (k) => ({ id: fid(k), 'aria-invalid': !!errors[k] || undefined, 'aria-describedby': errors[k] ? `${fid(k)}-err` : undefined })

  return (
    <section id="rsvp" className="section section--wine zellige rsvp">
      <ArchEdge />
      <div className="container container--form">
        <Reveal className="section-head">
          <p className="eyebrow">{t.rsvpLabel}</p>
          <h2 className="h2">{t.rsvpTitle}</h2>
        </Reveal>

        <Reveal delay={0.15} className="rsvp-card">
          <span className="rsvp-card__corner rsvp-card__corner--tl" aria-hidden="true" />
          <span className="rsvp-card__corner rsvp-card__corner--tr" aria-hidden="true" />
          <span className="rsvp-card__corner rsvp-card__corner--bl" aria-hidden="true" />
          <span className="rsvp-card__corner rsvp-card__corner--br" aria-hidden="true" />
          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessScreen key="ok" data={submitted} onReset={() => { setSubmitted(null); setForm(INITIAL) }} />
            ) : (
              <motion.form key="form" noValidate onSubmit={submit} className="rsvp-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Field id={fid('name')} label={t.nameLabel} error={errors.name}>
                  <input type="text" autoComplete="name" value={form.name} onChange={(e) => change('name', e.target.value)} placeholder={t.namePlaceholder} {...aria('name')} />
                </Field>
                <Field id={fid('phone')} label={t.phoneLabel} error={errors.phone}>
                  <input type="tel" inputMode="tel" autoComplete="tel" dir="ltr" value={form.phone} onChange={(e) => change('phone', e.target.value)} placeholder={t.phonePlaceholder} {...aria('phone')} />
                </Field>
                <Field id={fid('guests')} label={t.guestsLabel}>
                  <select value={form.guests} onChange={(e) => change('guests', e.target.value)} id={fid('guests')}>
                    {[1, 2, 3, 4, 5, 6].map((n) => (<option key={n} value={String(n)}>{n} {n === 1 ? t.personSingular : t.personPlural}</option>))}
                  </select>
                </Field>

                <fieldset className={`field choices ${errors.attending ? 'has-error' : ''}`} aria-describedby={errors.attending ? `${fid('attending')}-err` : undefined}>
                  <legend>{t.attendingLabel}</legend>
                  <div className="choices__row">
                    {[{ v: 'yes', l: t.yesAttending }, { v: 'no', l: t.noAttending }].map((o, i) => (
                      <label key={o.v} className={`choice ${form.attending === o.v ? 'is-on' : ''}`}>
                        <input type="radio" name={fid('attending')} value={o.v} checked={form.attending === o.v} onChange={() => change('attending', o.v)} id={i === 0 ? fid('attending') : undefined} />
                        <span>{o.l}</span>
                      </label>
                    ))}
                  </div>
                  {errors.attending && <p className="field__error" id={`${fid('attending')}-err`} role="alert">{errors.attending}</p>}
                </fieldset>

                <Field id={fid('message')} label={t.messageLabel}>
                  <textarea rows={3} value={form.message} onChange={(e) => change('message', e.target.value)} placeholder={t.messagePlaceholder} id={fid('message')} />
                </Field>

                <button type="submit" className="btn btn--burgundy rsvp-form__submit">{t.submitButton}</button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>

        <Reveal delay={0.25} className="rsvp__star"><Star8 size={30} /></Reveal>
      </div>
    </section>
  )
}
