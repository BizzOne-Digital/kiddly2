import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  Globe,
  Heart,
  Laptop,
  Sparkles,
  Users,
} from 'lucide-react'
import { PictureImg } from '../components/ui/PictureImg'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './CareersPage.css'

const perks = [
  {
    icon: Heart,
    title: 'Mission-led work',
    text: 'Help families find care and help educators grow — problems that matter in every community.',
  },
  {
    icon: Globe,
    title: 'Canada-first',
    text: 'Build for licensing, languages, and neighbourhoods across the country — not a generic template.',
  },
  {
    icon: Laptop,
    title: 'Remote-friendly',
    text: 'Collaborate across time zones with async-friendly rituals and room for focused deep work.',
  },
  {
    icon: Users,
    title: 'Small team, big ownership',
    text: 'Wear meaningful hats early — product, design, and engineering work closely together.',
  },
]

const openings = [
  {
    title: 'Senior Product Designer',
    team: 'Product & Design',
    location: 'Remote · Canada',
    type: 'Full-time',
  },
  {
    title: 'Full Stack Engineer',
    team: 'Engineering',
    location: 'Remote · Canada',
    type: 'Full-time',
  },
  {
    title: 'Community Partnerships Lead',
    team: 'Growth',
    location: 'Toronto or remote',
    type: 'Full-time',
  },
  {
    title: 'Customer Success Specialist',
    team: 'Operations',
    location: 'Remote · Canada',
    type: 'Full-time',
  },
]

export function CareersPage() {
  useDocumentTitle(
    'Careers — Kiddly',
    'Join the Kiddly team. Open roles and how we work — demo listings for a growing Canadian childcare platform.',
  )

  return (
    <div className="careers-page">
      <section className="careers-hero">
        <div className="careers-hero__bg" role="presentation" />
        <div className="careers-hero__wash" aria-hidden />
        <p className="careers-hero__script" aria-hidden>Play Grow Belong</p>
        <div className="container careers-hero__inner">
          <p className="careers-hero__badge">
            <Briefcase size={18} aria-hidden />
            Careers at Kiddly
          </p>
          <h1>Build childcare tools families trust</h1>
          <p className="careers-hero__lead">
            We are a small team shaping how Canadian parents discover care and how educators show up
            online — with clarity, warmth, and room to grow.
          </p>
          <div className="careers-hero__actions">
            <a href="#open-roles" className="btn btn--primary">
              View open roles <ArrowRight size={20} aria-hidden />
            </a>
            <Link to="/about" className="text-link">
              About Kiddly <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          <p className="careers-hero__note">Sample job listings for this prototype — not live hiring yet.</p>
        </div>
      </section>

      <section className="careers-section careers-section--mint">
        <div className="container careers-split">
          <div className="careers-split__copy">
            <h2 className="careers-section__title">Why join us</h2>
            <p>
              Childcare is essential infrastructure. Kiddly sits at the intersection of search,
              trust, and community — the kind of product where good design and reliable engineering
              change real outcomes for families.
            </p>
            <p>
              If you care about accessible UX, honest information, and tools that respect both
              parents and providers, you will find meaningful problems here.
            </p>
          </div>
          <div className="careers-split__visual card">
            <PictureImg
              src="/images/grow-educators.jpg"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="careers-section">
        <div className="container">
          <h2 className="careers-section__title careers-section__title--center">How we work</h2>
          <p className="careers-section__intro">
            Culture notes for candidates exploring Kiddly — reflective of how we want to build, not a
            formal HR policy in this demo.
          </p>
          <div className="careers-perks">
            {perks.map((item) => (
              <article key={item.title} className="careers-perk card">
                <div className="careers-perk__icon" aria-hidden>
                  <item.icon size={26} strokeWidth={2.25} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-section careers-section--soft" id="open-roles">
        <div className="container">
          <div className="careers-roles-head">
            <div>
              <h2 className="careers-section__title">Open roles</h2>
              <p className="careers-roles-head__lead">
                Interested in a role below? Send a note through our contact form — include the job
                title and a link to your portfolio or résumé.
              </p>
            </div>
            <span className="careers-roles-head__badge">
              <Sparkles size={16} aria-hidden />
              Demo listings
            </span>
          </div>
          <ul className="careers-roles">
            {openings.map((role) => (
              <li key={role.title}>
                <article className="careers-role card">
                  <div className="careers-role__main">
                    <h3>{role.title}</h3>
                    <p className="careers-role__meta">
                      <span>{role.team}</span>
                      <span aria-hidden>·</span>
                      <span>{role.location}</span>
                      <span aria-hidden>·</span>
                      <span>{role.type}</span>
                    </p>
                  </div>
                  <Link
                    to={`/contact?topic=careers&role=${encodeURIComponent(role.title)}`}
                    className="btn btn--teal careers-role__apply"
                  >
                    Apply <ArrowRight size={18} aria-hidden />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
          <p className="careers-roles__footer">
            Don&apos;t see your role?{' '}
            <Link to="/contact?topic=careers" className="text-link">
              Introduce yourself <ArrowRight size={16} aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      <section className="page-bottom-cta" aria-labelledby="careers-cta-title">
        <PictureImg
          src="/images/search/cta-lake.jpg"
          alt=""
          className="page-bottom-cta__bg"
          loading="lazy"
          decoding="async"
        />
        <div className="page-bottom-cta__overlay" aria-hidden />
        <div className="container page-bottom-cta__inner">
          <p className="page-bottom-cta__script" aria-hidden>Stronger Brighter Kinder Canada</p>
          <h2 id="careers-cta-title">Ready to make an impact?</h2>
          <p>Tell us what you would love to build at Kiddly — we read every demo submission.</p>
          <Link to="/contact?topic=careers" className="btn btn--primary btn--lg">
            Contact our team <ArrowRight size={20} aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  )
}
