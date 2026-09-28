import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, MapPin, Search } from 'lucide-react'
import { filtersToSearchParams, DEFAULT_FILTERS } from '../../utils/searchParams'
import type { AgeGroup } from '../../types/provider'
import { AGE_GROUP_LABELS } from '../../types/provider'
import './HeroSearchForm.css'

const AGE_OPTIONS: AgeGroup[] = ['infant', 'toddler', 'preschool', 'kindergarten']

interface HeroSearchFormProps {
  compact?: boolean
  landing?: boolean
  initialQ?: string
  initialChildAge?: string
}

export function HeroSearchForm({
  compact,
  landing,
  initialQ = '',
  initialChildAge = '',
}: HeroSearchFormProps) {
  const navigate = useNavigate()
  const [q, setQ] = useState(initialQ)
  const [childAge, setChildAge] = useState(initialChildAge)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const params = filtersToSearchParams({ ...DEFAULT_FILTERS, q }, 'distance', childAge)
    navigate(`/search?${params.toString()}`)
  }

  if (landing) {
    return (
      <form className="hero-search hero-search--landing" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="hero-location">City or postal code</label>
        <div className="hero-search__pill">
          <MapPin className="hero-search__pin" size={22} aria-hidden />
          <span className="hero-search__divider" aria-hidden />
          <input
            id="hero-location"
            type="text"
            name="q"
            placeholder="Enter city or postal code"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="postal-code"
          />
          <button type="submit" className="hero-search__pill-btn">
            Search Childcare
            <ArrowRight size={20} aria-hidden />
          </button>
        </div>
      </form>
    )
  }

  return (
    <form className={`hero-search ${compact ? 'hero-search--compact' : ''}`} onSubmit={onSubmit}>
      <div className="hero-search__fields">
        <label className="hero-search__field">
          <span className="hero-search__label">City or postal code</span>
          <input
            type="text"
            name="q"
            placeholder="e.g. Calgary or T2P 1J9"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="postal-code"
          />
        </label>
        <label className="hero-search__field">
          <span className="hero-search__label">Child age (optional)</span>
          <select
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            aria-label="Child age group"
          >
            <option value="">Any age</option>
            {AGE_OPTIONS.map((a) => (
              <option key={a} value={a}>
                {AGE_GROUP_LABELS[a]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="btn btn--primary hero-search__submit">
        <Search size={20} aria-hidden />
        Search Childcare
      </button>
    </form>
  )
}
