// src/sanity/schemaTypes/report.ts
import { defineField, defineType } from 'sanity'

export const report = defineType({
  name: 'report',
  title: 'Report / Document',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Report Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'file', title: 'PDF File', type: 'file', options: { accept: '.pdf' }, validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 2 }),
    defineField({ 
      name: 'category', 
      title: 'Category', 
      type: 'string', 
      options: { list: ['Annual Report', 'Financial Summary', 'Impact Report', 'Policy Document'] } 
    }),
    defineField({ name: 'publishedAt', title: 'Publication Date', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'featured', title: 'Show on Impact Page', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Newest First', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
})