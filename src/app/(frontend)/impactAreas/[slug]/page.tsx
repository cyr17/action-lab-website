import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import RichText from 'src/app/components/RichText'

import type { ImpactArea } from '../../../../payload-types'

import { ImpactAreaHero } from '../../../heros/ImpactAreaHero'
import { generateMeta } from '../../../utilities/generateMeta'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const impactAreas = await payload.find({
    collection: 'impactAreas',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return impactAreas.docs?.map(({ slug }) => slug)
}

export default async function ImpactArea({ params: { slug = '' } }) {
  const url = '/impactAreas/' + slug
  const impactArea = await queryImpactAreaBySlug({ slug })

  if (!impactArea) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <ImpactAreaHero impactArea={impactArea} />

      <div className="flex flex-col gap-4 pt-8">
        <div className="container lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <RichText
            className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
            content={impactArea.content}
            enableGutter={false}
          />
        </div>

        
      </div>
    </article>

  )
  //<RelatedCaseStudies
      //className="mt-12"
      //docs={impactArea.relatedCaseStudies.filter((impactArea) => typeof impactArea === 'object')}
    ///>
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const impactArea = await queryImpactAreaBySlug({ slug })

  return generateMeta({ doc: impactArea })
}

const queryImpactAreaBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'impactAreas',
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
