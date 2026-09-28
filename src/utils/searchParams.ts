import type {
  AgeGroup,
  CareType,
  ScheduleType,
  SearchFilters,
  SortOption,
} from '../types/provider'

const AGE_VALUES: AgeGroup[] = ['infant', 'toddler', 'preschool', 'kindergarten']
const CARE_VALUES: CareType[] = [
  'childcare-centre',
  'family-dayhome',
  'preschool',
  'before-after-school',
]
const SCHEDULE_VALUES: ScheduleType[] = ['full-time', 'part-time', 'flexible']

export const DEFAULT_FILTERS: SearchFilters = {
  q: '',
  distanceKm: 25,
  ageGroups: [],
  careTypes: [],
  licensing: 'all',
  availability: 'all',
  startDate: '',
  schedule: [],
  subsidy: null,
  languages: [],
  amenities: [],
}

function parseList<T extends string>(value: string | null, allowed: T[]): T[] {
  if (!value) return []
  return value
    .split(',')
    .map((v) => v.trim())
    .filter((v): v is T => allowed.includes(v as T))
}

export function filtersFromSearchParams(params: URLSearchParams): SearchFilters {
  const subsidy = params.get('subsidy')
  const childAge = params.get('childAge')
  const ageFromParams = parseList(params.get('age'), AGE_VALUES)
  const ageGroups =
    childAge && AGE_VALUES.includes(childAge as AgeGroup) && !ageFromParams.includes(childAge as AgeGroup)
      ? [...ageFromParams, childAge as AgeGroup]
      : ageFromParams
  return {
    q: params.get('q') ?? '',
    distanceKm: Number(params.get('distance') ?? DEFAULT_FILTERS.distanceKm),
    ageGroups,
    careTypes: parseList(params.get('type'), CARE_VALUES),
    licensing: (params.get('licensing') as SearchFilters['licensing']) ?? 'all',
    availability: (params.get('availability') as SearchFilters['availability']) ?? 'all',
    startDate: params.get('start') ?? '',
    schedule: parseList(params.get('schedule'), SCHEDULE_VALUES),
    subsidy: subsidy === 'yes' ? true : subsidy === 'no' ? false : null,
    languages: params.get('lang')?.split(',').filter(Boolean) ?? [],
    amenities: params.get('amenities')?.split(',').filter(Boolean) ?? [],
  }
}

export function sortFromSearchParams(params: URLSearchParams): SortOption {
  const sort = params.get('sort')
  if (sort === 'name' || sort === 'availability' || sort === 'distance') return sort
  return 'distance'
}

export function filtersToSearchParams(
  filters: SearchFilters,
  sort: SortOption,
  childAge?: string,
): URLSearchParams {
  const p = new URLSearchParams()
  if (filters.q) p.set('q', filters.q)
  if (filters.distanceKm !== DEFAULT_FILTERS.distanceKm)
    p.set('distance', String(filters.distanceKm))
  if (filters.ageGroups.length) p.set('age', filters.ageGroups.join(','))
  if (filters.careTypes.length) p.set('type', filters.careTypes.join(','))
  if (filters.licensing !== 'all') p.set('licensing', filters.licensing)
  if (filters.availability !== 'all') p.set('availability', filters.availability)
  if (filters.startDate) p.set('start', filters.startDate)
  if (filters.schedule.length) p.set('schedule', filters.schedule.join(','))
  if (filters.subsidy === true) p.set('subsidy', 'yes')
  if (filters.subsidy === false) p.set('subsidy', 'no')
  if (filters.languages.length) p.set('lang', filters.languages.join(','))
  if (filters.amenities.length) p.set('amenities', filters.amenities.join(','))
  if (sort !== 'distance') p.set('sort', sort)
  if (childAge) p.set('childAge', childAge)
  return p
}

export function countActiveFilters(filters: SearchFilters): number {
  let n = 0
  if (filters.q) n++
  if (filters.distanceKm !== DEFAULT_FILTERS.distanceKm) n++
  if (filters.ageGroups.length) n++
  if (filters.careTypes.length) n++
  if (filters.licensing !== 'all') n++
  if (filters.availability !== 'all') n++
  if (filters.startDate) n++
  if (filters.schedule.length) n++
  if (filters.subsidy !== null) n++
  if (filters.languages.length) n++
  if (filters.amenities.length) n++
  return n
}
