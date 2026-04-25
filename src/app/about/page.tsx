// src/app/about/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { client, urlFor } from '@/lib/sanity'
import { ImageCarousel } from '@/components/gallery/ImageCarousel'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { 
  Heart, Target, Eye, Users, Award, TrendingUp, 
  Linkedin, Twitter, Globe, Shield, Zap, HandHeart,
  Calendar, CheckCircle, ArrowRight 
} from 'lucide-react'

// CMS Queries
const TEAM_QUERY = `*[_type == "teamMember"] | order(name asc)`
const GALLERY_QUERY = `*[_type == "galleryImage" && featured == true] | order(date desc)[0...6]`

export default async function AboutPage() {
  let team: any[] = []
  let galleryImages: any[] = []
  
  try {
    team = await client.fetch(TEAM_QUERY)
    galleryImages = await client.fetch(GALLERY_QUERY)
  } catch (error) {
    console.warn('Failed to fetch data for about page:', error)
  }

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-24 md:py-32 px-6 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Est. 2013 • 1 Country • 12,400+ Lives Impacted
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Compassion That <span className="text-blue-200">Transforms</span> Communities
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            For over a decade, Qalbin Saliim has partnered with underserved communities across Africa to create sustainable change through clean water, education, healthcare, and economic empowerment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/donate">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold">
                Support Our Mission
              </Button>
            </Link>
            <Link href="/impact">
              <Button variant="outline" size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold">
                View Our Impact
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Mission */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                To empower underserved communities by providing sustainable access to clean water, food, quality education, healthcare, and economic opportunities — creating lasting change that transcends generations.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  'Build sustainable infrastructure (wells, schools, clinics)',
                  'Train local leaders and create employment opportunities',
                  'Promote gender equality and youth empowerment',
                  'Foster environmental sustainability and climate resilience',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Eye className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                A world where every individual, regardless of circumstance, has the opportunity to thrive — where communities are resilient, self-sufficient, and filled with hope.
              </p>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-100">
                <p className="text-indigo-900 font-medium italic">
                  "We don't just deliver aid — we build capacity. Every project is designed to thrive long after our initial support ends."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision, partnership, and project we undertake.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Compassion', desc: 'We lead with empathy, treating every individual with dignity and respect.', color: 'text-rose-600', bg: 'bg-rose-50' },
              { icon: Users, title: 'Community-Led', desc: 'Local voices drive our programs. We listen first, then act.', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: Shield, title: 'Transparency', desc: '92% of donations go directly to programs. Full financial reports published quarterly.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: TrendingUp, title: 'Sustainability', desc: 'We build systems that last, training locals to maintain and grow initiatives.', color: 'text-amber-600', bg: 'bg-amber-50' },
              { icon: Target, title: 'Impact-Focused', desc: 'Every project is measured, evaluated, and optimized for maximum change.', color: 'text-violet-600', bg: 'bg-violet-50' },
              { icon: HandHeart, title: 'Integrity', desc: 'We operate with honesty, accountability, and ethical standards at all times.', color: 'text-cyan-600', bg: 'bg-cyan-50' },
            ].map((value) => (
              <div key={value.title} className="group bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <div className={`w-14 h-14 ${value.bg} ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT STATS (Animated) */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Measurable Impact Since 2013</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We don't just promise change — we measure it, report it, and improve it.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { target: 142, suffix: '+', label: 'Projects Completed' },
              { target: 85, suffix: '', label: 'Communities Served' },
              { target: 12400, suffix: '+', label: 'Lives Impacted' },
              { target: 92, suffix: '%', label: 'Funds to Programs' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl text-center border border-gray-200 hover:shadow-md transition">
                <p className="text-4xl md:text-5xl font-bold text-primary">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </p>
                <p className="text-gray-600 mt-3 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE / HISTORY */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">Key milestones in our mission to create lasting change.</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />
            
            {[
              { year: '2013', title: 'Founded in Kampala', desc: 'Qalbin Saliim launches with a focus on clean water access in Northern Uganda.' },
              { year: '2014', title: 'First Education Program', desc: 'Expanded to drill a borehole in 3 districts.' },
              { year: '2018', title: 'Healthcare Initiative', desc: 'Launched mobile clinics serving remote villages across 5 regions.' },
              { year: '2022', title: '10,000 Lives Milestone', desc: 'Reached our goal of impacting 10,000+ individuals through sustainable programs.' },
              { year: '2026', title: 'Digital Transformation', desc: 'Launched this platform to increase transparency and donor engagement.' },
            ].map((item, i) => (
              <div key={item.year} className={`relative flex items-center gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow -translate-x-1/2" />
                
                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                    <span className="inline-block bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM MEMBERS */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals driving change on the ground, guided by local expertise and global best practices.
            </p>
          </div>

          {team.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member: any) => (
                <div key={member._id} className="group bg-white p-8 rounded-2xl border border-gray-200 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 bg-gray-100 ring-4 ring-gray-50 group-hover:ring-primary/20 transition">
                    {member.image ? (
                      <img 
                        src={urlFor(member.image).width(300).url()} 
                        alt={member.name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl font-bold bg-gradient-to-br from-gray-100 to-gray-200">
                        {member.name?.charAt(0) || 'Q'}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">{member.bio}</p>
                  <div className="flex justify-center gap-4">
                    {member.social?.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition p-2 hover:bg-gray-100 rounded-lg">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.social?.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition p-2 hover:bg-gray-100 rounded-lg">
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Team members will appear here once added to the CMS.</p>
              <p className="text-sm text-gray-400 mt-2">Add profiles in Sanity Studio to showcase your leadership team.</p>
            </div>
          )}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Impact in Action</h2>
              <p className="text-lg text-gray-600 max-w-xl">Real stories, real communities, real change — captured through the lens of our field teams.</p>
            </div>
            <Link href="/gallery">
              <Button variant="outline" className="mt-4 md:mt-0 group">
                View Full Gallery 
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
              </Button>
            </Link>
          </div>
          
          {galleryImages.length > 0 ? (
            <ImageCarousel images={galleryImages} />
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Gallery images will appear here once uploaded.</p>
              <p className="text-sm text-gray-400">Mark images as "Featured" in Sanity Studio to showcase them here.</p>
            </div>
          )}
        </div>
      </section>

      {/* FINANCIAL TRANSPARENCY */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Shield className="w-16 h-16 mx-auto text-blue-200" />
          <h2 className="text-3xl md:text-4xl font-bold">100% Transparent. Zero Secrets.</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We believe donors deserve to know exactly how their contributions create impact. That's why we publish detailed financial reports and project breakdowns quarterly.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 pt-4">
            {[
              { label: 'Programs', value: '92%', desc: 'Direct impact' },
              { label: 'Operations', value: '6%', desc: 'Admin & overhead' },
              { label: 'Fundraising', value: '2%', desc: 'Donor outreach' },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <p className="text-3xl font-bold">{item.value}</p>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-blue-200">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="pt-6">
            <Button variant="secondary" size="lg" asChild>
              <a href="/impact" className="inline-flex items-center gap-2">
                View Annual Report <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ready to Make a Difference?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether through donations, volunteering, or spreading the word — your support creates ripples of change that transform entire communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button size="lg" className="bg-primary hover:opacity-90">Donate Now</Button>
            </Link>
            <Link href="/get-involved">
              <Button variant="outline" size="lg">Get Involved</Button>
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