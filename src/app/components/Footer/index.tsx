import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer, SocialMedia } from '../../../payload-types'

import Socials from './Socials'
import { FooterLink } from './FooterLink'



export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  
  const socials: SocialMedia = await getCachedGlobal('social-media', 1)()

  const navItems = footer?.groups || []

  return (
    <footer className="border-t border-border bg-black dark:bg-card text-white">
      
      <div className=" w-screen h-fit py-[3rem] sm:py-[5rem] px-[3rem] lg:px-[10rem]">
        <div className='flex flex-col gap-8'>
          <div className="grid sm:grid-cols-6 gap-8">
            <div className='sm:col-span-6 lg:col-span-3'>
              <Link href="/">
                <svg width="84" height="58" viewBox="0 0 84 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M66.1708 35.6172V0.325897H44.1138V57.674L79.3733 57.6741L83.8163 35.6172H66.1708ZM79.7075 38.9809H62.807V3.68963H47.4776V54.3102L76.6196 54.3104L79.7075 38.9809Z" fill="url(#paint0_linear_110_159)"/>
                  <path d="M37.5336 0.325897H66.1708L32.534 57.674H0L37.5336 0.325897Z" fill="url(#paint1_linear_110_159)"/>
                  <defs>
                  <linearGradient id="paint0_linear_110_159" x1="41.8358" y1="-14.3382" x2="78.8357" y2="97.1618" gradientUnits="userSpaceOnUse">
                  <stop offset="0.203476" stopColor="#FAFAFA"/>
                  <stop offset="0.975243" stopColor="#1D1D1D"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_110_159" x1="41.8358" y1="-14.3382" x2="78.8357" y2="97.1618" gradientUnits="userSpaceOnUse">
                  <stop offset="0.203476" stopColor="#FAFAFA"/>
                  <stop offset="0.975243" stopColor="#1D1D1D"/>
                  </linearGradient>
                  </defs>
                </svg>
              </Link>
            </div>
            {navItems.map((navItem, i) => (
              
              <div key={i} className="sm:col-span-2 lg:col-span-1">
                <h3>{navItem.Title}</h3>
                <ul>
                  {navItem.groupItem?.map(({link}, i) => (
                    <div key={i} className="w-full max-w-[600px]">
                    {/* Navigation Link with Arrow Icon */}
                    <FooterLink
                      className="flex justify-between items-center w-full border-b border-gray-700 py-4 px-6"
                      {...link}/>
                  </div>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-row gap-8">
            {socials?.media?.map((media, i) => (
              <div key={i}>
               <Link href={media.url}>
               <Socials platform={media.platform}/>
               </Link>
              </div>
              ))}
            </div>
          </div>

          <div className='mt-4 sm:mt-10 grid sm:grid-cols-6'>
            <div className='sm:col-span-3 '>
              <div className='flex flex-row sm:gap-2 sm:mt-12 lg:mt-4'>
              <Link href="/terms" className="text-white basis-1/2 xl:basis-1/4">Terms of service</Link>
              <Link href="/privacy" className="text-white basis-1/2 xl:basis-1/4">Privacy policy</Link>
              </div>
            </div>
            <div className='sm:col-span-5 lg:col-span-3 mt-8 lg:mt-4'>
              We acknowledge and pay respects to the Elders and Traditional Owners of the land on which our Australian campuses stand. 
              <Link href="/indigenous" className="underline text-white">Information for Indigenous Australians</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>

  )
}
