import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GoldDivider, MoroccanStar } from './Ornaments'
import { CONFIG } from '../config'

const INITIAL = { name: '', phone: '', guests: '1', attending: '', message: '' }

function buildWA(d) {
  const a = d.attending === 'yes' ? '✅ Oui, je serai présent(e)' : '❌ Je ne pourrai pas être présent(e)'
  return `https://wa.me/${CONFIG.whatsappNumber.replace(/\D/g,'')}?text=${encodeURIComponent(
    `💌 *Confirmation — Mariage Kaoutar & Abdelsamad*\n\n👤 *Nom :* ${d.name}\n📞 *Tél :* ${d.phone}\n👥 *Personnes :* ${d.guests}\n${a}${d.message ? `\n\n💬 *Message :* ${d.message}` : ''}`
  )}`
}




function buildEmailText(d) {
  const a = d.attending === 'yes' ? 'Oui, présent(e)' : 'Non disponible'
  return `Nom: ${d.name}\nTél: ${d.phone}\nPersonnes: ${d.guests}\nPrésence: ${a}${d.message ? `\nMessage: ${d.message}` : ''}`
}

function SuccessScreen({ data, onReset }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    const text = buildEmailText(data)
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
      transition={{ duration:0.5, ease:[0.16,1,0.3,1] }} style={{ textAlign:'center', padding:'clamp(16px,4vw,24px) 0' }}>
      {/* Gold checkmark */}
      <div style={{ position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center', marginBottom:24 }}>
        <motion.div style={{ position:'absolute', width:90, height:90, borderRadius:'50%', border:'2px solid rgba(198,161,91,0.3)' }}
          animate={{ scale:[1,1.4,1], opacity:[0.3,0,0.3] }} transition={{ duration:2, repeat:Infinity }}/>
        <div style={{ width:72, height:72, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28,
          background:'linear-gradient(135deg, #a07c3a, #C6A15B, #E8D5A0, #C6A15B, #a07c3a)',
          boxShadow:'0 6px 24px rgba(198,161,91,0.4)' }}>✓</div>
      </div>
      <h3 style={{ fontFamily:'"Playfair Display", serif', fontSize:'clamp(1.3rem,3.5vw,1.7rem)', color:'rgba(248,242,232,0.95)', fontWeight:700, marginBottom:12 }}>
        Merci, {data.name.split(' ')[0]} !
      </h3>
      <p style={{ fontFamily:'"Cormorant Garamond", serif', fontSize:'clamp(0.95rem,2.5vw,1.1rem)', color:'rgba(248,242,232,0.7)', fontStyle:'italic', lineHeight:1.8, marginBottom:28, maxWidth:400, margin:'0 auto 28px' }}>
        {data.attending === 'yes' ? 'Votre présence nous comblera de joie.' : 'Nous sommes touchés par votre réponse.'}
      </p>
      <GoldDivider/>

      <p style={{ fontFamily:'Lato, sans-serif', fontSize:'clamp(0.55rem,1.5vw,0.68rem)', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(198,161,91,0.7)', margin:'20px 0 14px' }}>
        Envoyer votre confirmation
      </p>

      <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:12 }}>

        {/* ── WhatsApp ── */}
        <a href={buildWA(data)} target="_blank" rel="noopener noreferrer"
          style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'clamp(10px,2.5vw,13px) clamp(18px,4vw,28px)',
            textDecoration:'none', borderRadius:2, fontFamily:'"Cormorant Garamond", serif',
            fontSize:'clamp(0.85rem,2vw,1rem)', color:'#fff',
            background:'linear-gradient(135deg, #25D366, #128C7E)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </a>

        {/* ── Copier le message (pour envoyer par email) ── */}
        <button onClick={handleCopy}
          style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'clamp(10px,2.5vw,13px) clamp(18px,4vw,28px)',
            borderRadius:2, border:'none', cursor:'pointer',
            fontFamily:'"Cormorant Garamond", serif',
            fontSize:'clamp(0.85rem,2vw,1rem)', color:'#45101F',
            background: copied
              ? 'linear-gradient(135deg, #5a9a5a, #3d7a3d)'
              : 'linear-gradient(135deg, #a07c3a, #C6A15B, #E8D5A0, #C6A15B, #a07c3a)',
            transition:'background 0.3s ease',
          }}>
          {copied ? (
            <>✓ Copié !</>
          ) : (
            <>
              {/* Copy icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
              Copier le message
            </>
          )}
        </button>
      </div>

      {/* Email address displayed so they can paste manually */}
      <p style={{ marginTop:14, fontFamily:'Lato, sans-serif', fontSize:'clamp(0.62rem,1.6vw,0.75rem)', color:'rgba(198,161,91,0.55)', letterSpacing:'0.05em' }}>
        Envoyez à&nbsp;
        <span style={{ color:'rgba(198,161,91,0.85)', textDecoration:'underline', cursor:'text', userSelect:'all' }}>
          {CONFIG.rsvpEmail}
        </span>
      </p>

      <button onClick={onReset} style={{ marginTop:20, fontFamily:'Lato, sans-serif', fontSize:'0.78rem', color:'rgba(248,242,232,0.4)', textDecoration:'underline', background:'none', border:'none', cursor:'pointer' }}>
        Modifier ma réponse
      </button>
    </motion.div>
  )
}

const inp = {
  width:'100%', padding:'clamp(10px,2.5vw,13px) clamp(12px,3vw,16px)', borderRadius:2,
  fontFamily:'"Cormorant Garamond", serif', fontSize:'clamp(0.9rem,2.5vw,1.05rem)',
  color:'#45101F', background:'rgba(248,242,232,0.95)', border:'1px solid rgba(198,161,91,0.35)',
  outline:'none',
}
const lbl = {
  display:'block', marginBottom:6, fontFamily:'"Cormorant Garamond", serif',
  fontSize:'clamp(0.85rem,2vw,0.95rem)', color:'rgba(248,242,232,0.75)', letterSpacing:'0.06em',
}
const err = { marginTop:4, fontSize:'0.78rem', color:'#ff8080', fontFamily:'Lato, sans-serif' }

export default function RSVPForm() {
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Veuillez entrer votre nom.'
    if (!form.phone.trim()) e.phone = 'Veuillez entrer votre numéro.'
    if (!form.attending) e.attending = 'Veuillez confirmer votre présence.'
    return e
  }

  const change = (k, v) => { setForm(f => ({...f,[k]:v})); setErrors(e => ({...e,[k]:undefined})) }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmittedData({...form}); setSubmitted(true)
  }

  return (
    <section id="rsvp" className="velvet-bg"
      style={{ position:'relative', padding:'clamp(60px,10vw,96px) clamp(16px,5vw,32px)', overflow:'hidden' }}>

      <div style={{ position:'relative', zIndex:10, maxWidth:560, margin:'0 auto' }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8 }} viewport={{ once:true }}
          style={{ textAlign:'center', marginBottom:'clamp(32px,6vw,48px)' }}>
          <p style={{ fontFamily:'Lato, sans-serif', fontSize:'clamp(0.6rem,2vw,0.72rem)', letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(198,161,91,0.7)', marginBottom:12 }}>
            ✦ &nbsp;R.S.V.P&nbsp; ✦
          </p>
          <h2 style={{ fontFamily:'"Playfair Display", serif', fontSize:'clamp(1.4rem,4vw,2.4rem)', fontWeight:700, lineHeight:1.3,
            background:'linear-gradient(135deg, #a07c3a, #C6A15B, #E8D5A0, #C6A15B, #a07c3a)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Votre présence nous ferait<br/>énormément plaisir
          </h2>
          <div style={{ marginTop:'clamp(14px,3vw,24px)' }}><GoldDivider/></div>
        </motion.div>

        {/* Form box */}
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.2 }} viewport={{ once:true }}
          style={{ position:'relative', padding:'clamp(20px,5vw,36px)', borderRadius:2,
            background:'rgba(69,16,31,0.6)', border:'1px solid rgba(198,161,91,0.22)',
            backdropFilter:'blur(10px)' }}>
          <div style={{ position:'absolute', inset:10, border:'1px solid rgba(198,161,91,0.08)', borderRadius:2, pointerEvents:'none' }}/>

          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessScreen key="ok" data={submittedData} onReset={() => { setSubmitted(false); setForm(INITIAL); setSubmittedData(null) }}/>
            ) : (
              <motion.form key="form" onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'clamp(14px,3vw,20px)' }}
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                <div>
                  <label style={lbl}>Nom complet *</label>
                  <input type="text" value={form.name} onChange={e=>change('name',e.target.value)} placeholder="Votre prénom et nom" style={inp}/>
                  {errors.name && <p style={err}>{errors.name}</p>}
                </div>
                <div>
                  <label style={lbl}>Numéro de téléphone *</label>
                  <input type="tel" value={form.phone} onChange={e=>change('phone',e.target.value)} placeholder="+212 6XX XXX XXX" style={inp}/>
                  {errors.phone && <p style={err}>{errors.phone}</p>}
                </div>
                <div>
                  <label style={lbl}>Nombre de personnes</label>
                  <select value={form.guests} onChange={e=>change('guests',e.target.value)} style={{...inp, cursor:'pointer'}}>
                    {[1,2,3,4,5,6].map(n=><option key={n} value={String(n)}>{n} {n===1?'personne':'personnes'}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>Serez-vous présent(e) ? *</label>
                  <div style={{ display:'flex', gap:10 }}>
                    {[{v:'yes',l:'✓ Oui, avec plaisir'},{v:'no',l:'✗ Je ne pourrai pas'}].map(o=>(
                      <button key={o.v} type="button" onClick={()=>change('attending',o.v)}
                        style={{ flex:1, padding:'clamp(10px,2.5vw,13px) 8px', borderRadius:2, cursor:'pointer',
                          fontFamily:'"Cormorant Garamond", serif', fontSize:'clamp(0.82rem,2vw,0.95rem)', letterSpacing:'0.03em',
                          border: form.attending===o.v ? '1px solid rgba(198,161,91,0.8)' : '1px solid rgba(198,161,91,0.25)',
                          background: form.attending===o.v ? 'linear-gradient(135deg, #a07c3a, #C6A15B, #E8D5A0, #C6A15B, #a07c3a)' : 'rgba(248,242,232,0.07)',
                          color: form.attending===o.v ? '#45101F' : 'rgba(248,242,232,0.65)',
                        }}>
                        {o.l}
                      </button>
                    ))}
                  </div>
                  {errors.attending && <p style={err}>{errors.attending}</p>}
                </div>
                <div>
                  <label style={lbl}>Message pour les mariés (optionnel)</label>
                  <textarea value={form.message} onChange={e=>change('message',e.target.value)}
                    placeholder="Un mot tendre pour les mariés..." rows={3}
                    style={{...inp, resize:'vertical', lineHeight:1.6}}/>
                </div>
                <motion.button type="submit"
                  style={{ marginTop:4, padding:'clamp(13px,3vw,16px)', cursor:'pointer', border:'none', borderRadius:2,
                    fontFamily:'"Cormorant Garamond", serif', fontSize:'clamp(0.82rem,2vw,0.95rem)', letterSpacing:'0.15em', textTransform:'uppercase',
                    color:'#45101F', boxShadow:'0 4px 20px rgba(198,161,91,0.3)',
                    background:'linear-gradient(135deg, #a07c3a, #C6A15B, #E8D5A0, #C6A15B, #a07c3a)',
                    backgroundSize:'200% auto' }}
                  whileHover={{ scale:1.01, boxShadow:'0 6px 28px rgba(198,161,91,0.5)' }}
                  whileTap={{ scale:0.98 }}>
                  ✦ Confirmer ma présence ✦
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <div style={{ display:'flex', justifyContent:'center', marginTop:28 }}>
          <MoroccanStar size={32}/>
        </div>
      </div>
    </section>
  )
}
