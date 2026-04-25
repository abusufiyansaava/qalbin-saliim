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
  ],
})