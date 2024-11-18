'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Gutter, Button } from '@payloadcms/ui'
import type { MegaMenu } from '../../../payload-types'

import { Dialog, DialogPanel } from '@headlessui/react'

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

        <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Hamburger />
        </button>

        <Dialog open={isMenuOpen} onClose={setIsMenuOpen} className="relative z-20">
          <div className="fixed -mt-10 inset-0 z-10 overflow-y-auto">
            <DialogPanel
              transition
              className="absolute w-screen left-0 transform rounded-lg text-white shadow-xl transition-all data-[closed]:-translate-y-[100vh] data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:tranlate-y-0 data-[enter]:opacity-100 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in my-8 sm:w-full sm:max-w-lg data-[closed]:sm:-translate-y-screen data-[closed]:sm:scale-95"
            >
            <div className='bg-black w-screen h-[70vh] '>
                <div className='flex justify-end mt-0 pt-8 pr-[2rem] ml-auto mr-4'>
                  <button className="text-white ml-auto mr-0" onClick={() => setIsMenuOpen(false)}>
                    <svg width="53" height="53" viewBox="0 0 53 53" 
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="10.8284" y="8" width="48" height="4" rx="2" transform="rotate(45 10.8284 8)" fill="white" />
                      <rect x="8" y="41.9411" width="48" height="4" rx="2" transform="rotate(-45 8 41.9411)" fill="white" />
                    </svg>
                  </button>
                </div>

                <nav className="flex flex-col items-center space-y-6 mt-0 pt-[5rem]">
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
          </DialogPanel>
        </div>
    </Dialog>
    </header>
  )
}
