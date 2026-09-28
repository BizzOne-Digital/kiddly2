const DEFAULT_GALLERY = [
  '/images/provider/gallery-1.jpg',
  '/images/provider/gallery-2.jpg',
  '/images/provider/gallery-3.jpg',
  '/images/provider/gallery-4.jpg',
]

const MAPLE_LEAF_GALLERY = [
  '/images/provider/hero-main.jpg',
  '/images/provider/gallery-classroom.jpg',
  '/images/provider/gallery-playground.jpg',
  '/images/provider/gallery-reading.jpg',
  '/images/provider/gallery-garden.jpg',
]

export function getProviderGallery(slug?: string): string[] {
  if (slug === 'maple-tree-early-learning') {
    return MAPLE_LEAF_GALLERY
  }
  return DEFAULT_GALLERY
}
