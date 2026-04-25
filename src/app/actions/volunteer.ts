// src/app/actions/volunteer.ts
'use server'

import { writeClient } from '@/lib/sanity' // ✅ Use write client
import { revalidatePath } from 'next/cache'

export async function submitVolunteerApplication(formData: FormData) {
  try {
    const application = {
      _type: 'volunteerApplication',
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      interest: formData.get('interest'),
      skills: formData.get('skills'),
      availability: formData.get('availability'),
      location: formData.get('location'),
      message: formData.get('message'),
      submittedAt: new Date().toISOString(),
      status: 'New',
    }

    // ✅ Use writeClient for mutations
    await writeClient.create(application)
    
    return { success: true, message: 'Application submitted successfully!' }
  } catch (error) {
    console.error('Volunteer application error:', error)
    return { success: false, message: 'Failed to submit application. Please try again.' }
  }
}