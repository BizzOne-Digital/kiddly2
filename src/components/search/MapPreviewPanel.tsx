import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Clock, MapPin, Shield, Users } from 'lucide-react'
import type { ProviderResult } from '../../utils/filterProviders'
import { getSearchListingImage } from '../../data/searchImages'
import { AGE_GROUP_LABELS, CARE_TYPE_LABELS } from '../../types/provider'
import { LicensingBadge, AvailabilityBadge } from '../providers/StatusBadges'
import './MapPreviewPanel.css'

interface MapPreviewPanelProps {
  provider: ProviderResult | null
}

export function MapPreviewPanel({ provider }: MapPreviewPanelProps) {
  if (!provider) {
    return (
      <div className="map-preview card">
        <p>Select a listing on the map or list to preview details here.</p>
      </div>
    )
  }

  const ages = provider.ageGroups.map((a) => AGE_GROUP_LABELS[a]).join(', ')

  return (
    <article className="map-preview card">
      <img
        src={getSearchListingImage(provider.id)}
        alt=""
        className="map-preview__img"
        loading="lazy"
      />
      <div className="map-preview__body">
        <div className="map-preview__badges">
          <LicensingBadge status={provider.licensing} />
          <AvailabilityBadge status={provider.availability} />
        </div>
        <h3>{provider.name}</h3>
        <p className="map-preview__loc">
          <MapPin size={16} aria-hidden />
          {provider.areaLabel}
          {provider.distance != null && ` · ~${provider.distance.toFixed(1)} km`}
        </p>
        <p className="map-preview__sample">Sample listing — confirm details with provider</p>
        <div className="map-preview__actions">
          <Link to={`/providers/${provider.slug}`} className="btn btn--primary">
            View details <ArrowRight size={18} aria-hidden />
          </Link>
          <a
            href={`https://www.openstreetmap.org/?mlat=${provider.lat}&mlon=${provider.lng}#map=14/${provider.lat}/${provider.lng}`}
            className="btn btn--secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={18} aria-hidden />
            Get directions
          </a>
        </div>
        <ul className="map-preview__facts">
          <li><Users size={18} aria-hidden /> {ages}</li>
          <li><Clock size={18} aria-hidden /> {CARE_TYPE_LABELS[provider.careType]}</li>
          <li><Calendar size={18} aria-hidden /> {provider.availability.replace('-', ' ')}</li>
          <li><Shield size={18} aria-hidden /> {provider.licensing === 'licensed' ? 'Licensed (sample)' : 'Private care (sample)'}</li>
        </ul>
        <p className="map-preview__about">{provider.description}</p>
      </div>
    </article>
  )
}
