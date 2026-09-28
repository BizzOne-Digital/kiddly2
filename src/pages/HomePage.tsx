import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  Check,
  Heart,
  Leaf,
  List,
  MapPin,
  Search,
  Shield,
  Star,
  Users,
} from 'lucide-react'
import { HeroSearchForm } from '../components/search/HeroSearchForm'
import { FeaturedShowcaseCard } from '../components/home/FeaturedShowcaseCard'
import { HOME_FEATURED } from '../data/homeFeatured'
import { HOME_EXPLORE_CARDS } from '../data/homeExploreCards'
import { FAQ_ITEMS } from '../data/faq'
import { Accordion } from '../components/ui/Accordion'
import { PictureImg } from '../components/ui/PictureImg'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './HomePage.css'

const trustHero = [
  { icon: Shield, label: 'Licensed providers' },
  { icon: Check, label: 'Verified information' },
  { icon: Heart, label: 'Trusted by Canadian families' },
]

const howSteps = [
  {
    n: 1,
    title: 'Search',
    text: 'Enter your city or postal code and explore childcare near you.',
    icon: MapPin,
  },
  {
    n: 2,
    title: 'Compare',
    text: 'Review programs, hours, and availability side by side.',
    icon: List,
  },
  {
    n: 3,
    title: 'Connect',
    text: 'Reach out to providers when you are ready to take the next step.',
    icon: Heart,
  },
]

const growBenefits = [
  { icon: BarChart3, label: 'Increase visibility' },
  { icon: Users, label: 'Connect with local families' },
  { icon: Star, label: 'Showcase your program' },
]

const trustPillars = [
  {
    icon: Shield,
    title: 'Verified providers',
    text: 'Clear licensing labels and profile details — always confirm with the provider.',
  },
  {
    icon: Check,
    title: 'Up-to-date information',
    text: 'Hours, ages, and availability designed to stay current in a live product.',
  },
  {
    icon: Leaf,
    title: 'Built for Canada',
    text: 'Search tools and content tailored to Canadian families and educators.',
  },
]

function Stars({ rating }: { rating: number }) {
  return (
    <span className="home-stars" aria-label={`${rating} out of 5 stars`}>
      <Star size={14} fill="currentColor" aria-hidden />
      <span>{rating.toFixed(1)}</span>
    </span>
  )
}

export function HomePage() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.hash])

  useDocumentTitle(
    'Kiddly — Find childcare that fits your family',
    'Discover licensed childcare across Canada. Search, compare, and connect with providers near you.',
  )

  return (
    <div className="home">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero__scene" aria-hidden>
          <PictureImg
            src="/images/hero-home.jpg"
            alt=""
            className="home-hero__scene-img"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
          />
          <div className="home-hero__scene-fade" />
        </div>
        <div className="container home-hero__inner">
          <div className="home-hero__copy">
            <h1 id="home-hero-title">Find childcare that fits your family.</h1>
            <p className="home-hero__lead">
              Discover licensed childcare centres and family dayhomes across Canada. Search your
              area, compare options, and connect with providers you can trust.
            </p>
            <HeroSearchForm landing />
            <ul className="home-hero__trust">
              {trustHero.map((item) => (
                <li key={item.label}>
                  <item.icon size={18} strokeWidth={2.25} aria-hidden />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="home-audience" aria-label="For parents and educators">
        <div className="container">
          <div className="home-audience__panel">
            <p className="home-script home-audience__script" aria-hidden>
              A brighter tomorrow for every child
            </p>
            <div className="home-audience__grid">
              <article className="home-audience__card" id="for-parents">
                <div className="home-audience__icon" aria-hidden>
                  <Heart size={26} />
                </div>
                <h2>For Parents</h2>
                <p>
                  Search nearby licensed centres and family dayhomes, compare what matters, and contact
                  providers when you are ready.
                </p>
                <Link to="/for-parents" className="home-text-link">
                  Learn more <ArrowRight size={18} aria-hidden />
                </Link>
              </article>

              <article className="home-audience__card" id="for-educators">
                <div className="home-audience__icon" aria-hidden>
                  <Users size={26} />
                </div>
                <h2>For Educators</h2>
                <p>
                  Create or claim your profile, keep your program details current, and help families find
                  care that fits.
                </p>
                <Link to="/for-educators" className="home-text-link">
                  Learn more <ArrowRight size={18} aria-hidden />
                </Link>
              </article>

              <div className="home-audience__books" aria-hidden>
                <div className="home-audience__book-labels">
                  <span>Play</span>
                  <span>Grow</span>
                  <span>Belong</span>
                </div>
                <PictureImg
                  src="/images/books-stack.jpg"
                  alt=""
                  width={200}
                  height={200}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-explore section">
        <div className="container home-explore__grid">
          <div className="home-explore__copy">
            <h2>Explore childcare near you</h2>
            <p>
              Search a map of trusted providers, compare key details, and find childcare that fits
              your commute and routine.
            </p>
            <Link to="/search" className="btn btn--teal">
              Search Childcare <ArrowRight size={20} aria-hidden />
            </Link>
          </div>

          <div className="home-explore__map-wrap">
            <PictureImg
              src="/images/map-explore.jpg"
              alt=""
              className="home-explore__map"
              loading="lazy"
              decoding="async"
            />
            <p className="home-explore__bubble" aria-hidden>
              Great childcare builds brighter communities
            </p>
          </div>

          <div className="home-explore__cards">
            {HOME_EXPLORE_CARDS.map((card) => (
              <Link
                key={card.slug}
                to={`/providers/${card.slug}`}
                className="home-explore-card card"
              >
                <PictureImg src={card.image} alt="" className="home-explore-card__thumb" loading="lazy" />
                <div className="home-explore-card__body">
                  <h3>{card.name}</h3>
                  <Stars rating={card.rating} />
                  <p className="home-explore-card__meta">
                    {card.type} · {card.location}
                  </p>
                  <p className="home-explore-card__dist">{card.distance}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-how section section--mint">
        <div className="container home-how__layout">
          <div className="home-how__main">
            <h2 className="home-display-title">How Kiddly works</h2>
            <div className="home-how__steps">
              {howSteps.map((step) => (
                <article key={step.title} className="home-how-step">
                  <div className="home-how-step__icon" aria-hidden>
                    <step.icon size={28} />
                  </div>
                  <h3>
                    <span className="home-how-step__n">{step.n}.</span> {step.title}
                  </h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
          <p className="home-script home-how__script" aria-hidden>
            Small Steps Bright Futures
          </p>
        </div>
      </section>

      <section className="home-featured section">
        <div className="container">
          <div className="home-section-head">
            <h2 className="home-display-title">Featured providers</h2>
            <Link to="/search" className="home-text-link">
              View all providers <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          <div className="home-featured__grid">
            {HOME_FEATURED.map((card) => (
              <FeaturedShowcaseCard key={card.slug} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-grow section section--mint">
        <div className="container home-grow__grid">
          <div className="home-grow__visual">
            <PictureImg src="/images/grow-educators.jpg" alt="" loading="lazy" decoding="async" />
          </div>
          <div className="home-grow__content">
            <h2 className="home-display-title">Grow your impact with Kiddly</h2>
            <p className="home-grow__lead">
              Reach families searching in your area and showcase the care you provide with a profile
              built for Canadian childcare.
            </p>
            <Link to="/contact?topic=provider-profile" className="btn btn--primary btn--lg">
              Create or claim your profile <ArrowRight size={20} aria-hidden />
            </Link>
          </div>
          <ul className="home-grow__benefits">
            {growBenefits.map((b) => (
              <li key={b.label}>
                <span className="home-grow__benefit-icon" aria-hidden>
                  <b.icon size={22} />
                </span>
                {b.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-trust section">
        <div className="container home-trust__grid">
          <div>
            <h2 className="home-display-title">A safer, more trusted childcare community</h2>
            <div className="home-trust__cards">
              {trustPillars.map((item) => (
                <article key={item.title} className="home-trust-card">
                  <item.icon size={32} strokeWidth={2} aria-hidden />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="home-trust__aside">
            <PictureImg src="/images/trust-mountains.jpg" alt="" loading="lazy" decoding="async" />
            <p className="home-script home-trust__script" aria-hidden>
              Safe Supported Stronger Together
            </p>
          </div>
        </div>
      </section>

      <section className="home-faq section section--mint-soft">
        <div className="container home-faq__inner">
          <div className="home-section-head">
            <h2 className="home-display-title">Frequently asked questions</h2>
            <Link to="/faq" className="home-text-link">
              View all FAQs <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          <Accordion items={FAQ_ITEMS.slice(0, 3)} variant="faq" />
        </div>
      </section>

      <section className="home-final-cta" aria-labelledby="home-cta-title">
        <PictureImg src="/images/cta-lake.jpg" alt="" className="home-final-cta__bg" loading="lazy" decoding="async" />
        <div className="home-final-cta__overlay" aria-hidden />
        <div className="container home-final-cta__content">
          <p className="home-script home-final-cta__script" aria-hidden>
            Stronger Brighter Kinder Canada
          </p>
          <h2 id="home-cta-title">Ready to find the right childcare?</h2>
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
