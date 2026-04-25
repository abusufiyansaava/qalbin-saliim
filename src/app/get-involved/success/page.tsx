// src/app/get-involved/success/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { CheckCircle, ArrowLeft } from 'lucide-react'

export default function VolunteerSuccessPage() {
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