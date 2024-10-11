'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { CaseStudy, Post, Solution } from '../../../payload-types'

import { Media } from '../Media'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CaseStudy | Solution | Post
  relationTo?: 'posts' | 'solutions' | 'caseStudies' | 'impactAreas'
  showImpactAreas?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showImpactAreas, title: titleFromProps } = props

  const { slug, impactAreas, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasImpactAreas = impactAreas && Array.isArray(impactAreas) && impactAreas.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="360px" />}
      </div>
      <div className="p-4">
        {showImpactAreas && hasImpactAreas && (
          <div className="uppercase text-sm mb-4">
            {showImpactAreas && hasImpactAreas && (
              <div>
                {impactAreas?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === impactAreas.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
