import { X } from 'lucide-react'
import type { SearchFilters } from '../../types/provider'
import { DEFAULT_FILTERS } from '../../utils/searchParams'
import {
  AGE_GROUP_LABELS,
  CARE_TYPE_LABELS,
  AVAILABILITY_LABELS,
  LICENSING_LABELS,
} from '../../types/provider'
import './FilterChips.css'

interface FilterChipsProps {
  filters: SearchFilters
  onChange: (filters: SearchFilters) => void
}

export function FilterChips({ filters, onChange }: FilterChipsProps) {
  const chips: { label: string; clear: () => void }[] = []

  if (filters.q) chips.push({ label: `Near: ${filters.q}`, clear: () => onChange({ ...filters, q: '' }) })
  if (filters.distanceKm !== DEFAULT_FILTERS.distanceKm)
    chips.push({
      label: `${filters.distanceKm} km`,
      clear: () => onChange({ ...filters, distanceKm: DEFAULT_FILTERS.distanceKm }),
    })
  filters.ageGroups.forEach((a) =>
    chips.push({
      label: AGE_GROUP_LABELS[a],
      clear: () =>
        onChange({ ...filters, ageGroups: filters.ageGroups.filter((x) => x !== a) }),
    }),
  )
  filters.careTypes.forEach((c) =>
    chips.push({
      label: CARE_TYPE_LABELS[c],
      clear: () =>
        onChange({ ...filters, careTypes: filters.careTypes.filter((x) => x !== c) }),
    }),
  )
  if (filters.licensing !== 'all')
    chips.push({
      label: LICENSING_LABELS[filters.licensing],
      clear: () => onChange({ ...filters, licensing: 'all' }),
    })
  if (filters.availability !== 'all')
    chips.push({
      label: AVAILABILITY_LABELS[filters.availability],
      clear: () => onChange({ ...filters, availability: 'all' }),
    })
  if (filters.startDate)
    chips.push({
      label: `Start: ${filters.startDate}`,
      clear: () => onChange({ ...filters, startDate: '' }),
    })
  filters.schedule.forEach((s) =>
    chips.push({
      label: s.replace('-', ' '),
      clear: () =>
        onChange({ ...filters, schedule: filters.schedule.filter((x) => x !== s) }),
    }),
  )
  if (filters.subsidy === true)
    chips.push({ label: 'Subsidy', clear: () => onChange({ ...filters, subsidy: null }) })
  if (filters.subsidy === false)
    chips.push({
      label: 'No subsidy listed',
      clear: () => onChange({ ...filters, subsidy: null }),
    })
  filters.languages.forEach((lang) =>
    chips.push({
      label: lang,
      clear: () =>
        onChange({ ...filters, languages: filters.languages.filter((x) => x !== lang) }),
    }),
  )
  filters.amenities.forEach((a) =>
    chips.push({
      label: a,
      clear: () =>
        onChange({ ...filters, amenities: filters.amenities.filter((x) => x !== a) }),
    }),
  )

  if (!chips.length) return null

  return (
    <ul className="filter-chips" aria-label="Applied filters">
      {chips.map((chip) => (
        <li key={chip.label}>
          <button type="button" className="filter-chips__chip" onClick={chip.clear}>
            {chip.label}
            <X size={14} aria-hidden />
            <span className="sr-only">Remove filter {chip.label}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
