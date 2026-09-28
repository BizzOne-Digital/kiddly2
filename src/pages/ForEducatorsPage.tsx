import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Calendar,
  Check,
  MessageCircle,
  Sprout,
  Users,
} from 'lucide-react'
import { Accordion } from '../components/ui/Accordion'
import { FAQ_EDUCATORS } from '../data/faqPageData'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './AudiencePage.css'

const steps = [
  {
    title: 'Share your program',
    text: 'Tell us about your location, ages served, hours, licensing, and what makes your care unique.',
  },
  {
    title: 'Build your profile',
    text: 'In this demo, we illustrate how your listing would look to families — photos, amenities, availability labels.',
  },
  {
    title: 'Connect with families',
    text: 'Families reach out through inquiry forms. A live product would add owner tools and verification.',
  },
]

const benefits = [
  'Reach families searching in your area',
  'Showcase hours, ages, and languages',
  'Share availability and waitlist status (sample labels)',
  'Update details through our contact flow in this prototype',
]

const features = [
  {
    icon: Users,
    tone: 'green',
    title: 'Be discoverable locally',
    text: 'Appear when parents search your city or postal code on the map and list.',
  },
  {
    icon: Calendar,
    tone: 'blue',
    title: 'Keep hours current',
    text: 'Accurate schedules help families self-select — send updates via contact until live editing ships.',
  },
  {
    icon: MessageCircle,
    tone: 'coral',
    title: 'Demo inquiries',
    text: 'See how families would ask about tours, start dates, and waitlists on your profile.',
  },
  {
    icon: Check,
    tone: 'yellow',
    title: 'Claim sample listings',
    text: 'If a prototype listing resembles your program, note it when you get in touch.',
  },
]

export function ForEducatorsPage() {
  useDocumentTitle(
    'For Educators — Kiddly',
    'List or claim a childcare profile, keep sample availability current, and connect with families.',
  )

  return (
    <div className="audience-page audience-page--educators">
      <section className="audience-hero">
        <div className="audience-hero__bg" role="presentation" />
        <div className="audience-hero__wash" aria-hidden />
        <div className="container audience-hero__inner">
          <p className="audience-hero__badge">
            <Sprout size={18} aria-hidden />
            For Educators
          </p>
          <h1>Grow your impact with Kiddly</h1>
          <p className="audience-hero__lead">
            Create or claim a provider profile, keep hours and availability understandable for
            families, and help parents find care that fits — stronger communities start with you.
          </p>
          <div className="audience-hero__actions">
            <Link to="/contact?topic=provider-profile" className="btn btn--primary">
              Create or claim profile <ArrowRight size={20} aria-hidden />
            </Link>
            <Link to="/faq" className="text-link">
              Educator FAQs <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          <p className="audience-hero__note">Demo onboarding — confirmation only, no live dashboard.</p>
        </div>
      </section>

      <section className="audience-section section--sky-soft">
        <div className="container">
          <h2 className="audience-section__title">How listing works in this prototype</h2>
          <p className="audience-section__intro">
            We do not verify licences or identity in this frontend demo — full product flows would
            include those steps.
          </p>
          <div className="audience-steps">
            {steps.map((step, i) => (
              <article key={step.title} className="audience-step card">
                <div className="audience-step__num">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="audience-section audience-section--white">
        <div className="container audience-split">
          <div className="audience-split__visual card">
            <img src="/images/grow-educators.jpg" alt="" loading="lazy" />
          </div>
          <div>
            <h2 className="audience-section__title" style={{ textAlign: 'left' }}>
              Why educators use Kiddly
            </h2>
            <ul className="audience-checks">
              {benefits.map((line) => (
                <li key={line}>
                  <Check size={20} aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
            <div className="audience-features">
              {features.map((f) => (
                <article key={f.title} className="audience-feature card">
                  <div className={`audience-feature__icon audience-feature__icon--${f.tone}`}>
                    <f.icon size={22} aria-hidden />
                  </div>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="audience-section section--sky-soft">
        <div className="container">
          <h2 className="audience-section__title">Common questions</h2>
          <p className="audience-section__intro">
            Quick answers for providers exploring this demo.
          </p>
          <div className="audience-faq">
            <Accordion items={FAQ_EDUCATORS} variant="faq" />
          </div>
          <p style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
            <Link to="/faq" className="text-link">
              View all FAQs <ArrowRight size={18} aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      <section className="page-bottom-cta" aria-labelledby="educators-cta">
        <img src="/images/search/cta-lake.jpg" alt="" className="page-bottom-cta__bg" />
        <div className="page-bottom-cta__overlay" aria-hidden />
        <div className="container page-bottom-cta__inner">
          <p className="page-bottom-cta__script" aria-hidden>Stronger Brighter Kinder Canada</p>
          <h2 id="educators-cta">Grow your impact with Kiddly</h2>
          <p>Create or claim your profile and connect with families searching in your area.</p>
          <Link to="/contact?topic=provider-profile" className="btn btn--primary btn--lg">
            Create or claim your profile <ArrowRight size={20} aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  )
}
