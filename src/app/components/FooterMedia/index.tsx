import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { FooterMedia } from '../../../payload-types'


import { Media } from '../../components/Media'

export async function FooterMedia() {
    const footerMedia: FooterMedia = await getCachedGlobal('footer-media', 1)()

    
  return (
    <div>
        <div className="h-fit border-0 select-none">
        {footerMedia && typeof footerMedia !== 'string' && (
            
            <div className='relative -bottom-2'>
                <img className="-z-10 object-cover" src={footerMedia.media.url} />
                <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"/>
            </div>
        )}
        </div>
    </div>
  )
}