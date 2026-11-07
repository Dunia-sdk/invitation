// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
// Add all UI strings here. Keys are reused across components.
// FR = French (default) · AR = Arabic (RTL)

export const translations = {
  fr: {
    // EnvelopeOpening
    cordiallyInvited: 'Vous êtes cordialement invités',
    openInvitation: 'Ouvrir votre invitation',
    weddingDate: '26 · 01 · 2027',

    // WeddingInvitation
    invitationLabel: 'Invitation de Mariage',
    gettingMarried: 'We are getting married',
    dateDisplay: '26 JANVIER 2027',
    romanticMessage:
      "Le bonheur se partage et l'amour se célèbre. Nous serions honorés de vous compter parmi nous pour célébrer le début de notre nouvelle histoire.",

    // WeddingDetails
    joinUs: 'Rejoignez-nous',
    ceremonyDetails: 'Détails de la Cérémonie',
    dateLabel: 'Date',
    dateValue: '26 Janvier 2027',
    timeLabel: 'Heure',
    timeValue: '20h00 — 8:00 PM',
    venueLabel: 'Lieu',
    viewOnMaps: "Voir l'emplacement sur Google Maps",

    // Countdown
    grandDayApproaches: 'Le Grand Jour approche',
    countdown: 'Compte à Rebours',
    days: 'Jours',
    hours: 'Heures',
    minutes: 'Minutes',
    seconds: 'Secondes',
    dateFootnote: '26 · Janvier · 2027',

    // WeddingTimeline
    programme: 'Programme',
    ourSpecialDay: 'Our Special Day',
    eventTitle: 'Début des célébrations',
    eventDescription: 'La soirée commence — musique, joie et festivités.',
    programmeNote: 'Le programme complet sera mis à jour prochainement.',

    // RSVPForm
    rsvpLabel: 'R.S.V.P',
    rsvpTitle: 'Votre présence nous ferait\u00a0énormément plaisir',
    nameLabel: 'Nom complet *',
    namePlaceholder: 'Votre prénom et nom',
    nameError: 'Veuillez entrer votre nom.',
    phoneLabel: 'Numéro de téléphone *',
    phonePlaceholder: '+212 6XX XXX XXX',
    phoneError: 'Veuillez entrer votre numéro.',
    guestsLabel: 'Nombre de personnes',
    personSingular: 'personne',
    personPlural: 'personnes',
    attendingLabel: 'Serez-vous présent(e) ? *',
    attendingError: 'Veuillez confirmer votre présence.',
    yesAttending: '✓ Oui, avec plaisir',
    noAttending: '✗ Je ne pourrai pas',
    messageLabel: 'Message pour les mariés (optionnel)',
    messagePlaceholder: 'Un mot tendre pour les mariés...',
    submitButton: '✦ Confirmer ma présence ✦',
    sendConfirmation: 'Envoyer votre confirmation',
    editAnswer: 'Modifier ma réponse',
    successPresent: 'Votre présence nous comblera de joie.',
    successAbsent: 'Nous sommes touchés par votre réponse.',
    rsvpWAText: (d) =>
      `💌 *Confirmation — Mariage Kaoutar & Abdelsamad*\n\n👤 *Nom :* ${d.name}\n📞 *Tél :* ${d.phone}\n👥 *Personnes :* ${d.guests}\n${d.attending === 'yes' ? '✅ Oui, je serai présent(e)' : '❌ Je ne pourrai pas être présent(e)'}${d.message ? `\n\n💬 *Message :* ${d.message}` : ''}`,

    // Footer
    closingMessage: 'Nous avons hâte de partager ce moment inoubliable avec vous.',
    withLove: 'Avec tout notre amour,',
    copyright: '© 2027 Kaoutar & Abdelsamad',
  },

  ar: {
    // EnvelopeOpening
    cordiallyInvited: 'نحن نشرفكم بدعوتكم',
    openInvitation: 'افتح دعوتك',
    weddingDate: '٢٠٢٧ · ٠١ · ٢٦',

    // WeddingInvitation
    invitationLabel: 'دعوة زفاف',
    gettingMarried: 'نحن نتزوج',
    dateDisplay: '٢٦ يناير ٢٠٢٧',
    romanticMessage:
      'السعادة تُشارَك والحب يُحتفَل به. سيكون من دواعي شرفنا أن نحظى بوجودكم معنا للاحتفال ببداية قصتنا الجديدة.',

    // WeddingDetails
    joinUs: 'انضموا إلينا',
    ceremonyDetails: 'تفاصيل الحفل',
    dateLabel: 'التاريخ',
    dateValue: '٢٦ يناير ٢٠٢٧',
    timeLabel: 'الوقت',
    timeValue: '٢٠:٠٠ — ٨:٠٠ م',
    venueLabel: 'المكان',
    viewOnMaps: 'عرض الموقع على خرائط Google',

    // Countdown
    grandDayApproaches: 'اليوم الكبير يقترب',
    countdown: 'العد التنازلي',
    days: 'أيام',
    hours: 'ساعات',
    minutes: 'دقائق',
    seconds: 'ثواني',
    dateFootnote: '٢٦ · يناير · ٢٠٢٧',

    // WeddingTimeline
    programme: 'البرنامج',
    ourSpecialDay: 'يومنا المميز',
    eventTitle: 'بداية الاحتفالات',
    eventDescription: 'تبدأ السهرة — موسيقى وفرح ومرح.',
    programmeNote: 'سيتم تحديث البرنامج الكامل قريباً.',

    // RSVPForm
    rsvpLabel: 'تأكيد الحضور',
    rsvpTitle: 'حضوركم سيسعدنا كثيراً',
    nameLabel: 'الاسم الكامل *',
    namePlaceholder: 'الاسم الأول واسم العائلة',
    nameError: 'يرجى إدخال اسمك.',
    phoneLabel: 'رقم الهاتف *',
    phonePlaceholder: '+212 6XX XXX XXX',
    phoneError: 'يرجى إدخال رقم هاتفك.',
    guestsLabel: 'عدد الأشخاص',
    personSingular: 'شخص',
    personPlural: 'أشخاص',
    attendingLabel: 'هل ستحضر/ين؟ *',
    attendingError: 'يرجى تأكيد حضورك.',
    yesAttending: '✓ نعم، بكل سرور',
    noAttending: '✗ لن أتمكن من الحضور',
    messageLabel: 'رسالة للعروسين (اختياري)',
    messagePlaceholder: 'كلمة رقيقة للعروسين...',
    submitButton: '✦ تأكيد حضوري ✦',
    sendConfirmation: 'إرسال تأكيدك',
    editAnswer: 'تعديل إجابتي',
    successPresent: 'حضوركم سيملأ قلوبنا فرحاً.',
    successAbsent: 'نحن ممتنون لردكم.',
    rsvpWAText: (d) =>
      `💌 *تأكيد — زفاف كوثر وعبدالصمد*\n\n👤 *الاسم:* ${d.name}\n📞 *الهاتف:* ${d.phone}\n👥 *عدد الأشخاص:* ${d.guests}\n${d.attending === 'yes' ? '✅ نعم، سأكون حاضراً/ة' : '❌ لن أتمكن من الحضور'}${d.message ? `\n\n💬 *رسالة:* ${d.message}` : ''}`,

    // Footer
    closingMessage: 'نتطلع إلى مشاركة هذه اللحظة الرائعة معكم.',
    withLove: 'بكل محبتنا،',
    copyright: '© ٢٠٢٧ كوثر وعبدالصمد',
  },
}

