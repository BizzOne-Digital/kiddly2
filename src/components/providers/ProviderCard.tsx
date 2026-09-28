import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Provider } from '../../types/provider'
import { CARE_TYPE_LABELS, AGE_GROUP_LABELS } from '../../types/provider'
import { LicensingBadge, AvailabilityBadge } from './StatusBadges'
import { ProviderImage } from './ProviderImage'
import './ProviderCard.css'

interface ProviderCardProps {
  provider: Provider
  distance?: number | null
  highlighted?: boolean
  onHover?: () => void
  onLeave?: () => void
  compact?: boolean
}

export function ProviderCard({
  provider,
  distance,
  highlighted,
  onHover,
  onLeave,
  compact,
}: ProviderCardProps) {
  return (
    <motion.article
      layout
      className={`provider-card card ${highlighted ? 'provider-card--highlighted' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/providers/${provider.slug}`} className="provider-card__link">
        {!compact && (
          <ProviderImage src={provider.imageUrl} alt="" className="provider-card__image" />
        )}
        <div className="provider-card__body">
          <div className="provider-card__badges">
            <LicensingBadge status={provider.licensing} />
            <AvailabilityBadge status={provider.availability} />
          </div>
          <h3 className="provider-card__title">{provider.name}</h3>
          <p className="provider-card__type">{CARE_TYPE_LABELS[provider.careType]}</p>
          <p className="provider-card__desc">{provider.tagline}</p>
          <div className="provider-card__meta">
            <MapPin size={16} aria-hidden />
            <span>
              {provider.areaLabel}
              {distance != null && ` · ~${distance.toFixed(1)} km`}
            </span>
          </div>
          <p className="provider-card__ages">
            Ages:{' '}
            {provider.ageGroups.map((a) => AGE_GROUP_LABELS[a]).join(', ')}
          </p>
          <p className="provider-card__price">{provider.pricingNote}</p>
        </div>
      </Link>
    </motion.article>
  )
}
