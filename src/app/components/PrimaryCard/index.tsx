'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { CaseStudy, Solution } from '../../../payload-types'

export const PrimaryCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CaseStudy | Solution
  relationTo?: 'solutions' | 'caseStudies' | 'impactAreas'
  showImpactAreas?: boolean
  title?: string
  color?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showImpactAreas, title: titleFromProps } = props

  const { slug, impactAreas, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasImpactAreas = impactAreas && Array.isArray(impactAreas) && impactAreas.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`
  const colors = props.color || []

  const headerStyle = "h-48 "+colors;
  const pillStyle = "h-1 w-8 "+colors+" mb-2 group-hover:w-16 transition-width duration-200";
  return (
    <article 
      className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:cursor-pointer group hover:bg-gray-100 transition-colors duration-200"
      ref = {card.ref}
      >
      <div className={headerStyle}></div>

      <div className="p-6">
        
        <div className="mb-4">
          <div className={pillStyle}></div>
          {titleToUse && (
            // on hover underline text
          <div className="prose group-hover:underline">
            <Link className="not-prose" href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </div>
          )}
        </div>
        
        <p className="text-gray-600">
          {
            sanitizedDescription //TODO-needs update
          }
        </p>
      </div>
    </article>

  )
}
