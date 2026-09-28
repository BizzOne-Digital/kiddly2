import { FormEvent, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  Baby,
  Calendar,
  Heart,
  Mail,
  MapPin,
  Phone,
  Sprout,
  Sun,
  Users,
} from 'lucide-react'
import type { AgeGroup } from '../types/provider'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './ContactPage.css'

type Role = 'parent' | 'educator' | 'agency' | 'other'
type Topic =
  | 'find-childcare'
  | 'provider-profile'
  | 'account'
  | 'report'
  | 'general'
  | 'other'

const AGE_CARDS: { id: AgeGroup; title: string; range: string; icon: typeof Baby }[] = [
  { id: 'infant', title: 'Infant', range: '0–18 months', icon: Baby },
  { id: 'toddler', title: 'Toddler', range: '18–36 months', icon: Sprout },
  { id: 'preschool', title: 'Preschool', range: '3–5 years', icon: Sun },
  { id: 'kindergarten', title: 'School age', range: '6–12 years', icon: Users },
]

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: Role | ''
  topic: Topic | ''
  ageGroups: AgeGroup[]
  location: string
  startDate: string
  message: string
  contactMethod: '' | 'email' | 'phone'
  consent: boolean
}

const initial: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: '',
  topic: '',
  ageGroups: [],
  location: '',
  startDate: '',
  message: '',
  contactMethod: '',
  consent: false,
}

export function ContactPage() {
  useDocumentTitle('Contact — Kiddly', 'Reach the Kiddly team or send a demo inquiry.')
  const [params] = useSearchParams()
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const topic = params.get('topic')
    if (topic === 'provider-profile') {
      setForm((f) => ({ ...f, topic: 'provider-profile', role: 'educator' }))
    }
  }, [params])

  function validate(): Partial<Record<keyof FormState, string>> {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address.'
    if (!form.role) e.role = 'Please select who you are.'
    if (!form.topic) e.topic = 'Please choose a topic.'
    if (!form.message.trim()) e.message = 'Message is required.'
    if (!form.consent) e.consent = 'Consent is required to continue.'
    return e
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return
    setSubmitted(true)
  }

  function toggleAge(a: AgeGroup) {
    setForm((f) => ({
      ...f,
      ageGroups: f.ageGroups.includes(a)
        ? f.ageGroups.filter((x) => x !== a)
        : [...f.ageGroups, a],
    }))
  }

  if (submitted) {
    return (
      <div className="container contact-success card" style={{ marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-3xl)' }}>
        <h1>Demo confirmation</h1>
        <p>
          Thank you, {form.firstName}. This is a <strong>frontend-only prototype</strong> — your
          message was not emailed or stored. A production build would send this to{' '}
          <a href="mailto:kiddly.ca@gmail.com">kiddly.ca@gmail.com</a> via a secure endpoint.
        </p>
        <button type="button" className="btn btn--secondary" onClick={() => setSubmitted(false)}>
          Send another demo message
        </button>
      </div>
    )
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero__bg" role="presentation" />
        <div className="contact-hero__wash" aria-hidden />
        <div className="container contact-hero__inner">
          <h1>Let&apos;s connect</h1>
          <p>
            Questions about finding care or managing your profile? We&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="container contact-main">
        <div className="contact-main__grid">
          <form className="contact-form card" onSubmit={handleSubmit} noValidate>
            <h2>Send us a message</h2>
            <p className="contact-form__intro">
              Share a few details and we&apos;ll respond using your preferred contact method (demo
              only — no message is sent).
            </p>

            <div className="contact-form__row">
              <label>
                First name <span className="required">*</span>
                <input
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  aria-invalid={!!errors.firstName}
                />
                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
              </label>
              <label>
                Last name
                <input
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
              </label>
            </div>

            <div className="contact-form__row">
              <label>
                Email <span className="required">*</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </label>
            </div>

            <div className="contact-form__row">
              <label>
                I am a <span className="required">*</span>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                  aria-invalid={!!errors.role}
                >
                  <option value="">Select…</option>
                  <option value="parent">Parent / Guardian</option>
                  <option value="educator">Educator</option>
                  <option value="agency">Agency</option>
                  <option value="other">Other</option>
                </select>
                {errors.role && <span className="field-error">{errors.role}</span>}
              </label>
              <label>
                What can we help with? <span className="required">*</span>
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value as Topic })}
                  aria-invalid={!!errors.topic}
                >
                  <option value="">Select…</option>
                  <option value="find-childcare">Find childcare</option>
                  <option value="provider-profile">Provider profile</option>
                  <option value="account">Account</option>
                  <option value="report">Report information</option>
                  <option value="general">General question</option>
                  <option value="other">Other</option>
                </select>
                {errors.topic && <span className="field-error">{errors.topic}</span>}
              </label>
            </div>

            <fieldset className="contact-age-fieldset">
              <legend>Child age group (select all that apply)</legend>
              <div className="contact-age-grid">
                {AGE_CARDS.map((card) => {
                  const selected = form.ageGroups.includes(card.id)
                  const Icon = card.icon
                  return (
                    <button
                      key={card.id}
                      type="button"
                      className={`contact-age-card ${selected ? 'is-selected' : ''}`}
                      onClick={() => toggleAge(card.id)}
                      aria-pressed={selected}
                    >
                      <Icon size={26} aria-hidden />
                      <span className="contact-age-card__title">{card.title}</span>
                      <span className="contact-age-card__range">{card.range}</span>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <label className="contact-input-icon">
              Preferred location
              <span className="contact-input-wrap">
                <MapPin size={18} aria-hidden />
                <input
                  placeholder="City or Canadian postal code"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </span>
            </label>

            <label className="contact-input-icon">
              Preferred start date
              <span className="contact-input-wrap">
                <Calendar size={18} aria-hidden />
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
              </span>
            </label>

            <label>
              Message <span className="required">*</span>
              <textarea
                rows={5}
                placeholder="Tell us how we can help…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                aria-invalid={!!errors.message}
              />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </label>

            <fieldset className="contact-method-fieldset">
              <legend>Preferred contact method</legend>
              <div className="contact-method-grid">
                {(
                  [
                    { id: 'email' as const, label: 'Email', desc: 'We reply to your inbox', icon: Mail },
                    { id: 'phone' as const, label: 'Phone', desc: 'Call when it suits you', icon: Phone },
                  ] as const
                ).map((m) => (
                  <label
                    key={m.id}
                    className={`contact-method-card ${form.contactMethod === m.id ? 'is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={m.id}
                      checked={form.contactMethod === m.id}
                      onChange={() => setForm({ ...form, contactMethod: m.id })}
                    />
                    <m.icon size={22} aria-hidden />
                    <span className="contact-method-card__title">{m.label}</span>
                    <span className="contact-method-card__desc">{m.desc}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="contact-form__consent">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                aria-invalid={!!errors.consent}
              />
              <span>
                I agree to be contacted regarding my inquiry and acknowledge this is a demo form.{' '}
                See <Link to="/faq">FAQ</Link> for sample policies. <span className="required">*</span>
              </span>
              {errors.consent && <span className="field-error">{errors.consent}</span>}
            </label>

            <button type="submit" className="btn btn--primary contact-form__submit">
              Send message <ArrowRight size={20} aria-hidden />
            </button>
          </form>

          <aside className="contact-aside">
            <article className="contact-aside-card card contact-aside-card--help">
              <img src="/images/provider/gallery-classroom.jpg" alt="" className="contact-aside-card__img" />
              <div className="contact-aside-card__body">
                <h3>We&apos;re here to help</h3>
                <p>
                  Whether you are searching for care, updating a sample provider profile, or asking
                  about this prototype, our team can point you in the right direction.
                </p>
              </div>
            </article>

            <article className="contact-aside-card card">
              <div className="contact-aside-card__icon contact-aside-card__icon--blue">
                <Mail size={22} aria-hidden />
              </div>
              <h3>Email us</h3>
              <a href="mailto:kiddly.ca@gmail.com" className="contact-aside-card__link">
                kiddly.ca@gmail.com
              </a>
            </article>

            <article className="contact-aside-card card">
              <div className="contact-aside-card__icon contact-aside-card__icon--yellow">
                <Phone size={22} aria-hidden />
              </div>
              <h3>Call us</h3>
              <a href="tel:+18254373563" className="contact-aside-card__link">
                825-437-3563
              </a>
              <p className="contact-aside-card__meta">Weekdays, 9:00 a.m.–5:00 p.m. MT (sample hours)</p>
            </article>

            <article className="contact-aside-card card contact-aside-card--provider">
              <div className="contact-aside-card__icon contact-aside-card__icon--green">
                <Sprout size={22} aria-hidden />
              </div>
              <h3>Provider profile</h3>
              <p>Educators can request to create or claim a listing on Kiddly.</p>
              <Link to="/contact?topic=provider-profile" className="text-link">
                Start provider inquiry <ArrowRight size={16} aria-hidden />
              </Link>
            </article>
          </aside>
        </div>
      </section>

      <section className="contact-faq-band">
        <div className="contact-faq-band__bg" role="presentation" />
        <div className="container contact-faq-band__grid">
          <div>
            <h2>Frequently asked questions</h2>
            <p>
              Quick answers about searching, sample listings, and contacting providers in this
              demo.
            </p>
            <Link to="/faq" className="btn btn--secondary contact-faq-band__btn">
              View all FAQs <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          <aside className="contact-faq-band__visual" aria-hidden>
            <div className="contact-faq-band__note">
              A brighter tomorrow starts with quality care
              <Heart size={14} aria-hidden />
            </div>
            <img src="/images/books-stack.jpg" alt="" loading="lazy" />
            <div className="contact-faq-band__books">
              <span>Play</span>
              <span>Learn</span>
              <span>Grow</span>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
