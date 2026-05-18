// src/app/impact/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { client, urlFor } from '@/lib/sanity'
import { 
  ArrowRight, Download, MapPin, Droplets, GraduationCap, 
  Heart, Users, TrendingUp, CheckCircle, Play, FileText,
  Target, HandHeart, Award
} from 'lucide-react'

// CMS Queries
const CAUSES_QUERY = `*[_type == "cause"] | order(_createdAt desc)[0...3] {
  _id, title, slug, description, raised, goal, image, location
}`
const TRANSFORMATIONS_QUERY = `*[_type == "transformation"] | order(order asc) {
  _id, title, beforeText, afterText, image, location, stat
}`
const VIDEO_QUERY = `*[_type == "videoTestimonial" && featured == true] | order(_createdAt desc)[0] {
  _id, title, quote, speakerName, speakerLocation, thumbnail, videoUrl
}`
const REPORTS_QUERY = `*[_type == "report" && featured == true] | order(publishedAt desc) {
  _id, title, "fileUrl": file.asset->url, "fileName": file.asset->originalFilename, description, category, publishedAt
}`

// Add this with your other queries:
const MILESTONES_QUERY = `*[_type == "milestone" && featured == true] | order(order asc) {
  _id, title, value, location, icon
}`

export default async function ImpactPage() {
  let causes: any[] = []
  let transformations: any[] = []
  let video: any = null
  let reports: any[] = []
  let milestones: any[] = []
  
  try {
    causes = await client.fetch(CAUSES_QUERY)
    transformations = await client.fetch(TRANSFORMATIONS_QUERY)
    video = await client.fetch(VIDEO_QUERY)
    reports = await client.fetch(REPORTS_QUERY)
    milestones = await client.fetch(MILESTONES_QUERY)
  } catch (error) {
    console.warn('Failed to fetch impact ', error)
  }

  const totalRaised = causes.reduce((sum, c) => sum + (c.raised || 0), 0)
  const totalGoal = causes.reduce((sum, c) => sum + (c.goal || 0), 0)
  const overallPercent = totalGoal > 0 ? Math.round((totalRaised / totalGoal) * 100) : 0

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 text-white py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Verified Impact • Transparent Reporting • Community-Led
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Real Change. <span className="text-emerald-200">Measurable Impact.</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Every donation, every volunteer hour, every partnership creates ripples of transformation. See how your support is changing lives across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/donate">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-lg">
                Amplify Your Impact
              </Button>
            </Link>
            {/* ✅ FIXED: Solid background ensures visibility */}
            {reports.length > 0 && (
              <a href={reports[0].fileUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500 font-semibold shadow-lg">
                  <Download className="w-4 h-4 mr-2" />
                  {reports[0].title || 'View Latest Report'}
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ✅ NEW: IMPACT DASHBOARD - Fund Allocation + Milestones */}
      <section className="py-16 px-6 md:px-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* LEFT: Fund Allocation */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">How Your Donation Is Used</h3>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                We maintain radical transparency. Here's exactly where every shilling goes:
              </p>
              
              <div className="space-y-4 pt-2">
                {[
                  { label: 'Direct Programs', value: 92, color: 'bg-emerald-500', desc: 'Wells, schools, training, relief supplies' },
                  { label: 'Operations', value: 6, color: 'bg-blue-500', desc: 'Staff, technology, compliance' },
                  { label: 'Fundraising', value: 2, color: 'bg-amber-500', desc: 'Donor outreach, reporting' },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-700">{item.label}</span>
                      <span className="text-gray-900 font-bold">{item.value}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${item.value}%` }} />
                    </div>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 flex items-start gap-3 text-sm text-emerald-700 bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Financial reports published quarterly</p>
                  <p className="text-emerald-600 mt-1">
                    <Link href="/contact" className="underline hover:text-emerald-800">Request detailed breakdown</Link> anytime.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Impact Milestones (CMS-Powered) */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Impact Milestones</h3>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Real outcomes from your support — updated as projects complete.
              </p>

              {milestones.length === 0 ? (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">Milestones will appear here</p>
                  <p className="text-sm text-gray-400 mt-1">Add them in Sanity Studio → Impact Milestones</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {milestones.map((milestone: any) => {
                    // Map icon names to Lucide components
                    const iconMap: Record<string, any> = {
                      droplets: Droplets,
                      graduationCap: GraduationCap,
                      heart: Heart,
                      users: Users,
                      award: Award,
                      trendingUp: TrendingUp,
                      target: Target,
                      handHeart: HandHeart,
                    }
                    const Icon = iconMap[milestone.icon] || Heart

                    return (
                      <div 
                        key={milestone._id} 
                        className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 hover:shadow-md hover:border-primary/30 transition group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          {milestone.location && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {milestone.location}
                            </span>
                          )}
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{milestone.value}</p>
                        <p className="text-sm text-gray-600 font-medium leading-tight">{milestone.title}</p>
                      </div>
                    )
                  })}
                </div>
              )}

              <div className="pt-2 text-center">
                <p className="text-xs text-gray-500">
                  ✨ Updated in real-time by our field teams
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Impact by the Numbers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Tangible outcomes from over a decade of community partnership.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Droplets, target: 0, suffix: '+', label: 'Boreholes Drilled', color: 'text-blue-600' },
              { icon: GraduationCap, target: 8, suffix: '+', label: 'Students Educated', color: 'text-emerald-600' },
              { icon: Heart, target: 30, suffix: '+', label: 'Lives Impacted', color: 'text-rose-600' },
              { icon: Users, target: 6, suffix: '', label: 'Communities Served', color: 'text-violet-600' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-8 rounded-2xl text-center border border-gray-200 hover:shadow-lg transition group">
                <div className={`w-14 h-14 ${stat.color} bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <p className="text-4xl font-bold text-primary"><AnimatedCounter target={stat.target} suffix={stat.suffix} /></p>
                <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT SHOWCASE */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Active Projects</h2>
              <p className="text-lg text-gray-600 max-w-xl">Your support fuels these life-changing initiatives.</p>
            </div>
            <Link href="/causes" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition mt-4 md:mt-0">View All Causes <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {causes.slice(0, 3).map((cause: any) => {
              const percent = Math.min(100, Math.round(((cause.raised || 0) / (cause.goal || 1)) * 100))
              return (
                <div key={cause._id} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
                  {cause.image ? (
                    <div className="h-48 overflow-hidden"><img src={urlFor(cause.image).width(600).url()} alt={cause.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" /></div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"><MapPin className="w-12 h-12 text-gray-400" /></div>
                  )}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">{cause.title}</h3>
                      {cause.location && <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"><MapPin className="w-3 h-3" />{cause.location}</span>}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{cause.description}</p>
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-sm"><span className="font-medium text-gray-700">${(cause.raised || 0).toLocaleString()} raised</span><span className="text-gray-500">${(cause.goal || 0).toLocaleString()} goal</span></div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${percent}%` }} /></div>
                    </div>
                    <Button asChild className="w-full group-hover:bg-primary/90 transition"><Link href={`/causes/${cause.slug.current}`}>Support This Project</Link></Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* TRANSFORMATION IN ACTION */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transformation in Action</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">See the tangible difference your support makes in communities across Africa.</p>
          </div>
          {transformations.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500">Transformation stories will appear here once added to the CMS.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {transformations.map((item: any) => (
                <div key={item._id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
                  {item.image ? (
                    <div className="h-48 overflow-hidden"><img src={urlFor(item.image).width(600).url()} alt={item.title} className="w-full h-full object-cover" /></div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 text-sm">{item.title}</div>
                  )}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <div className="space-y-3">
                      <div className="flex gap-3"><span className="text-red-500 font-bold flex-shrink-0">✕</span><p className="text-gray-600 text-sm">{item.beforeText}</p></div>
                      <div className="flex gap-3"><span className="text-emerald-500 font-bold flex-shrink-0">✓</span><p className="text-gray-700 font-medium text-sm">{item.afterText}</p></div>
                    </div>
                    {item.stat && <p className="text-xs text-gray-500 pt-2 border-t border-gray-100">{item.stat}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* VIDEO TESTIMONIAL */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          {video ? (
            <>
              <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 mb-8 group cursor-pointer shadow-lg">
                <img src={urlFor(video.thumbnail).width(1200).url()} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <a href={video.videoUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </a>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <p className="text-white font-semibold drop-shadow-md line-clamp-1">"{video.quote}"</p>
                  <p className="text-white/90 text-sm drop-shadow-md">— {video.speakerName}{video.speakerLocation && `, ${video.speakerLocation}`}</p>
                </div>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">Watch real stories from community members whose lives have been transformed through your support.</p>
            </>
          ) : (
            <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden border border-gray-200 mb-8 flex items-center justify-center">
              <div className="text-center p-8">
                <Play className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Video testimonials will appear here once uploaded to the CMS.</p>
                <p className="text-sm text-gray-400 mt-1">Add featured videos in Sanity Studio.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ✅ TRANSPARENCY & REPORTS (CMS Powered) */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <FileText className="w-16 h-16 mx-auto text-blue-200" />
          <h2 className="text-3xl md:text-4xl font-bold">Full Transparency. Zero Secrets.</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">We publish detailed financial reports, project breakdowns, and impact metrics quarterly. Download the latest documents below.</p>
          
          {reports.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
              <p className="text-blue-100">Reports will appear here once uploaded to the CMS.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4 pt-4">
              {reports.map((report: any) => (
                <a
                  key={report._id}
                  href={report.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-white/20 transition text-left group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold group-hover:text-blue-200 transition line-clamp-1">{report.title}</p>
                    <Download className="w-4 h-4 text-blue-200 flex-shrink-0 ml-2" />
                  </div>
                  {report.category && <p className="text-xs text-blue-200 uppercase tracking-wide mb-1">{report.category}</p>}
                  <p className="text-sm text-blue-100 line-clamp-2">{report.description}</p>
                </a>
              ))}
            </div>
          )}
          
          <div className="pt-6">
            <Button variant="secondary" size="lg" asChild>
              <a href="/contact" className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-700">
                Request Custom Report <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      {/* FINAL CTA - UPDATED */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <TrendingUp className="w-16 h-16 text-primary mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Be Part of the Next Chapter</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every contribution fuels sustainable change. Join thousands building a brighter future — through donations, volunteering, or spreading the word.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button size="lg" className="bg-primary hover:opacity-90">Donate Now</Button>
            </Link>
            {/* ✅ FIXED: Volunteer button now works */}
            <Link href="/get-involved">
              <Button variant="outline" size="lg">Apply to Volunteer</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}