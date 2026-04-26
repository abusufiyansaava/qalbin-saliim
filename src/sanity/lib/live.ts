// src/sanity/lib/live.ts
// 🔶 Live preview is currently disabled for launch
// To enable later: 
// 1. Update next-sanity: npm install next-sanity@latest
// 2. Restore the original code below

// ✅ Stub exports to prevent import errors
export const sanityFetch = async () => {
  console.warn('sanityFetch: Live preview is disabled. Using static fetch.')
  return { data: null, sourceMap: null }
}

export const SanityLive = () => {
  return null // No-op component
}

/* 
// 🔶 ORIGINAL CODE - Uncomment when ready to enable live preview:
import { defineLive } from "next-sanity/live"
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({ 
  client,
  // Optional: Enable draft mode with a secret token
  // token: process.env.SANITY_API_READ_TOKEN,
})
*/