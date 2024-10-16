import { formatDateTime } from '@/utilities/formatDateTime'
import React from 'react'

import type { Solution } from '../../../payload-types'

import { Media } from '../../components/Media'

export const SolutionHero: React.FC<{
  solution: Solution
}> = ({ solution }) => {
  const { impactAreas, meta: { image: metaImage } = {}, populatedAuthors, publishedAt, title ,subtitle } = solution

  return (
    <div className="relative mt-[10.4rem] flex items-end">
    <div className="container z-10 text-black pl-0 lg:max-w-4xl">
      <div className="py-8 rounded-lg">
          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className=''>
            <h2 className="text-lg md:text-xl lg:text-2xl text-gray-700">{subtitle}</h2>
          </div>
        </div>
      </div>
      
    </div>
  )
}
