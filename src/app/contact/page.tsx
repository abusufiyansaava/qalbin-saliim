// src/app/contact/page.tsx
import { client } from '@/lib/sanity'
import { FAQAccordion } from '@/components/contact/FAQAccordion'
import { ContactForm } from '@/components/contact/ContactForm'
import { MapPin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

// 🔑 FAQ Query
const FAQ_QUERY = `*[_type == "faq" && featured == true] | order(order asc) {
  _id, question, answer, category
}`

export default async function ContactPage() {
  let faqs: any[] = []
  try {
    faqs = await client.fetch(FAQ_QUERY)
  } catch (error) {
    console.warn('Failed to fetch FAQs:', error)
  }

  return (
    <div className="py-16 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our programs, want to partner, or need donation receipts? We're here to help.
          </p>
        </div>

        {/* Contact Info + Form (2-column layout) */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><MapPin className="w-6 h-6" /></div>
                <div>
                  <p className="font-semibold text-gray-900">Headquarters</p>
                  <p className="text-gray-600">Kampala, Uganda</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Mail className="w-6 h-6" /></div>
                <div>
                  <p className="font-semibold text-gray-900">Email Us</p>
                  <p className="text-gray-600">info@qalbinsaliim.org</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Phone className="w-6 h-6" /></div>
                <div>
                  <p className="font-semibold text-gray-900">Call Us</p>
                  <p className="text-gray-600">+256 752 040 267</p>
                  <p className="text-gray-600">+256 751 757 133</p>
                  <p className="text-gray-600">+256 756 808 274</p>
                  <p className="text-gray-600">+256 780 112 353</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Phone className="w-6 h-6" /></div>
                <div>
                  <p className="font-semibold text-gray-900">For Support</p>
                  <p className="text-gray-600">+256 764 455 600</p>
                  <p className="text-gray-600">+256 741 378 654</p>
                </div>

              </div>
            </div>

{/* ✅ WhatsApp CTA - FIXED */}
<div className="pt-6 border-t border-gray-200">
  <p className="text-sm font-medium text-gray-700 mb-3">Prefer quick chat? Reach us on WhatsApp:</p>
  
              {/* ✅ Correct WhatsApp link format */}
              <a
                href="https://wa.me/256780112353?text=Hello%20Qalbin%20Saliim%2C%20I%20would%20like%20to%20inquire%20about%20your%20programs."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-semibold transition shadow-sm hover:shadow-md active:scale-95"
                aria-label="Chat with Qalbin Saliim on WhatsApp"
              >
                {/* ✅ WhatsApp SVG Icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
              
              <p className="text-xs text-gray-500 mt-2">Usually replies within 1 hour during business hours.</p>
            </div>
          </div>

          {/* Contact Form (Client Component) */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <ContactForm />
          </div>
        </div>

        {/* FAQ Section (Full-width, above form) */}
        <section className="py-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions. Still need help? Send us a message above.</p>
          </div>
          
          {faqs.length > 0 ? (
            <FAQAccordion faqs={faqs} />
          ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">FAQs will appear here once added to the CMS.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}