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
    
    return (
      <div className=''>
        HI I AM HOME PAGE
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
  