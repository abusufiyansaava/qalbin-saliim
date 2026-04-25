import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function CancelPage() {
  return (
    <div className="py-24 px-6 md:px-12 text-center bg-gray-50 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto text-3xl">↩</div>
        <h1 className="text-3xl font-bold text-gray-900">Payment Canceled</h1>
        <p className="text-gray-600">No charges were made. You can safely try again or browse other ways to help.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donate"><Button>Try Again</Button></Link>
          <Link href="/"><Button variant="outline">Go Home</Button></Link>
        </div>
      </div>
    </div>
  )
}