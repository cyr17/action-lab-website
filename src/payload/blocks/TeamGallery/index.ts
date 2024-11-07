import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TeamGallery: Block = {
  slug: 'gallery',
  fields: [
    {
      name: 'blockColor',
      type: 'select',
      defaultValue: 'white',
      options: [
        {
          label: 'White',
          value: 'white',
        },
        {
          label: 'Gray',
          value: 'gray',
        },
        {
          label: 'Black',
          value: 'black',
        },
        {
          label: 'Orange',
          value: 'orange',
        },
        {
          label: 'Red',
          value: 'red',
        },
        {
          label: 'Green',
          value: 'green',
        },
        {
          label: 'Yellow',
          value: 'yellow',
        },
        {
          label: 'Blue',
          value: 'blue',
        },
        {
          label: 'Pink',
          value: 'pink',
        },
        {
          label: 'Purple',
          value: 'purple',
        },
      ],
    },
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'relationTo',
      type: 'select',
      defaultValue: 'people',
      label: 'Collections To Show',
      options: [
        {
          label: 'People',
          value: 'people',
        },
      ],
    },
  ],
  labels: {
    plural: 'Gallery',
    singular: 'Gallery',
  },
}
