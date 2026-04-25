// src/components/gallery/Lightbox.tsx
'use client'

import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity'

interface LightboxProps {
  images: any[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const image = images[currentIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
        aria-label="Close lightbox"
      >
        <X className="w-8 h-8" />
      </button>

      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-10 h-10" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
        aria-label="Next image"
      >
        <ChevronRight className="w-10 h-10" />
      </button>

      <div className="max-w-5xl max-h-[90vh] overflow-auto">
        <img
          src={urlFor(image.image).width(1200).url()}
          alt={image.image?.alt || image.title}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
        <div className="mt-4 text-center text-white">
          <h3 className="text-xl font-semibold">{image.title}</h3>
          {image.description && <p className="mt-2 text-gray-300">{image.description}</p>}
          {image.location && <p className="mt-1 text-sm text-gray-400">{image.location}</p>}
        </div>
      </div>
    </div>
  )
}