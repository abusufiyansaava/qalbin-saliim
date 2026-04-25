import { defineField, defineType } from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'Partner / Community Logo',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Organization Name', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})