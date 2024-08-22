import type { CaseStudy } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import RichText from 'src/app/components/RichText'

import type { ArchiveBlockProps } from './types'

import { CollectionArchive } from '../../components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit = 3, populateBy, selectedDocs } = props

  let caseStudies: CaseStudy[] = []

  if (populateBy === 'collection') {
    const payload = await getPayloadHMR({ config: configPromise })

    const flattenedCategories = categories.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedCaseStudies = await payload.find({
      collection: 'caseStudies',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    caseStudies = fetchedCaseStudies.docs
  } else {
    caseStudies = selectedDocs.map((caseStudy) => {
      if (typeof caseStudy.value === 'object') return caseStudy.value
    })
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive caseStudies={caseStudies} />
    </div>
  )
}
