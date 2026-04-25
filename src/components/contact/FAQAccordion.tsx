// src/components/contact/FAQAccordion.tsx
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  _id: string
  question: string
  answer: any[] // Sanity block content
  category?: string
}

interface FAQAccordionProps {
  faqs: FAQItem[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(faqs.map(f => f.category).filter(Boolean)))]

  const filteredFaqs = filter === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === filter)

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  // Simple block content renderer for FAQ answers
  const renderBlockContent = (blocks: any[]) => {
    return blocks.map((block, i) => {
      if (block._type === 'block') {
        return (
          <p key={i} className="text-gray-600 leading-relaxed mb-3 last:mb-0">
            {block.children?.map((child: any, j: number) => (
              <span key={j} className={child.marks?.includes('strong') ? 'font-semibold' : ''}>
                {child.text}
              </span>
            ))}
          </p>
        )
      }
      return null
    })
  }

  if (faqs.length === 0) return null

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Category Filter */}
      {categories.length > 2 && (
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Items */}
      <div className="divide-y divide-gray-100">
        {filteredFaqs.map((faq) => (
          <div key={faq._id} className="group">
            <button
              onClick={() => toggleFAQ(faq._id)}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-expanded={openId === faq._id}
              aria-controls={`faq-answer-${faq._id}`}
            >
              <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  openId === faq._id ? 'rotate-180 text-primary' : ''
                }`} 
              />
            </button>
            
            <div
              id={`faq-answer-${faq._id}`}
              role="region"
              aria-labelledby={`faq-question-${faq._id}`}
              className={`overflow-hidden transition-all duration-300 ${
                openId === faq._id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-5 pt-0 text-gray-600">
                {renderBlockContent(faq.answer)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}