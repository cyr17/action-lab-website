import { cn } from '@/utilities/cn'
import React from 'react'

import { Card } from '../Card'

export type Props = {
  items: any[],
  collection: any,
}

export const TeamArchive: React.FC<Props> = (props) => {
  const { items } = props
  const { collection } = props

  return (
    <div className={cn('container max-w-[90vw] mx-auto')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-12 lg:grid-cols-5 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8 text-black">
          {items?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4 sm:col-span-4 md:col-span-3 lg:col-span-1" key={index}>
                  <Card doc={result} relationTo={collection} aspectClass='h-[300px] sm:h-[300px] md:h-[350px] lg:h-[450px] w-full' />
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
