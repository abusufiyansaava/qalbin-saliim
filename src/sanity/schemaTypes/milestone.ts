// src/sanity/schemaTypes/milestone.ts
import { defineField, defineType } from 'sanity'

export const milestone = defineType({
  name: 'milestone',
  title: 'Impact Milestone',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Boreholes Drilled", "Students Educated"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Number/Value',
      type: 'string',
      description: 'e.g., "3", "30+", "8"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Mayuge District", "Eastern Uganda"',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: '💧 Droplets', value: 'droplets' },
          { title: '🎓 Graduation Cap', value: 'graduationCap' },
          { title: '❤️ Heart', value: 'heart' },
          { title: '👥 Users', value: 'users' },
          { title: '🏆 Award', value: 'award' },
          { title: '📈 Trending Up', value: 'trendingUp' },
          { title: '🎯 Target', value: 'target' },
          { title: '🤝 Handshake', value: 'handHeart' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'heart',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 10,
    }),
    defineField({
      name: 'featured',
      title: 'Show on Impact Page',
      type: 'boolean',
      description: 'Toggle to show/hide this milestone',
      initialValue: true,
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Title', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
})