'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {Gutter,Button} from '@payloadcms/ui'
import type { Header } from '../../../payload-types'
import type { MegaMenu } from '../../../payload-types'

import { Logo } from '../Logo/Logo'
import { HeaderNav } from './Nav'
import {  Hamburger } from './Hamburger'
import { Modal,useModal ,ModalToggler } from '@faceless-ui/modal'
import { CMSLink } from '../Link'
interface HeaderClientProps {
  header: Header
  megaMenu: MegaMenu
}

const menuSlug = 'menumodal';

export const HeaderClient: React.FC<HeaderClientProps> = ({ header ,megaMenu }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { toggleModal } = useModal();
  
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
      <div className='ml-auto'>
      <button type='button' className="mr-0" onClick={ () =>toggleModal(menuSlug)}>
        <Hamburger />
      </button>
      </div>
      <HeaderNav header={header} />
      <Modal slug={menuSlug} closeOnBlur className = "t-0 h-auto w-auto bg-black ">
        <div className='ml-auto mr-auto px-2 max-w-full'>
          
          <div className='grid grid-flow-row gap-4 '>
              <ModalToggler slug = {menuSlug} className='text-white t-0 ml-auto mr-0'> 
                <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10.8284" y="8" width="48" height="4" rx="2" transform="rotate(45 10.8284 8)" fill="white"/>
                  <rect x="8" y="41.9411" width="48" height="4" rx="2" transform="rotate(-45 8 41.9411)" fill="white"/>
                </svg>

              </ModalToggler>

              {megaMenu?.navItems?.map(({ link }, i) => {
                return <CMSLink className="text-white" key={i} {...link} />
              })}
              
            </div>
        </div>
      </Modal>
    </div>
  </header>
  )
}
