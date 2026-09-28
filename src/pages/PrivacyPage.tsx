import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './LegalPage.css'

const updated = 'September 28, 2026'

export function PrivacyPage() {
  useDocumentTitle(
    'Privacy Policy — Kiddly',
    'How Kiddly handles information in this childcare search prototype.',
  )

  return (
    <div className="legal-page">
      <header className="legal-hero">
        <div className="container legal-hero__inner">
          <span className="legal-hero__badge">Legal</span>
          <h1>Privacy Policy</h1>
          <p className="legal-hero__meta">Last updated: {updated}</p>
        </div>
      </header>

      <div className="legal-body">
        <div className="container legal-body__inner">
          <p className="legal-body__intro">
            This Privacy Policy describes how Kiddly (&quot;we&quot;, &quot;us&quot;) would handle
            personal information in a live product. <strong>This website is a demonstration prototype</strong>{' '}
            — forms do not submit to production systems, but the policy below reflects our intended
            approach for Canadian users.
          </p>

          <section className="legal-section">
            <h2>1. Information we collect</h2>
            <p>In a full Kiddly service, we may collect:</p>
            <ul>
              <li>
                <strong>Account &amp; contact details</strong> — name, email, phone, and role (parent,
                educator, or partner) when you register or contact us.
              </li>
              <li>
                <strong>Search &amp; profile activity</strong> — location queries, saved listings, and
                preferences to improve search results.
              </li>
              <li>
                <strong>Provider-submitted content</strong> — program descriptions, photos, hours, and
                licensing information you choose to publish.
              </li>
              <li>
                <strong>Technical data</strong> — device type, browser, and usage analytics to keep the
                platform secure and reliable.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>2. How we use information</h2>
            <ul>
              <li>Operate search, maps, and provider profiles.</li>
              <li>Respond to inquiries and support requests.</li>
              <li>Improve product design, accessibility, and performance.</li>
              <li>Comply with law and protect against fraud or abuse.</li>
            </ul>
            <p>We do not sell personal information to third parties for their marketing.</p>
          </section>

          <section className="legal-section">
            <h2>3. Sharing</h2>
            <p>We may share information with:</p>
            <ul>
              <li>Service providers (hosting, email, analytics) under contractual safeguards.</li>
              <li>Childcare providers when you choose to contact them through Kiddly.</li>
              <li>Authorities when required by law or to protect safety.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Cookies &amp; analytics</h2>
            <p>
              We may use cookies and similar technologies to remember preferences and understand how
              the site is used. You can control cookies through your browser settings. This prototype
              may use minimal or no third-party analytics.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Your rights (Canada)</h2>
            <p>
              Depending on your province or territory, you may have rights to access, correct, or
              delete personal information, or to withdraw consent. Contact us to make a request — we
              will respond within a reasonable time.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Children</h2>
            <p>
              Kiddly is directed at parents, guardians, and educators — not at children under 13 to
              create accounts. We do not knowingly collect personal information from children for
              account registration.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Contact</h2>
            <p>
              Privacy questions:{' '}
              <a href="mailto:kiddly.ca@gmail.com" className="text-link">kiddly.ca@gmail.com</a> or
              our <Link to="/contact" className="text-link">contact form</Link>.
            </p>
          </section>

          <div className="legal-body__footer">
            <Link to="/terms" className="text-link">
              Terms of Use <ArrowRight size={16} aria-hidden />
            </Link>
            <Link to="/contact" className="btn btn--teal">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
