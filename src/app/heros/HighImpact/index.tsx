'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '../../../payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '../../components/Media'
import RichText from '../../components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative -mt-[10.4rem] h-[80vh] text-white z-10 bg-black" data-theme="dark">
    {/* Free-floating left-side content */}
    <div className="container mb-32 z-20 relative flex-grow-0 flex-shrink-0 basis-[30%] p-8">
      <div className="max-w-[34rem]">
        <RichText className="mt-[16rem]" content={richText} enableGutter={false} />
        <br />
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  
    {/* Hero Image starts from 30% of the viewport width */}
    <div
      className="absolute top-0 right-0 min-h-[80vh] w-[69vw] select-none z-10"
      style={{ left: '30vw' }} // This restricts the image to start at 30% of the viewport width
    >
      {typeof media === 'object' && (
        <React.Fragment>
          {/* Media Section */}
          <Media fill imgClassName="-z-10 object-cover h-full w-full" priority resource={media} />
  
          {/* Gradient Overlay - fading from black to transparent */}
          <div className="absolute pointer-events-none left-0 top-0 w-full h-full bg-gradient-to-r from-black to-transparent" />
        </React.Fragment>
      )}
    </div>
  
  </div>
  
  )
}
