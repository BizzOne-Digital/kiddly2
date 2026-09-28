import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import type { HomeFeaturedCard } from '../../data/homeFeatured'
import { PictureImg } from '../ui/PictureImg'
import './FeaturedShowcaseCard.css'

export function FeaturedShowcaseCard({ card }: { card: HomeFeaturedCard }) {
  return (
    <article className="showcase-card card">
      <Link to={`/providers/${card.slug}`} className="showcase-card__link">
        <div className="showcase-card__media">
          <PictureImg src={card.image} alt="" className="showcase-card__img" loading="lazy" decoding="async" />
          <button
            type="button"
            className="showcase-card__save"
            aria-label={`Save ${card.name}`}
            onClick={(e) => e.preventDefault()}
          >
            <Heart size={18} aria-hidden />
          </button>
        </div>
        <div className="showcase-card__body">
          <h3>{card.name}</h3>
          <p className="showcase-card__rating">
            <Star size={14} fill="currentColor" aria-hidden />
            <span>{card.rating.toFixed(1)}</span>
          </p>
          <p className="showcase-card__type">{card.type}</p>
          <p className="showcase-card__loc">{card.location}</p>
        </div>
      </Link>
    </article>
  )
}
