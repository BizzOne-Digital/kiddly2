import { Link, NavLink } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
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
  { to: '/contact', label: 'About' },
  { to: '/contact', label: 'Careers' },
  { to: '/contact', label: 'Press' },
]

const supportLinks = [
  { to: '/contact', label: 'Contact' },
  { to: '/contact', label: 'Privacy Policy' },
  { to: '/contact', label: 'Terms of Use' },
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
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <KiddlyLogo variant="light" className="site-footer__logo-wrap" />
          <p className="site-footer__tagline">
            Find childcare that fits your family — built for stronger Canadian communities.
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
          <div className="site-footer__social">
            <a href="#" className="site-footer__social-btn" aria-label="Instagram (demo)">
              <Instagram size={18} aria-hidden />
            </a>
            <a href="#" className="site-footer__social-btn" aria-label="Facebook (demo)">
              <Facebook size={18} aria-hidden />
            </a>
            <a href="#" className="site-footer__social-btn" aria-label="LinkedIn (demo)">
              <Linkedin size={18} aria-hidden />
            </a>
            <a href="#" className="site-footer__social-btn" aria-label="YouTube (demo)">
              <Youtube size={18} aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer__bar">
        <div className="container site-footer__bar-inner">
          <p className="site-footer__copy">© {year} Kiddly. All rights reserved.</p>
          <p className="site-footer__canada">
            Built for stronger Canadian communities
            <span className="site-footer__leaf" aria-hidden>🍁</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
