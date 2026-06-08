// src/app/page.tsx
import Link from 'next/link'
import { ArrowRight, Heart, Users, Globe, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { client, urlFor } from '@/lib/sanity'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { NewsletterForm } from '@/components/shared/NewsletterForm'

// ✅ ADD THIS: Revalidate gallery data every 60 seconds
export const revalidate = 60

// 🔑 Queries (defined at module scope - this is correct)
// 🔑 Queries
const CAUSES_QUERY = `*[_type == "cause" && defined(slug.current)] {
  _id, title, slug, description, raised, goal, image, featured
} | order(featured desc, _createdAt desc)[0...3]`

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id, title, slug, excerpt, mainImage, publishedAt
}`

const HERO_QUERY = `*[_type == "homeSettings"][0] {
  heroImage,
  heroOverlay
}`

const PARTNERS_QUERY = `*[_type == "partner"] | order(order asc) {
  _id, name, "logoUrl": logo.asset->url, website
}`

export default async function HomePage() {
  // ✅ ALL data fetched INSIDE the component
  let causes: any[] = []
  let posts: any[] = []
  let heroSettings: any = null
  let partners: any[] = []
  
  try {
    causes = await client.fetch(CAUSES_QUERY)
    posts = await client.fetch(POSTS_QUERY)
    heroSettings = await client.fetch(HERO_QUERY)
    partners = await client.fetch(PARTNERS_QUERY) // ✅ NOW fetched correctly
  } catch (error) {
    console.warn('Failed to fetch homepage ', error)
  }

  const heroImage = heroSettings?.heroImage 
    ? urlFor(heroSettings.heroImage).width(1920).url() 
    : null
  const overlayStyle = heroSettings?.heroOverlay || 'gradient'

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative text-white py-24 md:py-40 px-6 overflow-hidden">
        {heroImage ? (
          <>
            <div className="absolute inset-0 z-0">
              <img src={heroImage} alt="Qalbin Salim community impact" className="w-full h-full object-cover" />
            </div>
            <div className={`absolute inset-0 z-0 ${
              overlayStyle === 'light' ? 'bg-white/30' :
              overlayStyle === 'dark' ? 'bg-black/60' :
              'bg-gradient-to-b from-black/50 via-black/30 to-black/60'
            }`} />
          </>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900" />
        )}
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/20 mx-auto">
            <Shield className="w-4 h-4 text-orange-400" />
            Est. 2024 • Uganda • 30+ Lives Impacted
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg">
            Compassion in Action. <span className="text-orange-400">Change Starts Here.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Qalbin Saliim empowers underserved communities through clean water, education, vocational training, and sustainable development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/donate">
              <button className="h-14 px-10 py-4 bg-white text-blue-700 font-semibold rounded-2xl hover:bg-blue-50 transition shadow-lg hover:shadow-xl active:scale-95">
                Donate Now
              </button>
            </Link>
            <Link href="/about">
              <button className="h-14 px-10 py-4 bg-orange-600 text-white font-semibold rounded-2xl hover:bg-orange-700 transition shadow-lg hover:shadow-xl active:scale-95">
                Learn Our Mission
              </button>
            </Link>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto mt-20 pt-8 border-t border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Shield, label: '100% Transparent', desc: 'Reports published quarterly' },
              { icon: Globe, label: '2+ Districts', desc: 'Serving communities across Uganda' },
              { icon: Users, label: '30+ Lives', desc: 'Impacted since 2024' },
              { icon: Heart, label: 'Community-Led', desc: 'Local leaders drive solutions' },
            ].map((item) => (
              <div key={item.label} className="space-y-3">
                <item.icon className="w-10 h-10 mx-auto text-orange-400 drop-shadow-md" />
                <p className="font-bold text-white text-lg drop-shadow-sm">{item.label}</p>
                <p className="text-sm text-white/80 drop-shadow-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ SIMPLE, ROBUST PARTNERS MARQUEE */}
      {partners.length > 0 && (
        <section className="py-6 bg-white border-b border-gray-100 overflow-hidden">
          <p className="text-center text-sm text-gray-500 mb-4 font-medium">
            Trusted by communities & partners across Africa
          </p>
          
          {/* Marquee Container */}
          <div className="relative overflow-hidden">
            <div className="animate-marquee flex gap-8 items-center whitespace-nowrap will-change-transform">
              {/* Double the partners for seamless loop */}
              {[...partners, ...partners].map((partner, idx) => (
                <div 
                  key={`${partner._id}-${idx}`} 
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  {partner.website ? (
                    <a 
                      href={partner.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block opacity-70 hover:opacity-100 transition duration-300"
                      aria-label={`Visit ${partner.name}`}
                    >
                      {partner.logoUrl ? (
                        <img 
                          src={partner.logoUrl} 
                          alt={partner.name} 
                          className="h-10 md:h-12 w-auto object-contain" 
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-sm text-gray-600 font-medium px-2">
                          {partner.name}
                        </span>
                      )}
                    </a>
                  ) : (
                    <div className="opacity-70">
                      {partner.logoUrl ? (
                        <img 
                          src={partner.logoUrl} 
                          alt={partner.name} 
                          className="h-10 md:h-12 w-auto object-contain" 
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-sm text-gray-600 font-medium px-2">
                          {partner.name}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* IMPACT STATS */}
      <section className="section-premium bg-background">
        <div className="container-premium">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Measurable Impact</h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">We don't just promise change — we measure it, report it, and improve it.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { target: 0, suffix: '', label: 'Projects Completed' },
              { target: 6, suffix: '+', label: 'Communities Served' },
              { target: 0, suffix: '', label: 'Volunteer Hours' },
              { target: 60, suffix: '%', label: 'Funds to Programs' },
            ].map((stat, i) => (
              <div key={stat.label} className={`card-premium p-8 text-center hover-glow animate-fade-in-up delay-${i*100}`}>
                <p className="text-4xl font-bold text-gradient">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </p>
                <p className="text-muted-foreground mt-3 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CAUSES */}
      <section className="section-premium section-alt">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Causes</h2>
              <p className="mt-2 text-muted-foreground">Your support fuels these life-changing initiatives.</p>
            </div>
            <Link href="/causes" className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition mt-4 md:mt-0 group">
              View All Causes <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          {causes.length === 0 ? (
            <div className="text-center py-16 card-premium">
              <p className="text-muted-foreground">No causes available yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {causes.map((cause: any, i) => {
                const percent = Math.min(100, Math.round(((cause.raised || 0) / (cause.goal || 1)) * 100))
                return (
                  <div key={cause._id} className={`card-premium overflow-hidden group animate-fade-in-up delay-${i*100}`}>
                    {cause.image ? (
                      <div className="h-52 overflow-hidden">
                        <img src={urlFor(cause.image).width(600).url()} alt={cause.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      </div>
                    ) : (
                      <div className="h-52 bg-muted flex items-center justify-center text-muted-foreground">{cause.title}</div>
                    )}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-foreground">{cause.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{cause.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-primary">${(cause.raised || 0).toLocaleString()} raised</span>
                          <span className="text-muted-foreground">${(cause.goal || 0).toLocaleString()} goal</span>
                        </div>
                        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-secondary rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{percent}% funded</span>
                      </div>
                      <Link
                        href={`/causes/${cause.slug.current}`}
                        className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-primary hover:text-white hover:border-primary h-10 px-4 py-2 w-full transition"
                      >
                        Support This Cause
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/*/<section className="section-premium bg-background">
        <div className="container-premium max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Stories of Change</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { quote: "Before the water project, I walked 6 miles daily. Now my children attend school instead of fetching water.", author: "Amina K.", location: "Mbale District" },
              { quote: "The youth center gave me skills I never imagined. Today I run my own tailoring business.", author: "Hamza M.", location: "Kabale District" },
            ].map((story, i) => (
              <div key={story.author} className={`card-premium p-8 text-left animate-fade-in-up delay-${i*100}`}>
                <p className="text-foreground italic mb-6 text-lg leading-relaxed">"{story.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {story.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{story.author}</p>
                    <p className="text-sm text-muted-foreground">{story.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* BLOG PREVIEW */}
      <section className="section-premium section-alt">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Latest from Our Blog</h2>
              <p className="mt-2 text-muted-foreground">Stories, updates, and insights from the field.</p>
            </div>
            <Link href="/blog" className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition mt-4 md:mt-0 group">
              View All Posts <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 card-premium">
              <p className="text-muted-foreground">Blog posts will appear here once published.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post: any, i) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`} className={`card-premium group block overflow-hidden animate-fade-in-up delay-${i*100}`}>
                  <div className="h-44 bg-muted overflow-hidden">
                    {post.mainImage ? (
                      <img src={urlFor(post.mainImage).width(400).url()} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-muted-foreground mb-2">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                    <span className="inline-block mt-4 text-primary font-semibold text-sm group-hover:underline">Read More →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      {/* NEWSLETTER */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Stay Updated on Our Impact</h2>
          <p className="text-xl text-blue-200">Join 20+ supporters receiving monthly updates, success stories, and ways to get involved.</p>
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-xl">
            {/* ✅ Pass source for tracking */}
            <NewsletterForm source="Homepage" />
          </div>
          <p className="text-sm text-blue-300">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  )
}