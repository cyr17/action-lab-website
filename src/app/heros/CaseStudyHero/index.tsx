'use client'
import { formatDateTime } from '@/utilities/formatDateTime'
import React from 'react'

import type { CaseStudy } from '../../../payload-types'

import { Media } from '../../components/Media'

export const CaseStudyHero: React.FC<{
  caseStudy: CaseStudy
}> = ({ caseStudy }) => {
  const { impactAreas, meta: { image: metaImage } = {}, populatedAuthors, publishedAt, title ,readingTime} = caseStudy

  return (

    <div className="container">
      <div className="container z-10 relative text-black pb-8 mx-auto lg:max-w-4xl">
        <div className="">
          <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-16">
          <div className="flex flex-col gap-4">
            <div className="uppercase text-sm mb-6">
              {impactAreas?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category

                  const titleToUse = categoryTitle || 'Untitled category'

                  const isLast = index === impactAreas.length - 1

                  return (
                    <React.Fragment key={index}>
                      {titleToUse}
                      {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                    </React.Fragment>
                  )
                }
                return null
              })}
            </div>
          </div>
            <div className="">
                {readingTime && <div className="text-sm mb-6">{readingTime} min read</div>}
            </div>
        </div>
          
      </div>
    </div>
  )
}
