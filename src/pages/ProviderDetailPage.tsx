import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  Baby,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Heart,
  Link2,
  Mail,
  MapPin,
  Palette,
  Share2,
  Star,
  Sun,
  TreePine,
  Users,
} from 'lucide-react'
import { getProviderBySlug } from '../data/providers'
import { getProviderGallery } from '../data/providerGallery'
import { getProviderDetailExtras } from '../data/providerDetailExtras'
import { InquiryForm } from '../components/forms/InquiryForm'
import { Modal } from '../components/ui/Modal'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './ProviderDetailPage.css'

function StarRating({ value }: { value: number }) {
  return (
    <span className="provider-stars" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < Math.round(value) ? 'currentColor' : 'none'}
          aria-hidden
        />
      ))}
    </span>
  )
}

export function ProviderDetailPage() {
  const { slug } = useParams()
  const provider = slug ? getProviderBySlug(slug) : undefined
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  useDocumentTitle(
    provider ? `${provider.name} — Kiddly` : 'Provider not found — Kiddly',
    provider?.description,
  )

  if (!provider) {
    return (
      <div className="container provider-not-found">
        <h1>We couldn&apos;t find that profile</h1>
        <p>This listing may have moved. Browse search results to explore other providers.</p>
        <Link to="/search" className="btn btn--primary">Back to search</Link>
      </div>
    )
  }

  const gallery = getProviderGallery(provider.slug)
  const extras = getProviderDetailExtras(provider)
  const mainImage = gallery[galleryIndex] ?? gallery[0]
  const thumbSlice = gallery.slice(0, 4)
  const moreCount = Math.max(0, gallery.length - 4)

  function prevImage() {
    setGalleryIndex((i) => (i - 1 + gallery.length) % gallery.length)
  }

  function nextImage() {
    setGalleryIndex((i) => (i + 1) % gallery.length)
  }

  return (
    <div className="provider-page">
      <div className="provider-top-banner" role="presentation">
        <img src="/images/provider/banner-mountains.jpg" alt="" />
        <div className="container provider-top-banner__crumbs">
          <nav className="provider-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden>›</span>
            <Link to="/search">Childcare near you</Link>
            <span aria-hidden>›</span>
            <span aria-current="page">{provider.name}</span>
          </nav>
        </div>
      </div>

      <div className="container provider-hero">
        <div className="provider-hero__gallery card">
          <div className="provider-hero__main">
            <img src={mainImage} alt={`${provider.name} photo ${galleryIndex + 1}`} />
            <div className="provider-hero__badges">
              <span className="provider-badge provider-badge--licensed">
                <Check size={14} aria-hidden /> Licensed Provider
              </span>
              <span className="provider-badge provider-badge--spots">
                <span className="provider-badge__dot" aria-hidden /> Spots Available Now
              </span>
            </div>
            <button type="button" className="provider-hero__nav provider-hero__nav--prev" onClick={prevImage} aria-label="Previous photo">
              <ChevronLeft size={22} />
            </button>
            <button type="button" className="provider-hero__nav provider-hero__nav--next" onClick={nextImage} aria-label="Next photo">
              <ChevronRight size={22} />
            </button>
          </div>
          <div className="provider-hero__thumbs">
            {thumbSlice.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`provider-hero__thumb${galleryIndex === i ? ' is-active' : ''}`}
                onClick={() => setGalleryIndex(i)}
              >
                <img src={src} alt="" />
              </button>
            ))}
            {moreCount > 0 && (
              <button type="button" className="provider-hero__thumb provider-hero__thumb--more" onClick={() => setGalleryOpen(true)}>
                <img src={gallery[4] ?? gallery[0]} alt="" />
                <span>+{moreCount}</span>
              </button>
            )}
          </div>
        </div>

        <aside className="provider-summary card">
          <div className="provider-summary__head">
            <h1>{provider.name}</h1>
            <div className="provider-summary__actions">
              <button
                type="button"
                className={`provider-icon-btn${saved ? ' is-active' : ''}`}
                aria-label={saved ? 'Remove from favourites' : 'Save to favourites'}
                aria-pressed={saved}
                onClick={() => setSaved(!saved)}
              >
                <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
              </button>
              <button type="button" className="provider-icon-btn" aria-label="Share provider">
                <Share2 size={20} />
              </button>
            </div>
          </div>
          <p className="provider-summary__rating">
            <StarRating value={extras.displayRating} />
            <span>{extras.displayRating.toFixed(1)} ({extras.reviewCount} reviews)</span>
          </p>
          <p className="provider-summary__loc">
            <MapPin size={18} aria-hidden />
            {provider.city}, {provider.province} · {extras.distanceKm.toFixed(1)} km away
          </p>
          <p className="provider-summary__desc">{provider.description}</p>
          <div className="provider-summary__pills">
            <span><Check size={14} /> Licensed Provider</span>
            <span><span className="provider-badge__dot" /> Spots Available Now</span>
          </div>
          <button type="button" className="btn btn--primary provider-summary__cta" onClick={() => setContactOpen(true)}>
            Contact Provider <ArrowRight size={20} aria-hidden />
          </button>
          <button
            type="button"
            className="provider-summary__save"
            onClick={() => setSaved(!saved)}
          >
            <Heart size={18} fill={saved ? 'currentColor' : 'none'} aria-hidden />
            Save to Favourites
          </button>
        </aside>
      </div>

      <div className="provider-facts">
        <div className="container provider-facts__grid">
          <article>
            <Baby size={22} aria-hidden />
            <h3>Age groups</h3>
            <p>{extras.ageRangeLabel}</p>
          </article>
          <article>
            <Clock size={22} aria-hidden />
            <h3>Hours</h3>
            <p>{extras.hoursDetail}</p>
          </article>
          <article>
            <Users size={22} aria-hidden />
            <h3>Care type</h3>
            <p>{extras.careTypeDetail}</p>
          </article>
          <article>
            <Check size={22} aria-hidden />
            <h3>Availability</h3>
            <p>{extras.availabilityDetail}</p>
          </article>
          <article>
            <DollarSign size={22} aria-hidden />
            <h3>Fees</h3>
            <p>{extras.feesLabel}</p>
          </article>
        </div>
      </div>

      <div className="container provider-layout">
        <div className="provider-layout__main">
          <section className="provider-section">
            <h2>About {provider.name}</h2>
            <div className="provider-about">
              <div>
                <p>{provider.about}</p>
                <p>{provider.description}</p>
              </div>
              <div className="provider-about__art" aria-hidden>
                <img src="/images/trust-mountains.jpg" alt="" />
                <p className="provider-about__script">A brighter tomorrow for every child</p>
              </div>
            </div>
          </section>

          <section className="provider-section">
            <h2>Programs &amp; age groups</h2>
            <div className="provider-programs">
              <article className="provider-program provider-program--teal">
                <BookOpen size={28} aria-hidden />
                <h3>Infant Program</h3>
                <p>Gentle routines, sensory play, and secure attachment in small groups.</p>
              </article>
              <article className="provider-program provider-program--orange">
                <Palette size={28} aria-hidden />
                <h3>Toddler Program</h3>
                <p>Language-rich play, outdoor exploration, and social skill building.</p>
              </article>
              <article className="provider-program provider-program--yellow">
                <Sun size={28} aria-hidden />
                <h3>Preschool Program</h3>
                <p>Kindergarten readiness through art, music, and cooperative learning.</p>
              </article>
            </div>
          </section>

          <section className="provider-section">
            <h2>Current availability</h2>
            <ul className="provider-availability">
              {extras.availabilityRows.map((row) => (
                <li key={row.label}>
                  <span>{row.label}</span>
                  <span className={`provider-availability__status provider-availability__status--${row.tone}`}>
                    <span className="provider-badge__dot" aria-hidden />
                    {row.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="provider-section">
            <h2>Hours of operation</h2>
            <ul className="provider-hours">
              {extras.weekHours.map((row) => (
                <li key={row.day}>
                  <span>{row.day}</span>
                  <span>{row.hours}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="provider-section">
            <h2>Amenities</h2>
            <ul className="provider-amenities">
              {extras.amenities.map((item) => (
                <li key={item}>
                  <TreePine size={18} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="provider-section">
            <h2>Safety &amp; licensing</h2>
            <div className="provider-safety">
              <article>
                <Check size={32} aria-hidden />
                <h3>Licensed by the Province of BC</h3>
                <p>Licence {extras.licenseNumber} (sample).</p>
              </article>
              <article>
                <Check size={32} aria-hidden />
                <h3>Up-to-date inspections</h3>
                <p>Last inspected: {extras.lastInspection}.</p>
              </article>
              <article>
                <Check size={32} aria-hidden />
                <h3>First aid certified staff</h3>
                <p>Educators maintain current certification (sample).</p>
              </article>
            </div>
          </section>

          <section className="provider-section">
            <h2>Location</h2>
            <p className="provider-address">{extras.address}</p>
            <a
              href={`https://www.openstreetmap.org/?mlat=${provider.lat}&mlon=${provider.lng}#map=14/${provider.lat}/${provider.lng}`}
              className="provider-directions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions <ArrowRight size={18} aria-hidden />
            </a>
            <img
              src="/images/provider/map-illustration.jpg"
              alt=""
              className="provider-map-illus"
              loading="lazy"
            />
          </section>

          <section className="provider-section">
            <div className="provider-section__head">
              <h2>Photo gallery</h2>
              <button type="button" className="provider-text-btn" onClick={() => setGalleryOpen(true)}>
                View all photos <ArrowRight size={16} />
              </button>
            </div>
            <div className="provider-gallery-row">
              {gallery.map((src) => (
                <button key={src} type="button" onClick={() => setGalleryOpen(true)}>
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </section>

          <section className="provider-section">
            <div className="provider-section__head">
              <h2>Reviews from families</h2>
              <span className="provider-text-btn">View all {extras.reviewCount} reviews</span>
            </div>
            <div className="provider-reviews">
              {extras.reviews.map((review) => (
                <article key={review.id} className="provider-review card">
                  <StarRating value={review.rating} />
                  <p className="provider-review__date">{review.date}</p>
                  <p>{review.text}</p>
                  <p className="provider-review__author">— {review.author}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="provider-layout__side">
          <div className="provider-contact card">
            <h2>Interested in this provider?</h2>
            <InquiryForm providerName={provider.name} variant="profile" />
          </div>

          <div className="provider-why card">
            <h2>Why families choose {provider.name}</h2>
            <ul>
              {extras.whyChoose.map((item) => (
                <li key={item}>
                  <Check size={18} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="provider-share card">
            <h2>Share this provider</h2>
            <div className="provider-share__icons">
              <button type="button" aria-label="Copy link"><Link2 size={20} /></button>
              <button type="button" aria-label="Email"><Mail size={20} /></button>
              <button type="button" aria-label="Facebook">f</button>
              <button type="button" aria-label="WhatsApp">WA</button>
            </div>
          </div>
        </aside>
      </div>

      <section className="provider-bottom-cta" aria-labelledby="provider-cta-title">
        <img src="/images/cta-lake.jpg" alt="" />
        <div className="provider-bottom-cta__overlay" aria-hidden />
        <div className="container provider-bottom-cta__inner">
          <h2 id="provider-cta-title">Ready to find the right childcare?</h2>
          <p>Join thousands of Canadian families using Kiddly to search, compare, and connect.</p>
          <Link to="/search" className="btn btn--primary btn--lg">
            Search Childcare
          </Link>
        </div>
      </section>

      <div className="provider-mobile-bar">
        <button type="button" className="btn btn--primary" onClick={() => setContactOpen(true)}>
          Contact Provider
        </button>
      </div>

      {contactOpen && (
        <Modal title={`Contact ${provider.name}`} onClose={() => setContactOpen(false)}>
          <InquiryForm providerName={provider.name} variant="profile" onSuccess={() => setContactOpen(false)} />
        </Modal>
      )}

      {galleryOpen && (
        <Modal title="Photo gallery" onClose={() => setGalleryOpen(false)}>
          <div className="provider-gallery-modal">
            {gallery.map((src) => (
              <img key={src} src={src} alt="" />
            ))}
          </div>
        </Modal>
      )}
    </div>
  )
}
