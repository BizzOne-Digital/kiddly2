import { Link } from 'react-router-dom'
import { ArrowRight, Baby, Clock, Star } from 'lucide-react'
import type { ProviderResult } from '../../utils/filterProviders'
import {
  AGE_GROUP_LABELS,
  CARE_TYPE_LABELS,
} from '../../types/provider'
import { LicensingBadge, AvailabilityBadge } from '../providers/StatusBadges'
import { getSearchListingImage, getSearchListingRating } from '../../data/searchImages'
import './SearchResultRow.css'

interface SearchResultRowProps {
  provider: ProviderResult
  selected?: boolean
  saved?: boolean
  onSelect: () => void
  onToggleSave: () => void
}

export function SearchResultRow({
  provider,
  selected,
  onSelect,
}: SearchResultRowProps) {
  const { rating, reviews } = getSearchListingRating(provider.id)
  const ageMin = provider.ageGroups[0]
  const ageMax = provider.ageGroups[provider.ageGroups.length - 1]
  const ageLabel =
    ageMin && ageMax
      ? `Ages ${AGE_GROUP_LABELS[ageMin].toLowerCase()}–${AGE_GROUP_LABELS[ageMax].toLowerCase()}`
      : 'All ages'

  return (
    <article
      className={`search-card card${selected ? ' search-card--selected' : ''}`}
      onMouseEnter={onSelect}
      onFocus={onSelect}
    >
      <div className="search-card__grid">
        <img
          src={getSearchListingImage(provider.id)}
          alt=""
          className="search-card__thumb"
          loading="lazy"
        />
        <div className="search-card__main">
          <div className="search-card__head">
            <div>
              <h3>
                <Link to={`/providers/${provider.slug}`} onClick={(e) => e.stopPropagation()}>
                  {provider.name}
                </Link>
              </h3>
              <p className="search-card__rating">
                <Star size={14} fill="currentColor" aria-hidden />
                <span>{rating.toFixed(1)}</span>
                <span className="search-card__reviews">({reviews} reviews)</span>
              </p>
              <p className="search-card__type">{CARE_TYPE_LABELS[provider.careType]}</p>
              <p className="search-card__loc">
                {provider.areaLabel || `${provider.city}, ${provider.province}`}
                {provider.distance != null && ` · ${provider.distance.toFixed(1)} km`}
              </p>
            </div>
            <div className="search-card__badges">
              <LicensingBadge status={provider.licensing} />
              <AvailabilityBadge status={provider.availability} />
            </div>
          </div>
          <ul className="search-card__facts">
            <li>
              <Baby size={16} aria-hidden />
              {ageLabel}
            </li>
            <li>
              <Clock size={16} aria-hidden />
              {provider.hours.replace(/^Mon–Fri,\s*/i, '')}
            </li>
            <li>
              <span className="search-card__schedule" aria-hidden>◷</span>
              {provider.schedule.map((s) => s.replace('-', ' ')).join(', ')}
            </li>
          </ul>
          <Link
            to={`/providers/${provider.slug}`}
            className="btn btn--primary search-card__cta"
          >
            View Profile <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  )
}
