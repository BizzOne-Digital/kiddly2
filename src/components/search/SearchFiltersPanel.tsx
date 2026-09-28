import type { SearchFilters, AgeGroup, CareType, ScheduleType } from '../../types/provider'
import {
  AGE_GROUP_LABELS,
  CARE_TYPE_LABELS,
} from '../../types/provider'
import './SearchFiltersPanel.css'

const AGE_OPTIONS: AgeGroup[] = ['infant', 'toddler', 'preschool', 'kindergarten']
const CARE_OPTIONS: CareType[] = [
  'childcare-centre',
  'family-dayhome',
  'preschool',
  'before-after-school',
]
const SCHEDULE_OPTIONS: ScheduleType[] = ['full-time', 'part-time', 'flexible']
const LANGUAGE_OPTIONS = ['English', 'French', 'Punjabi', 'Mandarin', 'Cantonese']
const AMENITY_OPTIONS = ['Outdoor play yard', 'Meals provided', 'Subsidy-friendly']

interface SearchFiltersPanelProps {
  filters: SearchFilters
  onChange: (next: SearchFilters) => void
  id?: string
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export function SearchFiltersPanel({ filters, onChange, id }: SearchFiltersPanelProps) {
  const set = (partial: Partial<SearchFilters>) => onChange({ ...filters, ...partial })

  return (
    <div className="search-filters" id={id}>
      <label className="search-filters__group">
        <span>Distance (km)</span>
        <select
          value={filters.distanceKm}
          onChange={(e) => set({ distanceKm: Number(e.target.value) })}
        >
          {[10, 15, 25, 50, 100].map((d) => (
            <option key={d} value={d}>{d} km</option>
          ))}
        </select>
      </label>

      <fieldset className="search-filters__fieldset">
        <legend>Child age group</legend>
        {AGE_OPTIONS.map((a) => (
          <label key={a} className="search-filters__check">
            <input
              type="checkbox"
              checked={filters.ageGroups.includes(a)}
              onChange={() => set({ ageGroups: toggle(filters.ageGroups, a) })}
            />
            {AGE_GROUP_LABELS[a]}
          </label>
        ))}
      </fieldset>

      <fieldset className="search-filters__fieldset">
        <legend>Program / care type</legend>
        {CARE_OPTIONS.map((c) => (
          <label key={c} className="search-filters__check">
            <input
              type="checkbox"
              checked={filters.careTypes.includes(c)}
              onChange={() => set({ careTypes: toggle(filters.careTypes, c) })}
            />
            {CARE_TYPE_LABELS[c]}
          </label>
        ))}
      </fieldset>

      <label className="search-filters__group">
        <span>Licensing</span>
        <select
          value={filters.licensing}
          onChange={(e) =>
            set({ licensing: e.target.value as SearchFilters['licensing'] })
          }
        >
          <option value="all">All</option>
          <option value="licensed">Licensed</option>
          <option value="private">Private / unlicensed</option>
        </select>
      </label>

      <label className="search-filters__group">
        <span>Availability</span>
        <select
          value={filters.availability}
          onChange={(e) =>
            set({ availability: e.target.value as SearchFilters['availability'] })
          }
        >
          <option value="all">All</option>
          <option value="spots-now">Spots now</option>
          <option value="upcoming">Upcoming</option>
          <option value="waitlist">Waitlist</option>
        </select>
      </label>

      <label className="search-filters__group">
        <span>Preferred start date</span>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => set({ startDate: e.target.value })}
        />
      </label>

      <fieldset className="search-filters__fieldset">
        <legend>Schedule</legend>
        {SCHEDULE_OPTIONS.map((s) => (
          <label key={s} className="search-filters__check">
            <input
              type="checkbox"
              checked={filters.schedule.includes(s)}
              onChange={() => set({ schedule: toggle(filters.schedule, s) })}
            />
            {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
          </label>
        ))}
      </fieldset>

      <label className="search-filters__group">
        <span>Subsidy acceptance</span>
        <select
          value={filters.subsidy === null ? 'any' : filters.subsidy ? 'yes' : 'no'}
          onChange={(e) => {
            const v = e.target.value
            set({ subsidy: v === 'any' ? null : v === 'yes' })
          }}
        >
          <option value="any">Any</option>
          <option value="yes">Accepts subsidy</option>
          <option value="no">Does not list subsidy</option>
        </select>
      </label>

      <fieldset className="search-filters__fieldset">
        <legend>Languages</legend>
        {LANGUAGE_OPTIONS.map((lang) => (
          <label key={lang} className="search-filters__check">
            <input
              type="checkbox"
              checked={filters.languages.includes(lang)}
              onChange={() => set({ languages: toggle(filters.languages, lang) })}
            />
            {lang}
          </label>
        ))}
      </fieldset>

      <fieldset className="search-filters__fieldset">
        <legend>Amenities</legend>
        {AMENITY_OPTIONS.map((a) => (
          <label key={a} className="search-filters__check">
            <input
              type="checkbox"
              checked={filters.amenities.includes(a)}
              onChange={() => set({ amenities: toggle(filters.amenities, a) })}
            />
            {a}
          </label>
        ))}
      </fieldset>
    </div>
  )
}
