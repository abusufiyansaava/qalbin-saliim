// src/components/gallery/ImageCarousel.tsx
'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity'

interface ImageCarouselProps {
  images: any[]
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 3 >= images.length ? 0 : prev + 3))
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 3 < 0 ? Math.max(0, images.length - 3) : prev - 3))
  }

  const visibleImages = images.slice(currentIndex, currentIndex + 3)

  if (images.length === 0) return null

  return (
    <div className="relative">
      <div className="grid md:grid-cols-3 gap-6">
        {visibleImages.map((image: any, idx: number) => (
          <div key={image._id || idx} className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={urlFor(image.image).width(600).url()}
                alt={image.image?.alt || image.title || 'Gallery image'}
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

      {images.length > 3 && (
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Previous images"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Next images"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}