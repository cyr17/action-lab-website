import { HeaderClient } from '@/components/Header/index.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { MegaMenu } from '../../../payload-types'
export async function Header() {
  const megaMenu: MegaMenu = await getCachedGlobal('mega-menu', 1)()

  return <HeaderClient megaMenu={megaMenu} />
}
