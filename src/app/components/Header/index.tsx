import { HeaderClient } from '@/components/Header/index.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '../../../payload-types'
import type { MegaMenu } from '../../../payload-types'
export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)()
  const megaMenu: MegaMenu = await getCachedGlobal('mega-menu', 1)()

  return <HeaderClient header={header} megaMenu={megaMenu} />
}
