import { SAMPLE_PROVIDERS } from '../data/providers'
import type { Provider, SearchFilters, SortOption } from '../types/provider'
import { distanceKm, resolveSearchOrigin } from './geo'

export interface ProviderResult extends Provider {
  distance: number | null
}

export function filterAndSortProviders(
  filters: SearchFilters,
  sort: SortOption,
): ProviderResult[] {
  const origin = filters.q ? resolveSearchOrigin(filters.q) : null

  let results: ProviderResult[] = SAMPLE_PROVIDERS.map((p) => ({
    ...p,
    distance: origin ? distanceKm(origin.lat, origin.lng, p.lat, p.lng) : null,
  }))

  if (origin && filters.distanceKm > 0) {
    results = results.filter(
      (p) => p.distance !== null && p.distance <= filters.distanceKm,
    )
  }

  if (filters.q && !origin) {
    const q = filters.q.toLowerCase()
    const tokens = q.split(/[,\s]+/).filter((t) => t.length > 1)
    results = results.filter((p) => {
      const hay = `${p.city} ${p.province} ${p.areaLabel} ${p.name} ${p.postalPrefix}`.toLowerCase()
      return (
        hay.includes(q) ||
        tokens.some((t) => hay.includes(t)) ||
        p.city.toLowerCase().includes(q) ||
        p.province.toLowerCase().includes(q)
      )
    })
  }

  if (filters.ageGroups.length) {
    results = results.filter((p) =>
      filters.ageGroups.some((a) => p.ageGroups.includes(a)),
    )
  }

  if (filters.careTypes.length) {
    results = results.filter((p) => filters.careTypes.includes(p.careType))
  }

  if (filters.licensing !== 'all') {
    results = results.filter((p) => p.licensing === filters.licensing)
  }

  if (filters.availability !== 'all') {
    results = results.filter((p) => p.availability === filters.availability)
  }

  if (filters.schedule.length) {
    results = results.filter((p) =>
      filters.schedule.some((s) => p.schedule.includes(s)),
    )
  }

  if (filters.subsidy === true) {
    results = results.filter((p) => p.acceptsSubsidy)
  }
  if (filters.subsidy === false) {
    results = results.filter((p) => !p.acceptsSubsidy)
  }

  if (filters.languages.length) {
    results = results.filter((p) =>
      filters.languages.every((lang) =>
        p.languages.some((l) => l.toLowerCase() === lang.toLowerCase()),
      ),
    )
  }

  if (filters.amenities.length) {
    results = results.filter((p) =>
      filters.amenities.every((a) =>
        p.amenities.some((am) => am.toLowerCase().includes(a.toLowerCase())),
      ),
    )
  }

  const availOrder = { 'spots-now': 0, upcoming: 1, waitlist: 2 }

  results.sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name)
    if (sort === 'availability')
      return availOrder[a.availability] - availOrder[b.availability]
    const da = a.distance ?? 9999
    const db = b.distance ?? 9999
    return da - db
  })

  return results
}
