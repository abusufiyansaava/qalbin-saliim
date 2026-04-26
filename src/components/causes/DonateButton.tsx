// src/components/causes/DonateButton.tsx (if still used)
'use client'
import { Button } from '@/components/ui/Button'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export function DonateButton({ causeId, title }: { causeId: string, title: string }) {
  const donateUrl = `/donate?causeId=${causeId}&causeName=${encodeURIComponent(title)}`
  return (
    <Link href={donateUrl}>
      <Button size="lg" className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-95">
        <Heart className="w-4 h-4 mr-2" /> Support This Cause
      </Button>
    </Link>
  )
}