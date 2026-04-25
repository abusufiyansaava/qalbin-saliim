// src/app/actions/donate.ts
'use server'

import { stripe } from '@/lib/stripe'
import { client } from '@/lib/sanity'
import { headers } from 'next/headers'

export async function createCheckoutSession(amount: number, causeId?: string) {
  try {
    // 1. Update Sanity immediately for real-time UI feedback (Test Mode)
    // ⚠️ Production: Move this to a Stripe Webhook for security
    if (causeId) {
      await client.patch(causeId)
        .set({ 
          raised: { 
            _type: 'number', 
            current: (await client.getDocument(causeId))?.raised?.current || 0 + amount 
          } 
        })
        .commit()
    }

    // 2. Create Stripe Checkout Session
    const headersList = headers()
    const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_BASE_URL

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { 
            name: causeId ? `Donation to Cause #${causeId}` : 'General Donation to Qalbin Salim',
            description: 'Secure donation via Stripe',
          },
          unit_amount: Math.round(amount * 100), // Stripe expects cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&amount=${amount}`,
      cancel_url: `${origin}/donate?canceled=true`,
      metadata: { causeId: causeId || 'general', amount: amount.toString() },
    })

    return { success: true, url: session.url }
  } catch (error) {
    console.error('Stripe Error:', error)
    return { success: false, error: 'Failed to create checkout session' }
  }
}