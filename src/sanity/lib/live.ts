// src/sanity/lib/live.ts
// 🔶 LIVE PREVIEW DISABLED FOR LAUNCH
// This stub prevents build errors. Enable live preview post-launch.

// ✅ Minimal stub exports - no imports, no dependencies
export const sanityFetch = async <T>(query: string, params?: any) => {
  // Fallback: return empty result
  return { data: null as T | null, sourceMap: null }
}

export const SanityLive = () => {
  // No-op component - renders nothing
  return null
}

// 🔶 TO ENABLE LIVE PREVIEW LATER:
// 1. npm install next-sanity@latest
// 2. Replace this file with:
//    import { defineLive } from "next-sanity/live"
//    import { client } from './client'
//    export const { sanityFetch, SanityLive } = defineLive({ client })
// 3. Add <SanityLive /> to your root layout
// 4. Redeploy