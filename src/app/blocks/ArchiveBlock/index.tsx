import type { Post } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import RichText from 'src/app/components/RichText'

import type { ArchiveBlockProps } from './types'

import { CollectionArchive } from '../../components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string,
    collection: 'posts' | 'solutions' | 'caseStudies' | 'impactAreas',
  }
> = async (props) => {
  const { id, categories, introContent, limit = 3, populateBy, selectedDocs, relationTo } = props

  let items: any[] = []

  if (populateBy === 'collection') {
    const payload = await getPayloadHMR({ config: configPromise })

    const flattenedCategories = categories.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedItems = await payload.find({
      collection: relationTo,
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

    items = fetchedItems.docs
  } else {
    items = selectedDocs.map((item) => {
      if (typeof item.value === 'object') return item.value
    })
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive items={items} />
    </div>
  )
}
