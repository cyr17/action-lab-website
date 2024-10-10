'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { CaseStudy, Post, Solution } from '../../../payload-types'

import { Media } from '../Media'
import { get } from 'http'

export const PrimaryCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CaseStudy | Solution
  relationTo?: 'posts' | 'solutions' | 'caseStudies' | 'impactAreas'
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
  const pillStyle = "h-2 w-8 "+colors+" mb-2"
  return (
    <article 
      className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:cursor-pointer"
      ref = {card.ref}
      >
      <div className={headerStyle}></div>

      <div className="p-6">
        
        <div className="mb-4">
          <div className={pillStyle}></div>
          {titleToUse && (
            
          <div className="prose">
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
