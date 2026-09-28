import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './NotFoundPage.css'

export function NotFoundPage() {
  useDocumentTitle('Page not found — Kiddly')

  return (
    <div className="not-found">
      <section className="not-found__hero">
        <img src="/images/trust-mountains.jpg" alt="" />
        <div className="container not-found__inner">
          <h1>Page not found</h1>
          <p>That route isn&apos;t part of this site yet. Head home or search for childcare near you.</p>
          <div className="not-found__actions">
            <Link to="/" className="btn btn--secondary">Home</Link>
            <Link to="/search" className="btn btn--primary">
              <Search size={18} aria-hidden />
              Search Childcare
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
