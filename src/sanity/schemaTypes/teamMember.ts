// src/sanity/schemaTypes/teamMember.ts
import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', title: 'Job Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'bio', title: 'Short Bio', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Profile Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'social', title: 'Social Links', type: 'object', fields: [
      { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
      { name: 'twitter', title: 'Twitter URL', type: 'url' },
    ]}),
    // ✅ ADD THIS FIELD:
    defineField({ 
      name: 'order', 
      title: 'Display Order', 
      type: 'number', 
      description: 'Lower numbers appear first. E.g., 1 = Founder, 2 = Director, 3 = Manager',
      initialValue: 10,
    }),
  ],
  // ✅ Optional: Set default ordering in Sanity Studio
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Name', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
})