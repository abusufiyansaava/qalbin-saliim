// src/sanity/schemaTypes/homeSettings.ts
import { defineField, defineType } from 'sanity'

export const homeSettings = defineType({
  name: 'homeSettings',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Recommended: 1920x1080px, impactful community photo',
    }),
    defineField({
      name: 'heroOverlay',
      title: 'Overlay Style',
      type: 'string',
      options: { list: ['dark', 'light', 'gradient'] },
      initialValue: 'gradient',
    }),
  ],
})