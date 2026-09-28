export interface HomeFeaturedCard {
  slug: string
  name: string
  location: string
  image: string
  rating: number
  type: string
}

export const HOME_FEATURED: HomeFeaturedCard[] = [
  {
    slug: 'maple-tree-early-learning',
    name: 'Cedar Grove Childcare',
    location: 'North Vancouver, BC',
    image: '/images/featured-1.jpg',
    rating: 4.9,
    type: 'Licensed Centre',
  },
  {
    slug: 'harbourview-preschool',
    name: 'Harbourview Preschool',
    location: 'Vancouver, BC',
    image: '/images/featured-2.jpg',
    rating: 4.8,
    type: 'Licensed Centre',
  },
  {
    slug: 'cedar-grove-centre',
    name: 'Sunny Backyard Dayhome',
    location: 'Calgary, AB',
    image: '/images/featured-3.jpg',
    rating: 4.9,
    type: 'Family Dayhome',
  },
  {
    slug: 'northgate-little-learners',
    name: 'Maple Tree Early Learning',
    location: 'Saanich, BC',
    image: '/images/featured-4.jpg',
    rating: 4.7,
    type: 'Licensed Centre',
  },
]
