// sanity/schemaTypes/cause.ts
import { defineField, defineType } from 'sanity'

export const cause = defineType({
  name: 'cause',
  title: 'Cause',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'raised',
      title: 'Amount Raised ($)',
      type: 'number',
    }),
    defineField({
      name: 'goal',
      title: 'Goal Amount ($)',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    // Inside the fields array in cause.ts, add:
    defineField({
      name: 'featured',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Check this to display this cause in the Featured Causes section on the homepage',
      initialValue: false,
    }),
  ],
})