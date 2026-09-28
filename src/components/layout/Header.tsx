import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import { KiddlyLogo } from '../brand/KiddlyLogo'
import '../brand/KiddlyLogo.css'
import './Header.css'

const navItems = [
  { to: '/for-parents', label: 'For Parents' },
  { to: '/for-educators', label: 'For Educators' },
  { to: '/faq', label: 'Resources' },
  { to: '/about', label: 'About' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const close = () => setOpen(false)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <KiddlyLogo onClick={close} />

        <nav className={`site-header__nav${open ? ' is-open' : ''}`} aria-label="Main">
          <ul className="site-header__list" id="mobile-nav">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `site-header__link${isActive ? ' is-active' : ''}`
                  }
                  onClick={close}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="site-header__nav-auth">
              <Link to="/contact" className="site-header__link" onClick={close}>Log in</Link>
              <Link to="/contact" className="btn btn--teal site-header__signup" onClick={close}>
                Sign up
              </Link>
            </li>
          </ul>
        </nav>

        <div className="site-header__actions">
          <Link to="/search" className="site-header__search" aria-label="Search childcare" onClick={close}>
            <Search size={22} aria-hidden />
          </Link>
          <Link to="/contact" className="site-header__login" onClick={close}>Log in</Link>
          <Link to="/contact" className="btn btn--teal site-header__signup" onClick={close}>
            Sign up
          </Link>
          <button
            type="button"
            className="site-header__menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <button
          type="button"
          className="site-header__backdrop"
          aria-label="Close menu"
          onClick={close}
        />
      )}
    </header>
  )
}
