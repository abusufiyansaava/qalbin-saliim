// src/app/blog/page.tsx
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, excerpt, mainImage, publishedAt
}`

export default async function BlogPage() {
  let posts: any[] = []
  try {
    posts = await client.fetch(POSTS_QUERY)
  } catch (error) {
    console.error('Failed to load posts', error)
  }

  return (
    <div className="py-16 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">News & Updates</h1>
          <p className="text-lg text-gray-600">Stories from the field, financial updates, and community highlights.</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition block">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  {post.mainImage ? (
                    <img src={urlFor(post.mainImage).width(600).url()} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray-500 mb-2">{new Date(post.publishedAt).toLocaleDateString()}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                  <span className="inline-block mt-4 text-primary font-semibold text-sm group-hover:underline">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}