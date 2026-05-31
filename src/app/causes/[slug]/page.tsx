// src/app/causes/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { client, urlFor } from '@/lib/sanity'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Target, TrendingUp, Heart } from 'lucide-react'
import Link from 'next/link'

// ✅ ADD THIS: Revalidate gallery data every 60 seconds
export const revalidate = 60

// Fetch cause by slug
const CAUSE_QUERY = `*[_type == "cause" && slug.current == $slug][0] {
  _id, title, slug, description, raised, goal, image
}`

// Add this function above the component
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cause = await client.fetch(CAUSE_QUERY, { slug: params.slug })
  
  if (!cause) {
    return {
      title: "Cause Not Found | Qalbin Salim",
      description: "The cause you're looking for doesn't exist.",
    }
  }
  
  return {
    title: `${cause.title} | Support This Cause`,
    description: cause.description,
    openGraph: {
      title: `${cause.title} | Qalbin Saliim`,
      description: cause.description,
      images: cause.image ? [{ url: urlFor(cause.image).width(1200).url() }] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const causes = await client.fetch(`*[_type == "cause"] { "slug": slug.current }`)
  return causes.map((c: any) => ({ slug: c.slug }))
}

export default async function CausePage({ params }: { params: { slug: string } }) {
  const cause = await client.fetch(CAUSE_QUERY, { slug: params.slug })
  if (!cause) notFound()

  const percent = Math.min(100, Math.round(((cause.raised || 0) / (cause.goal || 1)) * 100))
  const remaining = Math.max(0, (cause.goal || 0) - (cause.raised || 0))

  // Pre-fill donate URL with cause ID
  const donateUrl = `/donate?causeId=${cause._id}&causeName=${encodeURIComponent(cause.title)}`

  return (
    <div className="py-16 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link href="/causes" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" /> Back to Causes
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{cause.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{cause.description}</p>
        </div>

        {/* Image */}
        {cause.image && (
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm mb-10">
            <img src={urlFor(cause.image).width(1200).url()} alt={cause.title} className="w-full h-auto object-cover" />
          </div>
        )}

        {/* Progress & Donation */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-semibold">${(cause.raised || 0).toLocaleString()} raised</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <TrendingUp className="w-5 h-5" />
              <span>${(cause.goal || 0).toLocaleString()} goal</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{percent}% funded</span>
            <span>${remaining.toLocaleString()} remaining</span>
          </div>

          {/* ✅ Donate Button - Links to donate page with cause pre-selected */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <Link href={donateUrl}>
              <Button size="lg" className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-95">
                <Heart className="w-4 h-4 mr-2" />
                Support This Cause
              </Button>
            </Link>
            <p className="text-xs text-center text-gray-500">
              You'll be taken to our secure donation page where you can complete your bank transfer or Mobile Money payment.
            </p>
          </div>
        </div>

        {/* Impact Note */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Your Impact
          </h3>
          <p className="text-sm text-blue-800">
            Every contribution to "{cause.title}" goes directly to {cause.description.toLowerCase()} 
            Your support creates lasting change in communities across Africa.
          </p>
        </div>
      </div>
    </div>
  )
}