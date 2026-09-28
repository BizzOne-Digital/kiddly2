import { Link } from 'react-router-dom'
import type { Provider } from '../../types/provider'
import { LicensingBadge, AvailabilityBadge } from './StatusBadges'
import './RelatedProviderMini.css'

interface RelatedProviderMiniProps {
  provider: Provider
  image: string
}

export function RelatedProviderMini({ provider, image }: RelatedProviderMiniProps) {
  return (
    <article className="related-mini card">
      <Link to={`/providers/${provider.slug}`} className="related-mini__link">
        <img src={image} alt="" loading="lazy" />
        <div>
          <h4>{provider.name}</h4>
          <p>{provider.city}, {provider.province}</p>
          <div className="related-mini__badges">
            <LicensingBadge status={provider.licensing} />
            <AvailabilityBadge status={provider.availability} />
          </div>
        </div>
      </Link>
    </article>
  )
}
