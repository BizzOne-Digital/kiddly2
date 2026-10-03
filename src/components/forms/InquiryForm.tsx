import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { AGE_GROUP_LABELS, type AgeGroup } from '../../types/provider'
import './InquiryForm.css'

interface InquiryFormProps {
  providerName: string
  onSuccess?: () => void
  variant?: 'default' | 'profile'
}

const AGE_OPTIONS: AgeGroup[] = ['infant', 'toddler', 'preschool', 'kindergarten']

export function InquiryForm({ providerName, onSuccess, variant = 'default' }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(form: FormData) {
    const next: Record<string, string> = {}
    if (!String(form.get('name')).trim()) next.name = 'Name is required.'
    if (!String(form.get('email')).trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(form.get('email'))))
      next.email = 'Enter a valid email.'
    if (!String(form.get('message')).trim()) next.message = 'Message is required.'
    if (!form.get('consent')) next.consent = 'Consent is required.'
    return next
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const next = validate(form)
    setErrors(next)
    if (Object.keys(next).length) return
    setSubmitted(true)
    onSuccess?.()
  }

  if (submitted) {
    return (
      <div className="inquiry-success" role="status">
        <h3>Demo confirmation</h3>
        <p>
          This is a <strong>frontend-only demo</strong>. Your message about{' '}
          <strong>{providerName}</strong> was not sent. In production, this form would notify the
          provider securely.
        </p>
      </div>
    )
  }

  const isProfile = variant === 'profile'

  return (
    <form
      className={`inquiry-form ${isProfile ? 'inquiry-form--profile' : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <label>
        {isProfile ? "Parent's name" : 'Your name'} <span className="required">*</span>
        <input name="name" type="text" required aria-invalid={!!errors.name} />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </label>
      <label>
        {isProfile ? 'Email address' : 'Your email'} <span className="required">*</span>
        <input name="email" type="email" required aria-invalid={!!errors.email} />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </label>
      {isProfile && (
        <label>
          Child&apos;s age
          <select name="childAge" defaultValue="" aria-label="Child age group">
            <option value="">Select age group</option>
            {AGE_OPTIONS.map((a) => (
              <option key={a} value={a}>{AGE_GROUP_LABELS[a]}</option>
            ))}
          </select>
        </label>
      )}
      <label>
        {isProfile ? 'Message' : 'Your message'} <span className="required">*</span>
        <textarea
          name="message"
          rows={isProfile ? 4 : 4}
          placeholder={`Hi, I'd like to ask about care at ${providerName}…`}
          required
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="field-error">{errors.message}</span>}
      </label>
      <label className="inquiry-form__consent">
        <input name="consent" type="checkbox" required />
        I agree to be contacted regarding my inquiry (demo).
        {errors.consent && <span className="field-error">{errors.consent}</span>}
      </label>
      <button type="submit" className="btn btn--primary inquiry-form__submit">
        {isProfile ? 'Send Message →' : 'Send inquiry (demo)'}
      </button>
      {isProfile && (
        <p className="inquiry-form__legal">
          Demo only — see <Link to="/faq">FAQ</Link> and <Link to="/contact">Contact</Link> for
          policies.
        </p>
      )}
    </form>
  )
}
