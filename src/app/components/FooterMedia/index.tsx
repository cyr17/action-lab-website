import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { FooterMedia, Media } from '../../../payload-types'


export async function FooterMedia() {
    const footerMedia= await getCachedGlobal('footer-media', 1)() as FooterMedia;
    const media = footerMedia.media as Media|undefined;
  return (
    <div>
        <div className="h-fit border-0 select-none">
        {footerMedia && typeof footerMedia !== 'string' && (
            
            <div className='relative -bottom-2'>
                {media && media.url && (
                <img className="-z-10 object-cover" src={media.url} />
                )}
                <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"/>
            </div>
        )}
        </div>
    </div>
  )
}