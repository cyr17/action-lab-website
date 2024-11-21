import { cn } from '@/utilities/cn'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import RichText from 'src/app/components/RichText'
import colors from '@/css/colors'

import type { ArchiveBlockProps } from './types'

import { CollectionArchive } from '../../components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string,
    collection: 'solutions' | 'caseStudies' | 'impactAreas' | 'people',
    impactAreas: any[],
  }
> = async (props) => {
  const { id,impactAreas, introContent, limit = 3, populateBy, selectedDocs, relationTo } = props

  let items: any[] = []
  if (populateBy === 'collection') {
    const payload = await getPayloadHMR({ config: configPromise })

    const flattenedImpactAreas = impactAreas.map((impactArea) => {
      if (typeof impactArea === 'object') return impactArea.id
      else return impactArea
    })

    const fetchedItems = await payload.find({
      collection: relationTo,
      depth: 1,
      limit,
      ...(flattenedImpactAreas && flattenedImpactAreas.length > 0
        ? {
            where: {
              impactAreas: {
                in: flattenedImpactAreas,
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
    <div className={cn("container pb-8 relative left-1/2 right-1/2 -mx-[50vw] w-screen max-w-none", colors("bg",props.blockColor))} id={`block-${id}`}>
      {introContent && (
        <div className="p-8 mb-16">
          <RichText className="ml-0 sm:px-[10rem] max-w-none" content={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive items={items} collection={relationTo} />
    </div>
  )
}
