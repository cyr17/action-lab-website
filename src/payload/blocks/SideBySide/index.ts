import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ChecklistFeature,
  lexicalEditor,

} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'
import { check } from 'prettier'

const columnFields: Field[] = [
  
  
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
        ]
      },
    }),
    label: false,
  },
]

export const SideBySide: Block = {
  slug: 'sideBySide',
  fields: [
    {
      name: 'leftSide',
      type: 'array',
      fields: columnFields,
    },
    {
      name: 'rightSide',
      type: 'array',
      fields: columnFields,
    },
  ],
}
