import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import RichText from 'src/app/components/RichText'

import type { CaseStudy } from '../../../../payload-types'

import { CaseStudyHero } from '../../../heros/CaseStudyHero'
import { generateMeta } from '../../../utilities/generateMeta'
import PageClient from './page.client'
import { OtherStudies } from '@/blocks/OtherStudies'
import { RelatedSolutions } from '@/blocks/RelatedSolutions'
import { Blocks } from '@/components/Blocks'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const caseStudies = await payload.find({
    collection: 'caseStudies',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return caseStudies.docs
  ?.filter((doc)=>{
    return doc.slug!== 'casestudies'
  })
  .map(({ slug }) => slug)
}

export default async function CaseStudy({ params: { slug = 'casestudies' } }) {
  const url = '/caseStudies/' + slug
  const caseStudy = await queryCaseStudyBySlug({ slug })

  if (!caseStudy) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <CaseStudyHero caseStudy={caseStudy} />

      <div className="flex flex-col gap-4 pt-8">
        <div className="container lg:grid lg:grid-cols-[1fr_60rem_1fr] grid-rows-[1fr]">
          <div className="lg:col-start-2 lg:col-span-1">
            <Blocks blocks={caseStudy.layout} />
            <RelatedSolutions
              className="mt-12"
              docs={caseStudy.relatedSolutions.filter((solution) => typeof solution === 'object')}
            />

            <div className="mt-4 w-[60rem] border-b-2 border-black ml-auto mr-auto"/>

            <OtherStudies
              className="mt-12"
              docs={caseStudy.relatedCaseStudies.filter((caseStudy) => typeof caseStudy === 'object')}
            />
        
          </div>
        </div>

       
      </div>
    </article>
  )
}

export async function generateMetadata({ params: { slug = 'casestudies' } }): Promise<Metadata> {
  const caseStudy = await queryCaseStudyBySlug({ slug })

  return generateMeta({ doc: caseStudy })
}

const queryCaseStudyBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'caseStudies',
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
