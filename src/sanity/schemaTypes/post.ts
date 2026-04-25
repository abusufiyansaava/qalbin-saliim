// src/sanity/schemaTypes/post.ts
import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'excerpt', title: 'Short Summary', type: 'text', rows: 2 }),
    defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'mainImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime', initialValue: () => new Date().toISOString() }),
  ],
})