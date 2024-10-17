import type { GlobalConfig,Field } from 'payload'

import { link } from '../../fields/link'
import { revalidateFooterMedia } from './hooks/revalidateFooterMedia'


export const FooterMedia: GlobalConfig = {
  slug: 'footer-media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateFooterMedia],
  },
}
