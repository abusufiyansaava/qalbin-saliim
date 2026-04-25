// src/sanity/schemaTypes/newsletterSubscription.ts
import { defineField, defineType } from 'sanity'

export const newsletterSubscription = defineType({
  name: 'newsletterSubscription',
  title: 'Newsletter Subscription',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email Address', type: 'string', validation: Rule => Rule.required().email() }),
    defineField({ name: 'source', title: 'Source Page', type: 'string', options: { list: ['Homepage', 'Blog', 'Impact', 'Other'] }, initialValue: 'Homepage' }),
    defineField({ name: 'ipAddress', title: 'IP Address (Optional)', type: 'string' }),
    defineField({ name: 'subscribedAt', title: 'Subscription Date', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'confirmed', title: 'Email Confirmed', type: 'boolean', initialValue: false }),
    defineField({ name: 'unsubscribed', title: 'Unsubscribed', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Newest First', name: 'dateDesc', by: [{ field: 'subscribedAt', direction: 'desc' }] }],
  // Prevent duplicate emails
  preview: {
    select: { email: 'email', source: 'source' },
    prepare: ({ email, source }) => ({ title: email, subtitle: source }),
  },
})