import { SAMPLE_PROVIDERS } from '../data/providers'
import type { SearchFilters } from '../types/provider'
import { DEFAULT_FILTERS } from './searchParams'
import { distanceKm } from './geo'
import type { ProviderResult } from './filterProviders'

const VANCOUVER_ORIGIN = { lat: 49.283, lng: -123.121 }

const METRO_BC_SLUGS = [
  'maple-tree-early-learning',
  'harbourview-preschool',
  'cedar-grove-childcare-burnaby',
  'cedar-grove-centre',
]

export const HOME_PREVIEW_FILTERS: SearchFilters = {
  ...DEFAULT_FILTERS,
  q: 'Vancouver, BC',
  distanceKm: 50,
}

function applyPreviewFilters(results: ProviderResult[], filters: SearchFilters): ProviderResult[] {
  let list = [...results]

  if (filters.ageGroups.length) {
    list = list.filter((p) => filters.ageGroups.some((a) => p.ageGroups.includes(a)))
  }
  if (filters.careTypes.length) {
    list = list.filter((p) => filters.careTypes.includes(p.careType))
  }
  if (filters.licensing !== 'all') {
    list = list.filter((p) => p.licensing === filters.licensing)
  }
  if (filters.availability !== 'all') {
    list = list.filter((p) => p.availability === filters.availability)
  }
  if (filters.schedule.length) {
    list = list.filter((p) => filters.schedule.some((s) => p.schedule.includes(s)))
  }

  return list.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
}

export function getHomeMapPreviewProviders(filters: SearchFilters): ProviderResult[] {
  const base = SAMPLE_PROVIDERS.filter((p) => METRO_BC_SLUGS.includes(p.slug)).map((p) => ({
    ...p,
    distance: distanceKm(VANCOUVER_ORIGIN.lat, VANCOUVER_ORIGIN.lng, p.lat, p.lng),
  }))

  return applyPreviewFilters(base, filters)
}
