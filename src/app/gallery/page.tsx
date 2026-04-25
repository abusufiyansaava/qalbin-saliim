// src/app/gallery/page.tsx
import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'

// 🔑 Query for gallery images
const GALLERY_QUERY = `*[_type == "galleryImage" && featured == true] | order(order asc) {
  _id, title, "imageUrl": image.asset->url, description, location, category
}`

// ✅ Optional: Generate static params for SSG (if you want pre-rendering)
export async function generateStaticParams() {
  return [{}] // Gallery is a single page, no dynamic params
}

// ✅ Optional: Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Gallery | Qalbin Salim Charity Organisation',
    description: 'See the impact of your support through photos from communities across Africa.',
    openGraph: {
      title: 'Gallery | Qalbin Salim',
      description: 'See the impact of your support through photos from communities across Africa.',
      images: ['/og-image.jpg'],
    },
  }
}

// ✅ MAIN COMPONENT - Must be default export
export default async function GalleryPage() {
  let images: any[] = []
  try {
    images = await client.fetch(GALLERY_QUERY)
  } catch (error) {
    console.warn('Failed to fetch gallery images:', error)
  }

  return (
    <div className="py-16 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Impact Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See the real-world impact of your support through photos from communities across Africa.
          </p>
        </div>

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500">Gallery images will appear here once added to the CMS.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image: any) => (
              <div key={image._id} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  {image.imageUrl ? (
                    <Image
                      src={image.imageUrl}
                      alt={image.title || 'Gallery image'}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      No image
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                    <p className="text-white text-sm font-medium">{image.title}</p>
                  </div>
                </div>

                {/* Caption */}
                <div className="p-4">
                  {image.title && (
                    <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                  )}
                  {image.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{image.description}</p>
                  )}
                  {(image.location || image.category) && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {image.location && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {image.location}
                        </span>
                      )}
                      {image.category && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {image.category}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Want to see more impact stories?</p>
          <a href="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline group">
            Read Our Blog <span className="group-hover:translate-x-1 transition">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}