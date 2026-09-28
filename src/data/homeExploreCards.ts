export interface HomeExploreCard {
  slug: string
  name: string
  rating: number
  type: string
  location: string
  distance: string
  image: string
}

export const HOME_EXPLORE_CARDS: HomeExploreCard[] = [
  {
    slug: 'maple-tree-early-learning',
    name: 'Maple Leaf Early Learning',
    rating: 4.9,
    type: 'Licensed Centre',
    location: 'North Vancouver, BC',
    distance: '2.4 km',
    image: '/images/featured-1.jpg',
  },
  {
    slug: 'harbourview-preschool',
    name: 'Harbourview Preschool',
    rating: 4.8,
    type: 'Licensed Centre',
    location: 'Vancouver, BC',
    distance: '4.1 km',
    image: '/images/featured-2.jpg',
  },
  {
    slug: 'cedar-grove-childcare-burnaby',
    name: 'Cedar Grove Childcare',
    rating: 4.9,
    type: 'Family Dayhome',
    location: 'Burnaby, BC',
    distance: '6.2 km',
    image: '/images/featured-3.jpg',
  },
]
