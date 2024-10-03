import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { MegaMenu } from '../../../payload-types'

import { ThemeSelector } from '../../providers/Theme/ThemeSelector'
import { CMSLink } from '../Link'

export async function MegaMenu() {
  const megaMenu: MegaMenu = await getCachedGlobal('mega-menu')()

  const navItems = megaMenu?.navItems || []

  return(
    <div className="border-t border-border bg-black dark:bg-card text-white">
        <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-row md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
        </div>
    </div>
  )
}