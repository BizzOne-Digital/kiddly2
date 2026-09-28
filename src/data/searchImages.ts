const THUMBS = [
  '/images/provider/hero-main.jpg',
  '/images/featured-1.jpg',
  '/images/featured-2.jpg',
  '/images/featured-3.jpg',
  '/images/featured-4.jpg',
  '/images/grow-educators.jpg',
  '/images/search/thumb-1.jpg',
  '/images/search/thumb-2.jpg',
]

export function getSearchListingImage(providerId: string): string {
  const n = Number.parseInt(providerId, 10)
  const idx = Number.isFinite(n) ? (n - 1) % THUMBS.length : 0
  return THUMBS[idx] ?? THUMBS[0]
}

export function getSearchListingRating(providerId: string): { rating: number; reviews: number } {
  const n = Number.parseInt(providerId, 10) || 1
  const rating = 4.5 + ((n * 7) % 5) / 10
  const reviews = 8 + ((n * 13) % 40)
  return { rating: Math.min(5, Math.round(rating * 10) / 10), reviews }
}
