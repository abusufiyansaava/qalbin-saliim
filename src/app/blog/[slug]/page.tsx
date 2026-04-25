// src/app/blog/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client, urlFor } from '@/lib/sanity'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Calendar, User } from 'lucide-react'

// Fetch a single post by slug
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id, title, slug, excerpt, content, mainImage, publishedAt,
  "authorName": author->name,
  "authorImage": author->image
}`

// Generate static params for build-time optimization
export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"] { "slug": slug.current }`)
  return posts.map((post: any) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(POST_QUERY, { slug: params.slug })

  if (!post) {
    notFound()
  }

  return (
    <article className="py-16 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', month: 'long', day: 'numeric' 
              })}
            </div>
            {post.authorName && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.authorName}
              </div>
            )}
          </div>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm mb-8">
              <img
                src={urlFor(post.mainImage).width(1200).url()}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-primary pl-6 py-2">
            {post.excerpt}
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm">
          {post.content?.map((block: any, index: number) => {
            if (block._type === 'block') {
              return (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {block.children?.map((child: any, i: number) => (
                    <span key={i} className={child.marks?.includes('strong') ? 'font-semibold' : ''}>
                      {child.text}
                    </span>
                  ))}
                </p>
              )
            }
            return null
          })}
        </div>

        {/* Share / CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600">
            Enjoyed this story? Share it with someone who cares about impact.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/donate">Support This Work</Link>
            </Button>
            <Button variant="ghost" size="sm">
              Share
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}