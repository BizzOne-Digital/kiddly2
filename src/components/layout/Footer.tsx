import { Link, NavLink } from 'react-router-dom'
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, Youtube } from 'lucide-react'
import { KiddlyLogo } from '../brand/KiddlyLogo'
import '../brand/KiddlyLogo.css'
import './Footer.css'

const parentsLinks = [
  { to: '/search', label: 'Find Childcare' },
  { to: '/for-parents', label: 'For Parents' },
  { to: '/faq', label: 'FAQ' },
]

const educatorsLinks = [
  { to: '/for-educators', label: 'For Educators' },
  { to: '/contact?topic=provider-profile', label: 'Claim your profile' },
]

const companyLinks = [
  { to: '/about', label: 'About' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Press' },
]

const supportLinks = [
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Use' },
]

const year = new Date().getFullYear()

function FooterNavLink({ to, label }: { to: string; label: string }) {
  if (to.includes('?')) {
    return (
      <Link to={to} className="site-footer__link">
        {label}
      </Link>
    )
  }
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `site-footer__link${isActive ? ' is-active' : ''}`}
    >
      {label}
    </NavLink>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__accent" aria-hidden />

      <div className="site-footer__cta">
        <div className="container site-footer__cta-inner">
          <div className="site-footer__cta-copy">
            <p className="site-footer__cta-script">A brighter tomorrow for every child</p>
            <h2 className="site-footer__cta-title">Ready to explore childcare near you?</h2>
            <p className="site-footer__cta-lead">
              Search sample listings, compare programs, and connect when you are ready.
            </p>
          </div>
          <div className="site-footer__cta-actions">
            <Link to="/search" className="btn btn--primary btn--lg">
              Search childcare <ArrowRight size={20} aria-hidden />
            </Link>
            <Link to="/contact" className="site-footer__cta-secondary">
              <Mail size={18} aria-hidden />
              Get in touch
            </Link>
          </div>
        </div>
      </div>

      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <KiddlyLogo className="site-footer__logo" />
          <p className="site-footer__tagline">
            Find childcare that fits your family — built for stronger Canadian communities.
          </p>
          <p className="site-footer__trust">
            Licensed &amp; private care labels · Map + list search · Demo prototype
          </p>
        </div>

        <div className="site-footer__columns">
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Parents</h3>
            <ul className="site-footer__list">
              {parentsLinks.map((item) => (
                <li key={item.label}>
                  <FooterNavLink to={item.to} label={item.label} />
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Educators</h3>
            <ul className="site-footer__list">
              {educatorsLinks.map((item) => (
                <li key={item.label}>
                  <FooterNavLink to={item.to} label={item.label} />
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Company</h3>
            <ul className="site-footer__list">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <FooterNavLink to={item.to} label={item.label} />
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Support</h3>
            <ul className="site-footer__list">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <FooterNavLink to={item.to} label={item.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__aside">
          <div className="site-footer__lang" aria-label="Language">
            <span className="site-footer__lang-active">EN</span>
            <span className="site-footer__lang-sep" aria-hidden>|</span>
            <button type="button" className="site-footer__lang-btn" disabled>FR</button>
          </div>
          <p className="site-footer__social-label">Follow Kiddly</p>
          <div className="site-footer__social">
            <a href="#" className="site-footer__social-btn" aria-label="Instagram (demo)">
              <Instagram size={20} aria-hidden />
            </a>
            <a href="#" className="site-footer__social-btn" aria-label="Facebook (demo)">
              <Facebook size={20} aria-hidden />
            </a>
            <a href="#" className="site-footer__social-btn" aria-label="LinkedIn (demo)">
              <Linkedin size={20} aria-hidden />
            </a>
            <a href="#" className="site-footer__social-btn" aria-label="YouTube (demo)">
              <Youtube size={20} aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer__bar">
        <div className="container site-footer__bar-inner">
          <p className="site-footer__copy">© {year} Kiddly. All rights reserved.</p>
          <div className="site-footer__bar-links">
            <Link to="/privacy" className="site-footer__bar-link">Privacy</Link>
            <Link to="/terms" className="site-footer__bar-link">Terms</Link>
          </div>
          <p className="site-footer__canada">
            Built for stronger Canadian communities
            <span className="site-footer__leaf" aria-hidden>🍁</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
