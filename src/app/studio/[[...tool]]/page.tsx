// src/app/studio/[[...tool]]/page.tsx
'use client'  // 🔑 CRITICAL: Must be first line

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'  // 🔑 4 levels up to project root

export default function StudioPage() {
  return <NextStudio config={config} />
}