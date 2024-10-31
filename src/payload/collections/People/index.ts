import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

import { anyone } from 'src/payload/access/anyone'
export const People: CollectionConfig = {
  slug: 'people',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'slug','email'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'role',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      defaultValue: 'researcher',
      options: [
        {
          label: 'Researcher',
          value: 'researcher',
        },
        {
          label: 'Research Assistant',
          value: 'assistant',
        },
        {
          label: 'Research Engineer',
          value: 'engineer',
        },
        {
          label: 'Research Associate',
          value: 'associate',
        },
        {
          label: 'Alumni',
          value: 'alumni',
        },
      ],
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Biography',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

