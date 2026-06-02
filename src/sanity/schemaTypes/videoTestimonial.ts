// src/sanity/schemaTypes/videoTestimonial.ts
import { defineField, defineType } from 'sanity'

export const videoTestimonial = defineType({
  name: 'videoTestimonial',
  title: 'Video Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'speakerName',
      title: 'Speaker Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'speakerLocation',
      title: 'Speaker Location',
      type: 'string',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    
    // ✅ HYBRID VIDEO FIELD: Choose upload or link
    defineField({
      name: 'video',
      title: 'Video Source',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Video Type',
          type: 'string',
          options: {
            list: [
              { title: '🔗 External Link (YouTube/Vimeo)', value: 'external' },
              { title: '📤 Direct Upload (Max 100MB)', value: 'upload' },
            ],
            layout: 'radio',
          },
          initialValue: 'external',
        },
        {
          name: 'externalUrl',
          title: 'External Video URL',
          type: 'url',
          description: 'Paste YouTube, Vimeo, or direct MP4 link',
          hidden: ({ parent }) => parent?.type !== 'external',
        },
        {
          name: 'uploadedFile',
          title: 'Upload Video File',
          type: 'file',
          description: 'MP4, WebM, or MOV. Max 100MB recommended.',
          hidden: ({ parent }) => parent?.type !== 'upload',
          options: {
            accept: 'video/mp4,video/webm,video/quicktime',
          },
        },
      ],
      validation: (Rule) => 
        Rule.custom((video) => {
          if (!video) return 'Video source is required'
          if (video.type === 'external' && !video.externalUrl) {
            return 'Please enter an external video URL'
          }
          if (video.type === 'upload' && !video.uploadedFile) {
            return 'Please upload a video file'
          }
          return true
        }),
    }),
    
    defineField({
      name: 'featured',
      title: 'Featured on Impact Page',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 10,
    }),
  ],
  orderings: [
    { title: 'Featured First', name: 'featuredDesc', by: [{ field: 'featured', direction: 'desc' }, { field: 'order', direction: 'asc' }] },
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})