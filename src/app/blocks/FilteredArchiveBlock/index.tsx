import type { Post } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import RichText from 'src/app/components/RichText'

import { FilteredCollectionArchive } from '../../components/FilteredCollectionArchive'
import { FilteredArchiveBlockProps } from './types'

// to dynamically filter based on user selected impact areas
export const FilteredArchiveBlock: React.FC<
  FilteredArchiveBlockProps & {
    id?: string,
    collection: 'posts' | 'solutions' | 'caseStudies' | 'impactAreas' | 'people',
  }
> = async (props) => {
  const { id, introContent, limit = 3, populateBy, selectedDocs, relationTo } = props
  let filteredImpactAreas =[];
  let impactAreas: any[] =[];
  let items: any[] = []


  // fetch impact areas from payload
  const payload = await getPayloadHMR({ config: configPromise })

  const fetchedImpactAreas = await payload.find({
    collection: 'impactAreas',
    depth: 1,
  })

  impactAreas = fetchedImpactAreas.docs
  // render pills or tabs for user to select impact areas

  // use a hook to store selected impact areas
  // now impactAreas is passed as a prop to the block
  if (populateBy === 'collection') {
    const payload = await getPayloadHMR({ config: configPromise })

    const flattenedImpactAreas = filteredImpactAreas? 
    filteredImpactAreas.map((impactArea) => {
      if (typeof impactArea === 'object') return impactArea.id
      else return impactArea
    })
    : [];

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
  const handleImpactAreaSelect = (impactArea) => {
    // update state with selected impact
    filteredImpactAreas =[...filteredImpactAreas, impactArea];
  }

  return (
    <div className="my-16" id={`block-${id}`}>
     
      {introContent && (
        <div className="container mb-16">

          <RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />
          

        </div>
      )}
      <FilteredCollectionArchive items={items} collection={relationTo} filter ={impactAreas} />
    </div>
  )
}
