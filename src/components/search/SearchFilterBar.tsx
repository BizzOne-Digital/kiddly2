import { Calendar, Home, Settings, Shield } from 'lucide-react'
import type { SearchFilters } from '../../types/provider'
import './SearchFilterBar.css'

interface SearchFilterBarProps {
  filters: SearchFilters
  onChange: (f: SearchFilters) => void
  onMoreFilters: () => void
}

export function SearchFilterBar({ filters, onChange, onMoreFilters }: SearchFilterBarProps) {
  const set = (partial: Partial<SearchFilters>) => onChange({ ...filters, ...partial })

  const licensedOn = filters.licensing === 'licensed'
  const privateOn = filters.licensing === 'private'
  const spotsOn = filters.availability === 'spots-now'
  const futureOn = filters.availability === 'upcoming'

  function toggleLicensed() {
    if (licensedOn) set({ licensing: 'all' })
    else set({ licensing: 'licensed' })
  }

  function togglePrivate() {
    if (privateOn) set({ licensing: 'all' })
    else set({ licensing: 'private' })
  }

  function toggleSpots() {
    if (spotsOn) set({ availability: 'all' })
    else set({ availability: 'spots-now' })
  }

  function toggleFuture() {
    if (futureOn) set({ availability: 'all' })
    else set({ availability: 'upcoming' })
  }

  return (
    <div className="search-filter-bar">
      <button
        type="button"
        className={`search-filter-chip${licensedOn ? ' is-on' : ''}`}
        onClick={toggleLicensed}
        aria-pressed={licensedOn}
      >
        <Shield size={16} aria-hidden /> Licensed
      </button>
      <button
        type="button"
        className={`search-filter-chip search-filter-chip--orange${privateOn ? ' is-on' : ''}`}
        onClick={togglePrivate}
        aria-pressed={privateOn}
      >
        <Home size={16} aria-hidden /> Private Care
      </button>
      <button
        type="button"
        className={`search-filter-chip search-filter-chip--green${spotsOn ? ' is-on' : ''}`}
        onClick={toggleSpots}
        aria-pressed={spotsOn}
      >
        <span className="search-filter-chip__dot" aria-hidden /> Spots available now
      </button>
      <button
        type="button"
        className={`search-filter-chip search-filter-chip--calendar${futureOn ? ' is-on' : ''}`}
        onClick={toggleFuture}
        aria-pressed={futureOn}
      >
        <Calendar size={16} aria-hidden /> Future availability
      </button>

      <label className="search-filter-select">
        <span className="sr-only">Age group</span>
        <select
          value={filters.ageGroups[0] ?? ''}
          onChange={(e) => {
            const v = e.target.value
            set({ ageGroups: v ? [v as SearchFilters['ageGroups'][0]] : [] })
          }}
          aria-label="Age group"
        >
          <option value="">Age Group · All ages</option>
          <option value="infant">Infant</option>
          <option value="toddler">Toddler</option>
          <option value="preschool">Preschool</option>
          <option value="kindergarten">Kindergarten+</option>
        </select>
      </label>

      <label className="search-filter-select">
        <span className="sr-only">Distance</span>
        <select
          value={filters.distanceKm}
          onChange={(e) => set({ distanceKm: Number(e.target.value) })}
          aria-label="Distance"
        >
          {[10, 15, 25, 50, 100].map((d) => (
            <option key={d} value={d}>
              Distance · Within {d} km
            </option>
          ))}
        </select>
      </label>

      <label className="search-filter-select">
        <span className="sr-only">Hours</span>
        <select aria-label="Hours" defaultValue="">
          <option value="">Hours · Any hours</option>
          <option value="early">Before 8 AM</option>
          <option value="late">After 5 PM</option>
        </select>
      </label>

      <label className="search-filter-select">
        <span className="sr-only">Program type</span>
        <select
          value={filters.careTypes[0] ?? ''}
          onChange={(e) => {
            const v = e.target.value
            set({ careTypes: v ? [v as SearchFilters['careTypes'][0]] : [] })
          }}
          aria-label="Program type"
        >
          <option value="">Program Type · All programs</option>
          <option value="childcare-centre">Childcare centre</option>
          <option value="family-dayhome">Family dayhome</option>
          <option value="preschool">Preschool</option>
          <option value="before-after-school">Before & after school</option>
        </select>
      </label>

      <button type="button" className="search-filter-more" onClick={onMoreFilters}>
        <Settings size={16} aria-hidden /> More Filters
      </button>
    </div>
  )
}
