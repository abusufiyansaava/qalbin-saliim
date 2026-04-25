// src/app/donate/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { submitBankDonation } from '@/app/actions/bank-donation'
import { CheckCircle, Banknote, Mail, Phone, FileText, Loader2, Info } from 'lucide-react'

// 🔑 YOUR BANK DETAILS - UPDATE THESE WITH REAL INFO
const BANK_DETAILS = {
  accountName: 'Qalbin Saliim Organisation',
  accountNumber: '2002354694', // 🔑 REPLACE WITH REAL ACCOUNT NUMBER
  bankName: 'Tropical Bank Uganda',
  branch: 'Kampala Main Branch',
  swiftCode: '-',
  currency: 'USD / UGX',
  mobileMoney: {
    mtn: '+256 764 455 600', // 🔑 REPLACE WITH REAL MTN NUMBER
    airtel: '+256 741 378 654', // 🔑 REPLACE WITH REAL AIRTEL NUMBER
  },
  get instructions() {
    return [
      'Log in to your mobile banking app or visit any branch',
      `Select "Transfer" → "To Account" → Enter account number: ${this.accountNumber}`,
      `Enter amount and reference: "Donation - [Your Name]"`,
      'Complete the transfer and save the transaction reference',
      'Fill the form below with your details for confirmation',
    ]
  },
}

export default function DonatePage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [causes, setCauses] = useState<any[]>([])
  const [loadingCauses, setLoadingCauses] = useState(true)
  const [confirmSent, setConfirmSent] = useState(false)
  
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    amount: '',
    currency: 'USD',
    bankName: '',
    transactionRef: '',
    causeId: '',
    message: '',
  })

  useEffect(() => {
    async function fetchCauses() {
      try {
        const res = await fetch('/api/causes')
        if (!res.ok) throw new Error('Failed to fetch causes')
        const data = await res.json()
        setCauses(data)
      } catch (error) {
        console.warn('Failed to fetch causes:', error)
        setCauses([])
      } finally {
        setLoadingCauses(false)
      }
    }
    fetchCauses()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!confirmSent) {
      setMessage('Please confirm that you have sent the money before submitting.')
      setStatus('error')
      return
    }
    
    setStatus('submitting')
    setMessage('')

    const form = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value)
    })

    const result = await submitBankDonation(form)

    if (result.success) {
      setStatus('success')
      setMessage(result.message)
      setFormData({
        donorName: '', donorEmail: '', amount: '', currency: 'USD',
        bankName: '', transactionRef: '', causeId: '', message: '',
      })
      setConfirmSent(false)
    } else {
      setStatus('error')
      setMessage(result.message)
    }
  }

  // Inside DonatePage component, add this useEffect:
  useEffect(() => {
    // Check URL params for pre-selected cause
    const urlParams = new URLSearchParams(window.location.search)
    const causeId = urlParams.get('causeId')
    const causeName = urlParams.get('causeName')
    
    if (causeId && causes.length > 0) {
      // Wait for causes to load, then pre-select
      const timer = setTimeout(() => {
        const causeExists = causes.find(c => c._id === causeId)
        if (causeExists) {
          setFormData(prev => ({ ...prev, causeId }))
          setMessage(`Supporting: ${causeName || causeExists.title}`)
        }
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [causes])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (status === 'success') {
    return (
      <div className="py-24 px-6 md:px-12 text-center min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Thank You for Your Donation!</h1>
          <p className="text-gray-600 text-lg">{message}</p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left text-sm text-amber-800">
            <p className="font-medium mb-1 flex items-center gap-2">
              <Info className="w-4 h-4" />
              ⚠️ Important Next Step:
            </p>
            <p>Please complete your bank transfer or Mobile Money payment using the details on the previous page. 
            Your donation will be verified once the funds are received.</p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left text-sm text-blue-800">
            <p className="font-medium mb-2">What happens next?</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Our team will verify your transfer within 1-2 business days</li>
              <li>You'll receive an official tax receipt via email</li>
              <li>Questions? Reply to the confirmation email or contact us at info@qalbinsaliim.org</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="/" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition">
              Return Home
            </a>
            <a href="/causes" className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition">
              Explore Causes
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Make a Donation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your generosity powers clean water, education, and sustainable community growth. 
            Donate via bank transfer or Mobile Money — secure, direct, and 100% transparent.
          </p>
        </div>

        {/* ✅ Donation Flow Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <p className="font-medium text-blue-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            How Your Donation Works:
          </p>
          <ol className="text-sm text-blue-800 space-y-2">
            <li className="flex gap-2">
              <span className="font-bold bg-blue-200 text-blue-900 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
              <span>Fill out the form with your details and transaction reference</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold bg-blue-200 text-blue-900 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
              <span>Send money via Mobile Money or bank transfer using the details below</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold bg-blue-200 text-blue-900 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
              <span>Our team verifies your transfer within 1-2 business days</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold bg-blue-200 text-blue-900 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">4</span>
              <span>You receive an official tax receipt via email</span>
            </li>
          </ol>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bank Details Card */}
          <div className="space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Banknote className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-gray-900">Bank Transfer Details</h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Account Name</p>
                  <p className="font-semibold text-gray-900">{BANK_DETAILS.accountName}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Account Number</p>
                  <p className="font-mono font-semibold text-lg text-primary">{BANK_DETAILS.accountNumber}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Bank</p>
                    <p className="font-semibold text-gray-900">{BANK_DETAILS.bankName}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Branch</p>
                    <p className="font-semibold text-gray-900">{BANK_DETAILS.branch}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">SWIFT Code (International)</p>
                  <p className="font-mono font-semibold text-gray-900">{BANK_DETAILS.swiftCode}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Accepted Currencies</p>
                  <p className="font-semibold text-gray-900">{BANK_DETAILS.currency}</p>
                </div>
              </div>

              {/* Mobile Money */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Mobile Money (MTN / Airtel)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#FFB81C]/10 border border-[#FFB81C]/30 p-3 rounded-lg text-center">
                    <p className="text-xs text-[#FFB81C] font-medium mb-1">MTN</p>
                    <p className="font-mono font-semibold text-gray-900">{BANK_DETAILS.mobileMoney.mtn}</p>
                  </div>
                  <div className="bg-[#FF0000]/10 border border-[#FF0000]/30 p-3 rounded-lg text-center">
                    <p className="text-xs text-[#FF0000] font-medium mb-1">Airtel</p>
                    <p className="font-mono font-semibold text-gray-900">{BANK_DETAILS.mobileMoney.airtel}</p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm font-medium text-blue-900 mb-2">How to Donate:</p>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  {BANK_DETAILS.instructions.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-900">Secure & Transparent</p>
                <p className="text-sm text-green-800">
                  All donations go directly to Qalbin Saliim's account. We publish quarterly financial reports and send tax receipts for all contributions.
                </p>
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Donation Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input required name="donorName" value={formData.donorName} onChange={handleChange} type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Magembe Abusufiyan" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input required name="donorEmail" value={formData.donorEmail} onChange={handleChange} type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="abusufiyan@example.com" />
                </div>
              </div>

              {/* Amount & Currency */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                  <input required name="amount" value={formData.amount} onChange={handleChange} type="number" min="1" step="0.01" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select name="currency" value={formData.currency} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white">
                    <option value="USD">USD ($)</option>
                    <option value="UGX">UGX (USh)</option>
                  </select>
                </div>
              </div>

              {/* Bank & Reference */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select name="bankName" value={formData.bankName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white">
                    <option value="">Select method</option>
                    <option value="Stanbic Bank">Stanbic Bank</option>
                    <option value="Centenary Bank">Centenary Bank</option>
                    <option value="DFCU Bank">DFCU Bank</option>
                    <option value="MTN Mobile Money">MTN Mobile Money</option>
                    <option value="Airtel Money">Airtel Money</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Reference *</label>
                  <input required name="transactionRef" value={formData.transactionRef} onChange={handleChange} type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="e.g., MTN123456789" />
                  <p className="text-xs text-gray-500 mt-1">Found on your transfer receipt</p>
                </div>
              </div>

              {/* Cause Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Designate to a Cause (Optional)</label>
                <select name="causeId" value={formData.causeId} onChange={handleChange} disabled={loadingCauses} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white disabled:opacity-50">
                  <option value="">General Donation</option>
                  {loadingCauses ? (
                    <option disabled>Loading causes...</option>
                  ) : causes.length > 0 ? (
                    causes.map((cause) => (
                      <option key={cause._id} value={cause._id}>{cause.title}</option>
                    ))
                  ) : (
                    <option disabled>No causes available</option>
                  )}
                </select>
                {loadingCauses && <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Loading causes...</p>}
              </div>

              {/* Optional Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Share why you're donating or dedicate your gift..." />
              </div>

              {/* ✅ Confirmation Checkbox */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <input type="checkbox" id="confirmSent" checked={confirmSent} onChange={(e) => setConfirmSent(e.target.checked)} required className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary" />
                <label htmlFor="confirmSent" className="text-sm text-gray-700">
                  <span className="font-medium">I confirm I have sent the money</span> using the bank details or Mobile Money numbers above, and the transaction reference I entered is correct.
                </label>
              </div>

              {/* Status Messages */}
              {message && (
                <div className={`p-4 rounded-lg text-sm ${status === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {message}
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-95" disabled={status === 'submitting' || !confirmSent}>
                {status === 'submitting' ? (
                  <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</span>
                ) : 'Submit Donation Details'}
              </Button>

              <p className="text-xs text-center text-gray-500">
                🔒 Your information is secure. We only use it to verify your donation and send receipts.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}