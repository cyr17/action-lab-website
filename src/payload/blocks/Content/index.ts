import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ChecklistFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,


} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'
import { check } from 'prettier'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'alignment',
    type: 'select',
    defaultValue: 'left',
    options: [
      {
        label: 'Left',
        value: 'left',
      },
      {
        label: 'Center',
        value: 'center',
      },
      {
        label: 'Right',
        value: 'right',
      },
    ],
  },
  {
    name: 'textColor',
    type: 'radio',
    defaultValue: 'black',
    options: [
      {
        label: 'Black',
        value: 'black',
      },
      {
        label: 'White',
        value: 'white',
      },
      {
        label: 'Grey',
        value: 'grey',
      },
      {
        label: 'Red',
        value: 'red',
      }

    ],

  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1','h2', 'h3', 'h4', 'h5' , 'h6'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          ChecklistFeature(), 
          OrderedListFeature(),
          UnorderedListFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  fields: [
    {
      name: 'Color',
      type: 'radio',
      defaultValue: 'black',
      options: [
        {
          label: 'Black',
          value: 'black',
        },
        {
          label: 'White',
          value: 'white',
        },
        {
          label: 'Grey',
          value: 'grey',
        },
        {
          label: 'Red',
          value: 'red',
        }
      ],

    },
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
    },
  ],
}
