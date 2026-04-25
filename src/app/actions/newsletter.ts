// src/app/actions/newsletter.ts
'use server'

import { writeClient } from '@/lib/sanity'
import { headers } from 'next/headers'

// Optional: Resend for email confirmation (free tier: 100 emails/day)
// import { Resend } from 'resend'
// const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToNewsletter(email: string, source: string = 'Homepage') {
  try {
    // 1. Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, message: 'Please enter a valid email address.' }
    }

    // 2. Check for duplicate subscription
    const existing = await writeClient.fetch(
      `*[_type == "newsletterSubscription" && email == $email][0]`,
      { email }
    )
    
    if (existing) {
      if (existing.unsubscribed) {
        // Re-subscribe: mark as active again
        await writeClient.patch(existing._id).set({ unsubscribed: false, subscribedAt: new Date().toISOString() }).commit()
        return { success: true, message: 'Welcome back! You\'ve been re-subscribed.' }
      }
      return { success: true, message: 'You\'re already subscribed! Check your inbox for updates.' }
    }

    // 3. Create new subscription
    const headersList = headers()
    const ipAddress = headersList.get('x-forwarded-for')?.split(',')[0] || 'unknown'

    await writeClient.create({
      _type: 'newsletterSubscription',
      email: email.toLowerCase().trim(),
      source,
      ipAddress,
      subscribedAt: new Date().toISOString(),
      confirmed: false, // Set to true if you skip email confirmation
    })

    // 4. Optional: Send confirmation email via Resend
    // if (process.env.RESEND_API_KEY) {
    //   await resend.emails.send({
    //     from: 'Qalbin Salim <updates@yourdomain.com>',
    //     to: email,
    //     subject: 'Confirm your subscription to Qalbin Salim updates',
    //     html: `
    //       <h2>Thank you for subscribing! 🎉</h2>
    //       <p>Click below to confirm your email and start receiving updates:</p>
    //       <a href="${process.env.NEXT_PUBLIC_BASE_URL}/confirm?token=xxx" style="background:#2563EB;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;margin:16px 0;">Confirm Email</a>
    //       <p>If you didn't subscribe, you can safely ignore this email.</p>
    //     `,
    //   })
    //   return { success: true, message: 'Check your email to confirm your subscription!' }
    // }

    return { success: true, message: 'Thank you for subscribing! You\'ll receive updates soon.' }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return { success: false, message: 'Failed to subscribe. Please try again.' }
  }
}