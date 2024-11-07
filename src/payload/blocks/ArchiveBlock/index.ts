import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Archive: Block = {
  slug: 'archive',
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
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'solutions',
      label: 'Collections To Show',
      options: [
        {
          label: 'Case Studies',
          value: 'caseStudies',
        },
        {
          label: 'Solutions',
          value: 'solutions',
        },
        {
          label: 'Impact Areas',
          value: 'impactAreas',
        },
        {
          label: 'People',
          value: 'people',
        },
      ],
    },
    {
      name: 'impactAreas',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      hasMany: true,
      label: 'Impact Areas To Show',
      relationTo: 'impactAreas',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: ['caseStudies','solutions','impactAreas','people'],
    },
  ],
  labels: {
    plural: 'Archives',
    singular: 'Archive',
  },
}
