import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function SuccessPage() {
  return (
    <div className="py-24 px-6 md:px-12 text-center bg-gray-50 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">✓</div>
        <h1 className="text-3xl font-bold text-gray-900">Thank You!</h1>
        <p className="text-gray-600">Your donation has been received. A receipt will be sent to your email shortly.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/"><Button>Return Home</Button></Link>
          <Link href="/causes"><Button variant="outline">View Other Causes</Button></Link>
        </div>
      </div>
    </div>
  )
}