import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Heart,
  List,
  MapPin,
  Search,
  Shield,
  Star,
} from 'lucide-react'
import { Accordion } from '../components/ui/Accordion'
import { FAQ_PARENTS } from '../data/faqPageData'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './AudiencePage.css'

const steps = [
  {
    title: 'Search your area',
    text: 'Enter a city or postal code, then browse sample listings on the map and in the list.',
  },
  {
    title: 'Compare what matters',
    text: 'Review licensing labels, hours, ages, languages, and availability — always confirm with providers.',
  },
  {
    title: 'Reach out when ready',
    text: 'Use the demo inquiry form on a profile. No booking pressure in this prototype.',
  },
]

const features = [
  {
    icon: MapPin,
    tone: 'blue',
    title: 'Map + list together',
    text: 'See providers near you and how they relate to your commute or neighbourhood.',
  },
  {
    icon: Shield,
    tone: 'green',
    title: 'Clear licensing labels',
    text: 'Licensed and private care are shown separately — not verified by Kiddly in this demo.',
  },
  {
    icon: List,
    tone: 'yellow',
    title: 'Filters that stick in the URL',
    text: 'Distance, age, program type, and more — pick up your search where you left off.',
  },
  {
    icon: Star,
    tone: 'coral',
    title: 'Rich sample profiles',
    text: 'Photos, amenities, and program notes help you shortlist before you contact anyone.',
  },
]

export function ForParentsPage() {
  useDocumentTitle(
    'For Parents — Kiddly',
    'Search and compare childcare near you. Sample listings for preview — confirm details with providers.',
  )

  return (
    <div className="audience-page audience-page--parents">
      <section className="audience-hero">
        <div className="audience-hero__bg" role="presentation" />
        <div className="audience-hero__wash" aria-hidden />
        <div className="container audience-hero__inner">
          <p className="audience-hero__badge">
            <Heart size={18} aria-hidden />
            For Parents
          </p>
          <h1>Find childcare that fits your family</h1>
          <p className="audience-hero__lead">
            Search licensed centres and family dayhomes, compare details side by side, and contact
            providers when you are ready — at your own pace.
          </p>
          <div className="audience-hero__actions">
            <Link to="/search" className="btn btn--primary">
              Search childcare <ArrowRight size={20} aria-hidden />
            </Link>
            <Link to="/faq" className="text-link">
              Parent FAQs <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          <p className="audience-hero__note">Sample listings for preview only.</p>
        </div>
      </section>

      <section className="audience-section section--sky-soft">
        <div className="container">
          <h2 className="audience-section__title">How it works for families</h2>
          <p className="audience-section__intro">
            Kiddly is built to help you explore options with confidence — without fake reviews or
            unverified claims in this prototype.
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
          <div>
            <h2 className="audience-section__title" style={{ textAlign: 'left' }}>
              Tools made for busy parents
            </h2>
            <p className="audience-section__intro" style={{ margin: '0 0 var(--space-xl)', textAlign: 'left' }}>
              Everything in this demo is frontend-only — but the flows mirror how a full Kiddly
              experience would feel.
            </p>
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
          <div className="audience-split__visual card">
            <img src="/images/provider/gallery-reading.jpg" alt="" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="audience-section section--sky-soft">
        <div className="container">
          <h2 className="audience-section__title">Common questions</h2>
          <p className="audience-section__intro">
            Quick answers for parents using this prototype.
          </p>
          <div className="audience-faq">
            <Accordion items={FAQ_PARENTS} variant="faq" />
          </div>
          <p style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
            <Link to="/faq" className="text-link">
              View all FAQs <ArrowRight size={18} aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      <section className="page-bottom-cta" aria-labelledby="parents-cta">
        <img src="/images/cta-lake.jpg" alt="" className="page-bottom-cta__bg" />
        <div className="page-bottom-cta__overlay" aria-hidden />
        <div className="container page-bottom-cta__inner">
          <p className="page-bottom-cta__script" aria-hidden>Stronger Brighter Kinder Canada</p>
          <h2 id="parents-cta">Ready to find the right childcare?</h2>
          <p>Start with your city or postal code and explore providers near you.</p>
          <Link to="/search" className="btn btn--primary btn--lg">
            <Search size={20} aria-hidden />
            Search Childcare
          </Link>
        </div>
      </section>
    </div>
  )
}
