import type { GlobalConfig,Field } from 'payload'

import { link } from '../../fields/link'
import { revalidateSocialMedia } from './hooks/revalidateSocialMedia'


export const SocialMedia: GlobalConfig = {
  slug: 'social-media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'media',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
            options: [
                {
                label: 'Facebook',
                value: 'facebook',
                },
                {
                label: 'Instagram',
                value: 'instagram',
                },
                {
                label: 'Twitter',
                value: 'twitter',
                },
                {
                label: 'LinkedIn',
                value: 'linkedin',
                },
            ],
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSocialMedia],
  },
}
