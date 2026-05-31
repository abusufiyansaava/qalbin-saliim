// src/app/causes/page.tsx
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import { Button } from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'

// ✅ ADD THIS: Revalidate gallery data every 60 seconds
export const revalidate = 60

const CAUSES_QUERY = `*[_type == "cause" && defined(slug.current)] | order(_createdAt desc) {
  _id, title, slug, description, raised, goal, image
}`

export default async function CausesPage({ searchParams }: { searchParams?: { donated?: string } }) {
  let causes: any[] = []
  try {
    causes = await client.fetch(CAUSES_QUERY)
  } catch (error) {
    console.warn('Failed to fetch causes:', error)
  }

  return (
    <div className="py-16 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {searchParams?.donated && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Thank you! Your donation is being processed. Refresh to see updated progress.</span>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Causes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Every project is community-led, transparent, and designed for lasting impact.</p>
        </div>

        {causes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500">No causes available yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {causes.map((cause) => {
              const percent = Math.min(100, Math.round(((cause.raised || 0) / (cause.goal || 1)) * 100))
              return (
                <div key={cause._id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
                  {cause.image ? (
                    <div className="h-48 overflow-hidden">
                      <img src={urlFor(cause.image).width(600).url()} alt={cause.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">{cause.title}</div>
                  )}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">{cause.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{cause.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">${(cause.raised || 0).toLocaleString()} raised</span>
                        <span className="text-gray-500">${(cause.goal || 0).toLocaleString()} goal</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/causes/${cause.slug.current}`}>Support This Cause</Link>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}