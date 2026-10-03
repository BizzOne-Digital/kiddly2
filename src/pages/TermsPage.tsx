import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './LegalPage.css'

const updated = 'September 28, 2026'

export function TermsPage() {
  useDocumentTitle(
    'Terms of Use — Kiddly',
    'Terms governing use of the Kiddly childcare search prototype.',
  )

  return (
    <div className="legal-page">
      <header className="legal-hero">
        <div className="container legal-hero__inner">
          <span className="legal-hero__badge">Legal</span>
          <h1>Terms of Use</h1>
          <p className="legal-hero__meta">Last updated: {updated}</p>
        </div>
      </header>

      <div className="legal-body">
        <div className="container legal-body__inner">
          <p className="legal-body__intro">
            These Terms of Use (&quot;Terms&quot;) apply to your access to the Kiddly website and
            demonstration features. <strong>This is a prototype</strong> with sample listings and demo
            forms — not a live booking or verification service. By using the site, you agree to these
            Terms.
          </p>

          <section className="legal-section">
            <h2>1. The service</h2>
            <p>
              Kiddly helps families discover childcare options and helps educators present their
              programs. In this preview, data may be fictional or outdated. Always confirm licensing,
              availability, and pricing directly with providers.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Eligibility</h2>
            <p>
              You must be at least 18 years old (or the age of majority in your province or territory)
              to use account features. Parents and guardians may use search tools on behalf of their
              families.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Accounts &amp; accuracy</h2>
            <p>
              If you create an account or submit a provider profile, you agree to provide accurate
              information and keep it updated. Educators are responsible for the content they publish,
              including photos and program claims.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Misrepresent licensing status or impersonate another person or business.</li>
              <li>Scrape, reverse engineer, or overload the platform without permission.</li>
              <li>Post unlawful, harassing, or misleading content.</li>
              <li>Use the service for spam or unauthorized marketing.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. No professional advice</h2>
            <p>
              Kiddly does not provide legal, medical, or childcare licensing advice. Listings and
              labels are informational only. Hiring or enrolling with a provider is your decision.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Intellectual property</h2>
            <p>
              Kiddly branding, design, and site content are owned by Kiddly or its licensors. You may
              not copy or redistribute materials except as allowed by law or with written permission.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Disclaimer &amp; limitation of liability</h2>
            <p>
              The site is provided &quot;as is&quot; without warranties. To the fullest extent
              permitted by law, Kiddly is not liable for indirect or consequential damages arising from
              use of the prototype or reliance on sample listings.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Changes</h2>
            <p>
              We may update these Terms or the site at any time. Continued use after changes means you
              accept the updated Terms. Material changes will be reflected by the &quot;Last
              updated&quot; date above.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Contact</h2>
            <p>
              Questions about these Terms:{' '}
              <Link to="/contact" className="text-link">contact us</Link>.
            </p>
          </section>

          <div className="legal-body__footer">
            <Link to="/privacy" className="text-link">
              Privacy Policy <ArrowRight size={16} aria-hidden />
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
