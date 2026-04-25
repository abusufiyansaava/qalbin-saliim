// src/sanity/schemaTypes/transformation.ts
import { defineField, defineType } from 'sanity'

export const transformation = defineType({
  name: 'transformation',
  title: 'Transformation Story',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'beforeText', title: 'Before (Challenge)', type: 'text', rows: 2, validation: Rule => Rule.required() }),
    defineField({ name: 'afterText', title: 'After (Impact)', type: 'text', rows: 2, validation: Rule => Rule.required() }),
    defineField({ name: 'image', title: 'Comparison Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'stat', title: 'Impact Stat', type: 'string', description: 'e.g., "87 wells built • 12,400+ people served"' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})