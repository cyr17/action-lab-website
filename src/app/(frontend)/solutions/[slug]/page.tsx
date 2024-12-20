import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import RichText from 'src/app/components/RichText'

import type { Solution } from '../../../../payload-types'

import { SolutionHero } from '../../../heros/SolutionHero'
import { generateMeta } from '../../../utilities/generateMeta'
import PageClient from './page.client'
import { RelatedSolutions } from '@/blocks/RelatedSolutions'
import { RelatedCaseStudies } from '@/blocks/RelatedCaseStudies'
import { OtherSolutions } from '@/blocks/OtherSolutions'
import { Blocks } from '@/components/Blocks'
import Crumbs from '@/components/ui/crumbs'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const solutions = await payload.find({
    collection: 'solutions',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return solutions.docs
  ?.filter((doc)=>{
    return doc.slug!== 'solutions'
  })
  .map(({ slug }) => slug)
}

export default async function Solution({ params: { slug = 'solutions' } }) {
  const url = '/solutions/' + slug
  const solution = await querySolutionBySlug({ slug })

  if (!solution) return <PayloadRedirects url={url} />
  
  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      
      <Crumbs />
      <div className="flex flex-col gap-4 pt-8">
        <div className="container lg:grid lg:grid-cols-[1fr_60rem_1fr] grid-rows-[1fr]">
          <div className="lg:col-start-2 lg:col-span-1">
            <SolutionHero solution={solution} />
            <Blocks blocks={solution.layout} />
            <RelatedCaseStudies
              className="mt-12"
              docs={solution.relatedCaseStudies.filter((caseStudy) => typeof caseStudy === 'object')}
            />

          </div>
        </div>
        
        <div className="mt-4 w-[74rem] border-b-2 border-black ml-auto mr-auto"/>
  
        <OtherSolutions className="mt-12 max-w-[74rem]"/>
      </div>
    </article>
  )
  // Change related Solutions to other solutions
}

export async function generateMetadata({ params: { slug = 'solutions' } }): Promise<Metadata> {
  const solution = await querySolutionBySlug({ slug })

  return generateMeta({ doc: solution })
}

const querySolutionBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'solutions',
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
