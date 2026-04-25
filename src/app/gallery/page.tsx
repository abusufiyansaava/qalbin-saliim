// src/app/gallery/page.tsx
'use client'

import { useState } from 'react'
import { client, urlFor } from '@/lib/sanity'
import { Lightbox } from '@/components/gallery/Lightbox'
import { Button } from '@/components/ui/Button'

const GALLERY_QUERY = `*[_type == "galleryImage"] | order(date desc)`

export default function GalleryPage({ initialImages }: { initialImages: any[] }) {
  const [images] = useState(initialImages)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const categories = ['all', 'education', 'healthcare', 'water', 'community', 'events']

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const nextImage = () => setLightboxIndex((prev) => (prev! + 1) % filteredImages.length)
  const prevImage = () => setLightboxIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length)

  return (
    <div className="py-16 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Photo Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Moments of transformation, hope, and community from our work across Africa.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No images in this category yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredImages.map((image: any, idx: number) => (
              <div
                key={image._id}
                onClick={() => openLightbox(idx)}
                className="group cursor-pointer relative overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={urlFor(image.image).width(600).url()}
                    alt={image.image?.alt || image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="font-semibold">{image.title}</p>
                    {image.location && <p className="text-sm text-gray-200">{image.location}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  )
}