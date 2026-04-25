// src/components/shared/NewsletterForm.tsx
'use client'

import { useState } from 'react'
import { subscribeToNewsletter } from '@/app/actions/newsletter'

export function NewsletterForm({ source = 'Homepage' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setStatus('loading')
    setMessage('')
    
    const result = await subscribeToNewsletter(email, source)
    
    if (result.success) {
      setStatus('success')
      setMessage(result.message)
      setEmail('')
    } else {
      setStatus('error')
      setMessage(result.message)
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center">
        <p className="font-medium">{message}</p>
        <button 
          onClick={() => { setStatus('idle'); setMessage('') }} 
          className="text-sm underline mt-1 hover:text-green-900"
        >
          Subscribe another email
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        required
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') { setStatus('idle'); setMessage('') } }}
        placeholder="Your email address"
        disabled={status === 'loading'}
        className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === 'loading' || !email}
        className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin h-4 w-4 border-2 border-blue-700 border-t-transparent rounded-full"></span>
            Subscribing...
          </span>
        ) : 'Subscribe'}
      </button>
      {message && status === 'error' && (
        <p className="text-red-200 text-sm mt-2 text-center sm:text-left">{message}</p>
      )}
    </form>
  )
}