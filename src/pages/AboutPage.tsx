import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Leaf, MapPin, Shield, Users } from 'lucide-react'
import { PictureImg } from '../components/ui/PictureImg'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './AboutPage.css'

const values = [
  {
    icon: Shield,
    title: 'Trust first',
    text: 'We surface licensing labels and clear profile details so families can ask better questions — and providers can show up accurately.',
  },
  {
    icon: MapPin,
    title: 'Local by design',
    text: 'Search is built around neighbourhoods, commutes, and Canadian cities — not one-size-fits-all listings.',
  },
  {
    icon: Users,
    title: 'Two-sided community',
    text: 'Parents and educators both deserve tools that respect their time: compare, update, and connect without noise.',
  },
  {
    icon: Leaf,
    title: 'Built for Canada',
    text: 'From language to licensing context, Kiddly is shaped for how childcare works here — with room to grow coast to coast.',
  },
]

const milestones = [
  {
    year: 'Today',
    title: 'Prototype & preview',
    text: 'Sample listings, demo forms, and design aligned with how Kiddly will help families and providers connect.',
  },
  {
    year: 'Next',
    title: 'Richer profiles',
    text: 'More ways for educators to keep hours, ages, and availability current — and for parents to compare with confidence.',
  },
  {
    year: 'Ahead',
    title: 'Stronger communities',
    text: 'Partnerships and tools that support licensed care, family dayhomes, and the teams who make early learning possible.',
  },
]

export function AboutPage() {
  useDocumentTitle(
    'About — Kiddly',
    'Learn about Kiddly’s mission to help Canadian families find childcare and help educators grow their reach.',
  )

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__bg" role="presentation" />
        <p className="about-hero__script" aria-hidden>A brighter tomorrow for every child</p>
        <div className="container about-hero__inner">
          <p className="about-hero__badge">
            <Heart size={18} aria-hidden />
            About Kiddly
          </p>
          <h1>Childcare discovery that feels human</h1>
          <p className="about-hero__lead">
            Kiddly connects Canadian families with licensed centres and family dayhomes — and gives
            educators a place to be found with clarity, not clutter.
          </p>
          <div className="about-hero__actions">
            <Link to="/search" className="btn btn--primary">
              Search childcare <ArrowRight size={20} aria-hidden />
            </Link>
            <Link to="/contact" className="text-link">
              Contact us <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="about-section about-section--mint">
        <div className="container about-mission">
          <div className="about-mission__copy">
            <h2 className="about-section__title">Our mission</h2>
            <p>
              Finding childcare is stressful enough. We are building a calmer way to explore options
              near you — with maps, filters, and profiles that highlight what matters before you
              reach out.
            </p>
            <p>
              For educators, that means visibility with integrity: accurate program details, room to
              tell your story, and a path for families to connect when the fit is right.
            </p>
            <p className="about-mission__note">
              This site is a working prototype. Listings and forms are for demonstration — always
              confirm details directly with providers.
            </p>
          </div>
          <div className="about-mission__visual card">
            <PictureImg
              src="/images/trust-mountains.jpg"
              alt=""
              loading="lazy"
              decoding="async"
            />
            <p className="about-mission__script" aria-hidden>Safe Supported Stronger Together</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <h2 className="about-section__title about-section__title--center">What we stand for</h2>
          <p className="about-section__intro">
            Principles that guide product decisions — from search to profiles to how we talk about
            care in Canada.
          </p>
          <div className="about-values">
            {values.map((item) => (
              <article key={item.title} className="about-value card">
                <div className="about-value__icon" aria-hidden>
                  <item.icon size={26} strokeWidth={2.25} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--soft">
        <div className="container about-audience">
          <article className="about-audience__card card">
            <h2>For parents &amp; guardians</h2>
            <p>
              Search by city or postal code, compare programs on a map and list, and use rich sample
              profiles to shortlist before you contact a provider.
            </p>
            <Link to="/for-parents" className="text-link">
              Learn more for parents <ArrowRight size={18} aria-hidden />
            </Link>
          </article>
          <article className="about-audience__card card">
            <h2>For educators &amp; providers</h2>
            <p>
              Claim or create a profile, keep your story and hours current, and reach families
              searching in your area — starting with our demo onboarding flow.
            </p>
            <Link to="/for-educators" className="text-link">
              Learn more for educators <ArrowRight size={18} aria-hidden />
            </Link>
          </article>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <h2 className="about-section__title about-section__title--center">Where we are headed</h2>
          <div className="about-timeline">
            {milestones.map((item) => (
              <article key={item.title} className="about-timeline__item">
                <span className="about-timeline__year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-bottom-cta" aria-labelledby="about-cta-title">
        <PictureImg
          src="/images/cta-lake.jpg"
          alt=""
          className="page-bottom-cta__bg"
          loading="lazy"
          decoding="async"
        />
        <div className="page-bottom-cta__overlay" aria-hidden />
        <div className="container page-bottom-cta__inner">
          <p className="home-script page-bottom-cta__script" aria-hidden>
            Stronger Brighter Kinder Canada
          </p>
          <h2 id="about-cta-title">Questions about Kiddly?</h2>
          <p>We would love to hear from families, providers, and partners exploring childcare in Canada.</p>
          <Link to="/contact" className="btn btn--primary btn--lg">
            Get in touch <ArrowRight size={20} aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  )
}
