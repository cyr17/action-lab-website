'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '../../../payload-types'

import { Logo } from '../Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
    className="sticky top-0 h-16 border-t border-border bg-black bg-opacity-90 text-white z-20 py-8 flex justify-between w-full"
    {...(theme ? { 'data-theme': theme } : {})}
  >
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/">
        <Logo />
      </Link>
      <HeaderNav header={header} />
    </div>
  </header>
  )
}
