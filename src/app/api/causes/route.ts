// src/app/api/causes/route.ts
import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET() {
  try {
    const causes = await client.fetch(`*[_type == "cause" && defined(slug.current)] | order(title asc) {
      _id, title, slug, description
    }`)
    return NextResponse.json(causes)
  } catch (error) {
    console.error('Failed to fetch causes:', error)
    return NextResponse.json([], { status: 500 })
  }
}