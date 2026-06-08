// src/app/blog/page.tsx
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import { Calendar, User, ArrowRight } from 'lucide-react'

// ✅ Query: Only fetch posts with valid slugs
const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id, title, "slug": slug.current, excerpt, mainImage, publishedAt, author
}`

export async function generateMetadata() {
  return {
    title: 'Blog | Qalbin Salim Charity Organisation',
    description: 'Stories, updates, and insights from our work empowering communities across Africa.',
  }
}

export default async function BlogPage() {
  let posts: any[] = []
  try {
    posts = await client.fetch(POSTS_QUERY)
  } catch (error) {
    console.warn('Failed to fetch blog posts:', error)
  }

  return (
    <div className="py-16 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stories, updates, and insights from our work empowering communities across Africa.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500">Blog posts will appear here once published.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts
              .filter((post: any) => post?.slug) // ✅ Safety filter
              .map((post: any) => (
                <Link 
                  key={post._id} 
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 block"
                >
                  {/* Image */}
                  {post.mainImage ? (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={urlFor(post.mainImage).width(600).url()} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                            month: 'short', day: 'numeric', year: 'numeric' 
                          })}
                        </span>
                      )}
                      {post.author && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                      )}
                    </div>
                    
                    {/* Read More */}
                    <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))
            }
          </div>
        )}
      </div>
    </div>
  )
}