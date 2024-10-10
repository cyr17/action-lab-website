import { cn } from '@/utilities/cn'
import React from 'react'

import { Card } from '../Card'

export type Props = {
  items: any[],
  collection: any,
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { items } = props
  const { collection } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-12 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {items?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4 sm:col-span-4 lg:col-span-3" key={index}>
                  <Card className="h-full" doc={result} relationTo={collection} showImpactAreas />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
