// src/sanity/schemaTypes/faq.ts
import { defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'array', of: [{ type: 'block' }], validation: Rule => Rule.required() }),
    defineField({ 
      name: 'category', 
      title: 'Category', 
      type: 'string', 
      options: { 
        list: [
          { title: 'Donations', value: 'donations' },
          { title: 'Volunteering', value: 'volunteering' },
          { title: 'Transparency', value: 'transparency' },
          { title: 'Programs', value: 'programs' },
          { title: 'General', value: 'general' },
        ] 
      } 
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'featured', title: 'Show on Contact Page', type: 'boolean', initialValue: true }),
  ],
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Category', name: 'categoryAsc', by: [{ field: 'category', direction: 'asc' }] },
  ],
})