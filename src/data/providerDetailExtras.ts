import type { Provider } from '../types/provider'
import { AVAILABILITY_LABELS, CARE_TYPE_LABELS } from '../types/provider'

export interface ProviderReview {
  id: string
  rating: number
  date: string
  text: string
  author: string
}

export interface ProviderDetailExtras {
  displayRating: number
  reviewCount: number
  distanceKm: number
  ageRangeLabel: string
  hoursDetail: string
  careTypeDetail: string
  availabilityDetail: string
  feesLabel: string
  address: string
  licenseNumber: string
  lastInspection: string
  whyChoose: string[]
  availabilityRows: { label: string; status: string; tone: 'green' | 'orange' }[]
  weekHours: { day: string; hours: string }[]
  amenities: string[]
  reviews: ProviderReview[]
}

const MAPLE_LEAF_EXTRAS: ProviderDetailExtras = {
  displayRating: 4.8,
  reviewCount: 24,
  distanceKm: 2.3,
  ageRangeLabel: '6 months – 5 years (Infant, Toddler, Preschool)',
  hoursDetail: '7:00 AM – 6:00 PM (Monday – Friday)',
  careTypeDetail: 'Full-time & Part-time (Licensed Childcare Centre)',
  availabilityDetail: 'Spots Available Now (Infants, Toddlers, Preschool)',
  feesLabel: '$1,250 – $1,650 / month (Varies by age group)',
  address: '2450 Maple Street, Vancouver, BC V6J 3T6',
  licenseNumber: 'BC-LIC-88421',
  lastInspection: 'March 2024',
  whyChoose: [
    'Licensed provider with clear program details',
    'Spots available for multiple age groups',
    'Convenient Vancouver location near transit',
    'Outdoor play and bright classrooms',
    'Experienced, first-aid certified staff',
    'Transparent monthly fee ranges',
  ],
  availabilityRows: [
    { label: 'Infants', status: '3 spots available', tone: 'green' },
    { label: 'Toddlers', status: '5 spots available', tone: 'green' },
    { label: 'Preschool', status: 'Waitlist', tone: 'orange' },
  ],
  weekHours: [
    { day: 'Monday', hours: '7:00 AM – 6:00 PM' },
    { day: 'Tuesday', hours: '7:00 AM – 6:00 PM' },
    { day: 'Wednesday', hours: '7:00 AM – 6:00 PM' },
    { day: 'Thursday', hours: '7:00 AM – 6:00 PM' },
    { day: 'Friday', hours: '7:00 AM – 6:00 PM' },
    { day: 'Saturday', hours: 'Closed' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  amenities: [
    'Outdoor playground',
    'Bright classrooms',
    'Nap room',
    'On-site parking',
    'Transit nearby',
    'Nutritious meals',
    'Nature-based play',
    'Music program',
    'Secure entry',
    'Parent communication app',
  ],
  reviews: [
    {
      id: 'r1',
      rating: 5,
      date: 'January 2026',
      text:
        'We toured three centres and Maple Leaf felt the most welcoming. The teachers took time to answer every question and our toddler settled in quickly.',
      author: 'Priya M.',
    },
    {
      id: 'r2',
      rating: 5,
      date: 'November 2025',
      text:
        'Clear communication, lovely outdoor space, and flexible part-time options. The daily updates through the app give us real peace of mind.',
      author: 'James & Lin C.',
    },
    {
      id: 'r3',
      rating: 4,
      date: 'September 2025',
      text:
        'Strong preschool program and a caring team. Waitlist for our second child, but we would choose this centre again without hesitation.',
      author: 'Amélie D.',
    },
  ],
}

function defaultExtras(provider: Provider): ProviderDetailExtras {
  return {
    displayRating: 4.7,
    reviewCount: 12,
    distanceKm: 3.5,
    ageRangeLabel: provider.ageGroups.join(', '),
    hoursDetail: provider.hours,
    careTypeDetail: CARE_TYPE_LABELS[provider.careType],
    availabilityDetail: AVAILABILITY_LABELS[provider.availability],
    feesLabel: provider.pricingNote,
    address: `${provider.city}, ${provider.province} ${provider.postalPrefix}***`,
    licenseNumber: 'Sample licence #',
    lastInspection: 'Sample date',
    whyChoose: provider.programDetails,
    availabilityRows: [
      { label: 'Programs', status: 'Contact provider', tone: 'green' },
    ],
    weekHours: [
      { day: 'Monday', hours: '7:30 AM – 5:30 PM' },
      { day: 'Tuesday', hours: '7:30 AM – 5:30 PM' },
      { day: 'Wednesday', hours: '7:30 AM – 5:30 PM' },
      { day: 'Thursday', hours: '7:30 AM – 5:30 PM' },
      { day: 'Friday', hours: '7:30 AM – 5:30 PM' },
      { day: 'Saturday', hours: 'Closed' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    amenities: provider.amenities,
    reviews: [
      {
        id: 'default',
        rating: 5,
        date: 'Sample review',
        text: 'Families appreciate the warm staff and organized routines at this sample listing.',
        author: 'Sample parent',
      },
    ],
  }
}

export function getProviderDetailExtras(provider: Provider): ProviderDetailExtras {
  if (provider.slug === 'maple-tree-early-learning') {
    return MAPLE_LEAF_EXTRAS
  }
  return defaultExtras(provider)
}
