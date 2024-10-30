'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { ImpactArea, Solution } from '../../../payload-types'
import { Media } from '../Media'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: Solution | ImpactArea
  relationTo?: 'posts' | 'solutions' | 'caseStudies' | 'impactAreas'
  showImpactAreas?: boolean
  title?: string
  widthClass?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showImpactAreas, title: titleFromProps } = props

  const { slug,  meta, title} = doc || {}
  const {subtitle } = doc as Solution
  const { image: metaImage } = meta || {}
  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${slug}`
  const widthClass = props.widthClass || "w-full"
  return (
    <article
      className={cn(
        'group overflow-hidden bg-card hover:cursor-pointer relative shadow-lg',
        className,
      )}
      ref={card.ref}
    >
      <div className={cn(
        widthClass,
        "relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[542px] overflow-hidden")}>
        {metaImage && typeof metaImage !== 'string' && (
          <div className="inset-0 transition-transform duration-300 group-hover:scale-110">
            <Media
              resource={metaImage}
              size="360px"
              imgClassName="object-cover w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[542px]"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          </div>
        )}
      </div>

      <div className='absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end text-white'>
        <div className="">
          {titleToUse && (
            <div className="prose group-hover:underline">
              <h3 className="text-lg font-bold">
                <Link className="not-prose" href={href} ref={link.ref}>
                  {titleToUse}
                </Link>
              </h3>
            </div>
          )}
          {subtitle && <div className="mt-2 text-sm text-white opacity-90">{subtitle}</div>}
        </div>
        <div className=''>
          <svg
            className="ml-2 transition-transform duration-300 group-hover:rotate-45"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1.125H18M18 1.125V17.625M18 1.125L1.5 17.875" stroke="#FCFCFC" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </article>
  )
}
