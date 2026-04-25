// src/components/causes/DonateButton.tsx
'use client' // ✅ Must be FIRST line

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
// ✅ FIXED: Import the correct function name
import { createCheckoutSession } from '@/app/actions/donate'

export function DonateButton({ causeId, goal, raised }: { 
  causeId: string, 
  goal: number, 
  raised: number 
}) {
  const [amount, setAmount] = useState(25)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDonate = async () => {
    setLoading(true)
    setError('')
    // ✅ FIXED: Call the correct function name
    const result = await createCheckoutSession(amount, causeId)
    if (result.success && result.url) {
      window.location.href = result.url
    } else {
      setError(result.error || 'Failed to process donation')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 pt-4 border-t border-gray-100">
      <p className="text-sm font-medium text-gray-700">Choose amount</p>
      <div className="flex gap-3">
        {[10, 25, 50, 100].map((val) => (
          <button
            key={val}
            onClick={() => setAmount(val)}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              amount === val ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ${val}
          </button>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button 
        size="lg" 
        className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-95" 
        onClick={handleDonate}
        disabled={loading || amount < 1}
      >
        {loading ? 'Processing...' : `Donate $${amount}`}
      </Button>
      <p className="text-xs text-center text-gray-500">🔒 Secure checkout via Stripe. Test mode active.</p>
    </div>
  )
}