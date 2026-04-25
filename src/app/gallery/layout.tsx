// src/app/gallery/layout.tsx
import { client } from '@/lib/sanity'
import GalleryPage from './page'

const GALLERY_QUERY = `*[_type == "galleryImage"] | order(date desc) {
  _id, title, image, category, location, date, description
}`

export default async function GalleryLayout() {
  let images: any[] = []
  try {
    images = await client.fetch(GALLERY_QUERY)
  } catch (error) {
    console.warn('Failed to fetch gallery images:', error)
  }

  return <GalleryPage initialImages={images} />
}