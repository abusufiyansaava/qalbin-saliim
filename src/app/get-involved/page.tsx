// src/app/get-involved/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { submitVolunteerApplication } from '@/app/actions/volunteer'
import { Heart, Users, Globe, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function GetInvolvedPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    
    const formData = new FormData(e.currentTarget)
    const result = await submitVolunteerApplication(formData)
    
    if (result.success) {
      setStatus('success')
      setMessage(result.message)
      // Optional: clear form or redirect after delay
      setTimeout(() => router.push('/get-involved/success'), 1500)
    } else {
      setStatus('error')
      setMessage(result.message)
    }
  }

  if (status === 'success') {
    return (
      <div className="py-24 px-6 md:px-12 text-center min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Thank You for Applying!</h1>
          <p className="text-gray-600 text-lg">
            Your volunteer application has been received. Our team will review it and contact you within 3-5 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/"><Button>Return Home</Button></Link>
            <Link href="/causes"><Button variant="outline">Explore Our Causes</Button></Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link href="/impact" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" /> Back to Impact
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Join Our Mission
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Become a Volunteer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your time, skills, and passion can create lasting change. Fill out the form below and we'll connect you with opportunities that match your interests.
          </p>
        </div>

        {/* Ways to Help */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Users, title: 'On-the-Ground', desc: 'Work directly with communities in education, healthcare, or water projects.' },
            { icon: Globe, title: 'Remote Support', desc: 'Help with fundraising, content creation, translation, or admin tasks from anywhere.' },
            { icon: Heart, title: 'Skills-Based', desc: 'Offer professional expertise in design, development, marketing, or strategy.' },
          ].map((item) => (
            <div key={item.title} className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-md transition">
              <item.icon className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input required name="name" type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Qalbin Saliim" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input required name="email" type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="qalbin@example.com" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input name="phone" type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="+256 7XX XXX XXX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location/City</label>
              <input name="location" type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Kampala, Uganda" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Area of Interest *</label>
            <select required name="interest" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white">
              <option value="">Select an area</option>
              <option value="education">Education Support</option>
              <option value="healthcare">Healthcare</option>
              <option value="water">Clean Water Projects</option>
              <option value="outreach">Community Outreach</option>
              <option value="fundraising">Fundraising</option>
              <option value="admin">Administrative</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
            <select name="availability" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white">
              <option value="">Select availability</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Flexible">Flexible</option>
              <option value="One-time Event">One-time Event</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relevant Skills or Experience</label>
            <textarea name="skills" rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Tell us about your background, skills, or relevant experience..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Why do you want to volunteer with us? *</label>
            <textarea required name="message" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Share your motivation and what you hope to contribute..."></textarea>
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-sm ${status === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {message}
            </div>
          )}

          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-95"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Submitting...
              </span>
            ) : 'Submit Application'}
          </Button>

          <p className="text-xs text-center text-gray-500">
            🔒 Your information is secure. We only use it to contact you about volunteer opportunities.
          </p>
        </form>
      </div>
    </div>
  )
}