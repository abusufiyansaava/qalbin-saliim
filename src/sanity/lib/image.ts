// src/sanity/lib/image.ts
import imageUrlBuilder from '@sanity/image-url' // ✅ Default export (not named)
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

import { dataset, projectId } from './env' // ✅ Ensure this path is correct

// ✅ Create the builder instance
const builder = imageUrlBuilder({ projectId, dataset })

// ✅ Export the helper function
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}