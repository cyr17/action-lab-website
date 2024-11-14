import { cn } from '@/utilities/cn'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import RichText from 'src/app/components/RichText'
import colors from '@/css/colors'

import type { SliderBlockProps } from './types'
import { SliderArchive } from '@/components/SliderArchive'

export const SliderBlock: React.FC<
  SliderBlockProps & {
    id?: string,
    collection: 'solutions' | 'caseStudies' | 'impactAreas' | 'people',
  }
> = async (props) => {
  const { id, introContent, limit = 3, populateBy, selectedDocs, relationTo } = props

  let items: any[] = []
  if (populateBy === 'collection') {
    const payload = await getPayloadHMR({ config: configPromise })


    const fetchedItems = await payload.find({
      collection: relationTo,
      depth: 1,
      limit,
    })

    items = fetchedItems.docs
  } else {
    items = selectedDocs.map((item) => {
      if (typeof item.value === 'object') return item.value
    })
  }

  return (
    <div className={cn("my-16 pb-8 relative left-1/2 right-1/2 -mx-[50vw] w-screen max-w-none", colors("bg",props.blockColor))} id={`block-${id}`}>
      {introContent && (
          <RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />
      )}
      <SliderArchive items={items} collection={relationTo} />
    </div>
  )
}
