// src/app/actions/bank-donation.ts
'use server'

import { writeClient } from '@/lib/sanity'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function submitBankDonation(formData: FormData) {
  try {
    // 1. Extract and validate form data
    const donorName = formData.get('donorName') as string
    const donorEmail = formData.get('donorEmail') as string
    const amount = parseFloat(formData.get('amount') as string)
    const currency = formData.get('currency') as string
    const bankName = formData.get('bankName') as string
    const transactionRef = formData.get('transactionRef') as string
    const causeId = formData.get('causeId') as string | null
    const message = formData.get('message') as string

    if (!donorName || !donorEmail || !amount || amount < 1) {
      return { success: false, message: 'Please fill in all required fields.' }
    }

    // 2. Create donation record in Sanity (CREATE only - no UPDATE needed)
    const donation = await writeClient.create({
      _type: 'bankDonation',
      donorName,
      donorEmail: donorEmail.toLowerCase().trim(),
      amount,
      currency,
      bankName,
      transactionRef,
      // Store cause reference for reporting, but don't update cause.raised here
      causeId: causeId ? { _type: 'reference', _ref: causeId } : undefined,
      message,
      submittedAt: new Date().toISOString(),
      status: 'Pending', // Admins verify in Sanity Studio
    })

    // 3. Send confirmation email via Resend (if configured)
    if (resend && process.env.NEXT_PUBLIC_BASE_URL) {
      await resend.emails.send({
        from: 'Qalbin Saliim <donations@qalbinsalim.org>',
        to: donorEmail,
        subject: `Thank You for Your Donation of ${currency} ${amount}!`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1E40AF; margin-bottom: 16px;">Thank You for Your Generosity! 🙏</h2>
            <p>Dear ${donorName},</p>
            <p>Thank you for your donation of <strong>${currency} ${amount.toLocaleString()}</strong> to Qalbin Salim Charity Organisation.</p>
            
            <div style="background: #F8FAFC; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 4px 0;"><strong>Transaction Reference:</strong> ${transactionRef || 'Pending verification'}</p>
              <p style="margin: 4px 0;"><strong>Bank Used:</strong> ${bankName}</p>
              <p style="margin: 4px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString('en-UG')}</p>
              ${causeId ? `<p style="margin: 4px 0;"><strong>Designated For:</strong> ${causeId}</p>` : ''}
            </div>

            <p>Your support helps us provide clean water, education, and healthcare to underserved communities across Africa.</p>
            
            <p><strong>Next Steps:</strong></p>
            <ul style="padding-left: 20px;">
              <li>Our team will verify your transfer within 1-2 business days</li>
              <li>You'll receive a tax receipt once confirmed</li>
              <li>Questions? Reply to this email or contact us at info@qalbinsalim.org</li>
            </ul>

            <p style="margin-top: 24px; color: #64748B; font-size: 14px;">
              Qalbin Salim Charity Organisation<br>
              123 Compassion Ave, Kampala, Uganda<br>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="color: #2563EB;">${process.env.NEXT_PUBLIC_BASE_URL}</a>
            </p>
          </div>
        `,
      })
    }

    return { 
      success: true, 
      message: 'Donation submitted successfully! Check your email for confirmation.',
      donationId: donation._id 
    }
  } catch (error) {
    console.error('Bank donation error:', error)
    return { success: false, message: 'Failed to submit donation. Please try again or contact us directly.' }
  }
}