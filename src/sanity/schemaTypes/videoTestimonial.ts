// src/sanity/schemaTypes/videoTestimonial.ts
import { defineField, defineType } from 'sanity'

export const videoTestimonial = defineType({
  name: 'videoTestimonial',
  title: 'Video Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: Rule => Rule.required() }),
    defineField({ name: 'speakerName', title: 'Speaker Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'speakerLocation', title: 'Speaker Location', type: 'string' }),
    defineField({ name: 'thumbnail', title: 'Thumbnail Image', type: 'image', options: { hotspot: true }, validation: Rule => Rule.required() }),
    defineField({ name: 'videoUrl', title: 'Video URL', type: 'url', description: 'YouTube, Vimeo, or direct MP4 link' }),
    defineField({ name: 'duration', title: 'Duration', type: 'string', description: 'e.g., "2:45"' }),
    defineField({ name: 'featured', title: 'Featured on Impact Page', type: 'boolean', initialValue: true }),
  ],
})