import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'

import type { Page as PageType } from '../../../payload-types'

import { Blocks } from '../../components/Blocks'
import { Hero } from '../../components/Hero'
import { generateMeta } from '../../utilities/generateMeta'
import { FooterMedia } from '@/components/FooterMedia'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => slug)
}

export default async function Page({ params: { slug = 'home' } }) {
  const url = '/' + slug

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
      
      <Hero {...hero} />
      <div className="lg:grid lg:grid-cols-[1fr_74rem_1fr] grid-rows-[1fr]">
          <div className="lg:col-start-2 lg:col-span-1">
            <Blocks blocks={layout} />
          </div>
        </div>
    </article>
    { page.slug === 'home' &&
      <FooterMedia />}
    </div>

  )
}

export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
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
