'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Gutter, Button } from '@payloadcms/ui'
import type { MegaMenu } from '../../../payload-types'

import { Logo } from '../Logo/Logo'
import { Hamburger } from './Hamburger'
import { Modal, useModal, ModalToggler } from '@faceless-ui/modal'
import { CMSLink } from '../Link'

interface HeaderClientProps {
  megaMenu: MegaMenu
}

const menuSlug = 'menumodal'

export const HeaderClient: React.FC<HeaderClientProps> = ({ megaMenu }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { toggleModal, isModalOpen } = useModal()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const ArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )


  return (
    <header
      className="sticky top-0 h-[4rem] border-t border-border bg-black/90 text-white z-20 py-8 px-[2rem] sm:px-[4rem] flex justify-between items-center w-full backdrop-blur-sm"
      {...(theme ? { 'data-theme': theme } : {})}
    >
        <Link href="/">
          <Logo />
        </Link>

        <button type="button" onClick={() => toggleModal(menuSlug)}>
            <Hamburger />
        </button>

        <Modal slug={menuSlug} closeOnBlur className={`bg-black fixed t-0 w-screen min-h-[70vh] h-fit transition-all duration-700 ease-in-out ${isModalOpen(menuSlug) ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="text-white z-50 flex flex-col">
            {/* Close button */}
            <div className="flex justify-end p-6">
              <ModalToggler slug={menuSlug} className="text-white t-0 ml-auto mr-0">
                <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10.8284" y="8" width="48" height="4" rx="2" transform="rotate(45 10.8284 8)" fill="white" />
                  <rect x="8" y="41.9411" width="48" height="4" rx="2" transform="rotate(-45 8 41.9411)" fill="white" />
                </svg>
              </ModalToggler>
            </div>
            {/* Navigation Items */}
            <nav className="flex flex-col items-center space-y-6 mt-12">
              {megaMenu?.navItems?.map(({ link }, i) => (
                <div key={i} className="w-full max-w-[600px]">
                  {/* Navigation Link with Arrow Icon */}
                  <CMSLink className="flex justify-between items-center w-full border-b border-gray-700 py-4 px-6" {...link}>
                    <ArrowIcon />
                  </CMSLink>
                </div>
              ))}
            </nav>
          </div>
        </Modal>
    </header>
  )
}
