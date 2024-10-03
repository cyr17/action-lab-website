import type { GlobalConfig } from 'payload'

import { link } from '../../fields/link'
import { revalidateMegaMenu } from './hooks/revalidateMegaMenu'

export const MegaMenu: GlobalConfig = {
  slug: 'mega-menu',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateMegaMenu],
  },
}
