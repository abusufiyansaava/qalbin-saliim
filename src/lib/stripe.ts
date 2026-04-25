// src/lib/stripe.ts
import Stripe from 'stripe'

// 🔑 Server-side only. Never exposed to browser.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})