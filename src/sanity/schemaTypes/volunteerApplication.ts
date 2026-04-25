// src/sanity/schemaTypes/volunteerApplication.ts
import { defineField, defineType } from 'sanity'

export const volunteerApplication = defineType({
  name: 'volunteerApplication',
  title: 'Volunteer Application',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: Rule => Rule.required().email() }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ 
      name: 'interest', 
      title: 'Area of Interest', 
      type: 'string', 
      options: { 
        list: [
          { title: 'Education Support', value: 'education' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Clean Water Projects', value: 'water' },
          { title: 'Community Outreach', value: 'outreach' },
          { title: 'Fundraising', value: 'fundraising' },
          { title: 'Administrative', value: 'admin' },
          { title: 'Other', value: 'other' },
        ] 
      },
      validation: Rule => Rule.required()
    }),
    defineField({ name: 'skills', title: 'Relevant Skills', type: 'text', rows: 3 }),
    defineField({ name: 'availability', title: 'Availability', type: 'string', options: { list: ['Weekdays', 'Weekends', 'Flexible', 'One-time Event'] } }),
    defineField({ name: 'location', title: 'Location/City', type: 'string' }),
    defineField({ name: 'message', title: 'Why do you want to volunteer?', type: 'text', rows: 4 }),
    defineField({ name: 'submittedAt', title: 'Submission Date', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'status', title: 'Application Status', type: 'string', options: { list: ['New', 'Reviewed', 'Accepted', 'Declined'] }, initialValue: 'New' }),
  ],
  orderings: [{ title: 'Newest First', name: 'dateDesc', by: [{ field: 'submittedAt', direction: 'desc' }] }],
})