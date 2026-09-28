import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Heart, Mail, Search, Sprout } from 'lucide-react'
import { Accordion } from '../components/ui/Accordion'
import { FAQ_EDUCATORS, FAQ_PARENTS } from '../data/faqPageData'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './FAQPage.css'

const EDUCATOR_CHECKLIST = [
  'Find trusted childcare providers',
  'Compare programs and availability',
  'Review provider details',
  'Connect with providers directly',
  'Be part of a stronger community',
]

export function FAQPage() {
  useDocumentTitle(
    'FAQ — Kiddly',
    'Answers for parents and educators about finding childcare on Kiddly.',
  )
  const [query, setQuery] = useState('')

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="faq-hero__bg" role="presentation" />
        <div className="faq-hero__wash" aria-hidden />
        <p className="faq-hero__script" aria-hidden>Small Steps Bright Futures</p>
        <div className="container faq-hero__inner">
          <h1>Frequently Asked Questions</h1>
          <p>Answers to help you find the right care with confidence.</p>
          <label className="faq-search">
            <Search size={22} aria-hidden />
            <input
              type="search"
              placeholder="Search FAQs…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search FAQ"
            />
          </label>
        </div>
      </section>

      <section className="faq-section container" id="for-parents">
        <header className="faq-section__head">
          <span className="faq-section__icon">
            <Heart size={22} aria-hidden />
          </span>
          <div>
            <h2>For Parents</h2>
            <p>
              Find answers to common questions about finding, comparing, and connecting with
              childcare providers on Kiddly.
            </p>
          </div>
        </header>
        <div className="faq-section__grid">
          <Accordion
            items={FAQ_PARENTS}
            filter={query}
            defaultOpenId="parent-1"
            variant="faq"
          />
          <aside className="faq-aside faq-aside--books" aria-label="Decorative">
            <p className="faq-aside__note">A brighter tomorrow starts with quality care</p>
            <img src="/images/books-stack.jpg" alt="" loading="lazy" />
            <div className="faq-aside__blocks">
              <span>Play</span>
              <span>Grow</span>
              <span>Belong</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="faq-section container" id="for-educators">
        <header className="faq-section__head">
          <span className="faq-section__icon">
            <Sprout size={22} aria-hidden />
          </span>
          <div>
            <h2>For Educators</h2>
            <p>
              Get answers about listing your program, managing your profile, and connecting with
              families on Kiddly.
            </p>
          </div>
        </header>
        <div className="faq-section__grid">
          <Accordion
            items={FAQ_EDUCATORS}
            filter={query}
            defaultOpenId="educator-1"
            variant="faq"
          />
          <aside className="faq-aside faq-aside--educator card">
            <p className="faq-aside__floating">Local care, brighter futures</p>
            <img
              src="/images/trust-mountains.jpg"
              alt=""
              className="faq-aside__scape"
              loading="lazy"
            />
            <ul className="faq-checklist">
              {EDUCATOR_CHECKLIST.map((line) => (
                <li key={line}>
                  <Check size={18} aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="faq-cta">
        <div className="container faq-cta__inner">
          <div className="faq-cta__icon">
            <Mail size={26} aria-hidden />
          </div>
          <div className="faq-cta__copy">
            <h2>Still have questions?</h2>
            <p>
              We&apos;re here to help. Reach out to our team and we&apos;ll get back to you as soon
              as possible (demo contact form).
            </p>
          </div>
          <Link to="/contact" className="btn btn--primary faq-cta__btn">
            Contact us <ArrowRight size={20} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="page-bottom-cta" aria-labelledby="faq-bottom-cta">
        <img src="/images/search/cta-lake.jpg" alt="" className="page-bottom-cta__bg" />
        <div className="page-bottom-cta__overlay" aria-hidden />
        <div className="container page-bottom-cta__inner">
          <p className="page-bottom-cta__script" aria-hidden>Stronger Brighter Kinder Canada</p>
          <h2 id="faq-bottom-cta">Ready to find the right childcare?</h2>
          <p>Search licensed providers near you and compare options on the map.</p>
          <Link to="/search" className="btn btn--primary btn--lg">Search Childcare</Link>
        </div>
      </section>
    </div>
  )
}
