import PageTemplate, { generateMetadata } from './[slug]/page'

import React, { cache } from 'react'
import type { Page as PageType } from '../../payload-types'

import { draftMode, headers } from 'next/headers'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'


import { Blocks } from '@/components/Blocks'
import { Hero } from '@/components/Hero'
import { generateMeta } from '@/utilities/generateMeta'
import { FooterMedia } from '@/components/FooterMedia'
import Crumbs from '@/components/ui/crumbs'

import { PayloadRedirects } from '@/components/PayloadRedirects'

export { generateMetadata }

export default async function HomePage() {
    const slug = 'home'
    const url = '/'
  
    let page: PageType | null
  
    page = await queryPageBySlug({
      slug,
    })
  
  
  
    if (!page) {
      return <PayloadRedirects url={url} />
    }
  
    const { hero, layout } = page
  
    //TODO : PADDING px-8 and article without the div breaks the layout
    return (
      <div className=''>
        <article className="pt-16 pb-24">
            {/* Allows redirects for valid pages too */}
            <PayloadRedirects disableNotFound url={url} />
            
            <Crumbs/>
            <Hero {...hero} />
            <div className="flex flex-col ">
                <Blocks blocks={layout} />
            </div>
        </article>
        { page.slug === 'home' &&
            <FooterMedia />}
      </div>
  
    )
  }


  
const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
    const { isEnabled: draft } = draftMode()
  
    const payload = await getPayloadHMR({ config: configPromise })
  
    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      overrideAccess: true,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
  
    return result.docs?.[0] || null
  })
  