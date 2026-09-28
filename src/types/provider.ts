export type AgeGroup = 'infant' | 'toddler' | 'preschool' | 'kindergarten'
export type CareType =
  | 'childcare-centre'
  | 'family-dayhome'
  | 'preschool'
  | 'before-after-school'
export type LicensingStatus = 'licensed' | 'private'
export type AvailabilityStatus = 'spots-now' | 'upcoming' | 'waitlist'
export type ScheduleType = 'full-time' | 'part-time' | 'flexible'

export interface Provider {
  id: string
  slug: string
  name: string
  tagline: string
  city: string
  province: string
  postalPrefix: string
  areaLabel: string
  lat: number
  lng: number
  careType: CareType
  licensing: LicensingStatus
  availability: AvailabilityStatus
  ageGroups: AgeGroup[]
  schedule: ScheduleType[]
  hours: string
  languages: string[]
  amenities: string[]
  acceptsSubsidy: boolean
  pricingNote: string
  description: string
  about: string
  programDetails: string[]
  imageUrl: string
  gallery: string[]
  lastUpdatedSample: string
  featured?: boolean
}

export type SortOption = 'distance' | 'name' | 'availability'

export interface SearchFilters {
  q: string
  distanceKm: number
  ageGroups: AgeGroup[]
  careTypes: CareType[]
  licensing: 'all' | LicensingStatus
  availability: 'all' | AvailabilityStatus
  startDate: string
  schedule: ScheduleType[]
  subsidy: boolean | null
  languages: string[]
  amenities: string[]
}

export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  infant: 'Infant',
  toddler: 'Toddler',
  preschool: 'Preschool',
  kindergarten: 'Kindergarten+',
}

export const CARE_TYPE_LABELS: Record<CareType, string> = {
  'childcare-centre': 'Childcare centre',
  'family-dayhome': 'Family dayhome',
  preschool: 'Preschool',
  'before-after-school': 'Before & after school',
}

export const LICENSING_LABELS: Record<LicensingStatus, string> = {
  licensed: 'Licensed',
  private: 'Private care',
}

export const AVAILABILITY_LABELS: Record<AvailabilityStatus, string> = {
  'spots-now': 'Spots available now',
  upcoming: 'Upcoming openings',
  waitlist: 'Waitlist',
}
