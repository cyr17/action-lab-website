import type { Post } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import RichText from 'src/app/components/RichText'

import { TeamArchive } from '../../components/TeamArchive'
import { MemberGalleryProps } from './types'

// 
export const MemberGalleryBlock: React.FC<
  MemberGalleryProps & {
    id?: string,
    collection: 'people',
  }
> = async (props) => {
  const { id, introContent, relationTo } = props

  let items: any[] = []
    const payload = await getPayloadHMR({ config: configPromise })

    const fetchedItems = await payload.find({
      collection: relationTo,
      depth: 1,
      }
    )

    items = fetchedItems.docs

  return (
    <div className="p-0 relative left-1/2 right-1/2 -mx-[50vw] w-screen max-w-none" id={`block-${id}`}>
       
      {introContent && (
        <div className="container max-w-none mx-auto mb-16 w-[90vw]">
          <RichText className="ml-0 mr-0 max-w-none" content={introContent} enableGutter={false} />
        </div>
      )}
      <TeamArchive items={items} collection={relationTo}/>
    </div>
  )
}
