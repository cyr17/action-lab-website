'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { ImpactArea, Solution, Person } from '../../../payload-types'
import { Media } from '../Media'

// Type guard for Person
function isPerson(doc: any): doc is Person {
  return (doc as Person).role !== undefined;
}

// Type guard for Solution
function isSolution(doc: any): doc is Solution {
  return (doc as Solution).subtitle !== undefined;
}

// Type guard for ImpactArea
function isImpactArea(doc: any): doc is ImpactArea {
  return (doc as ImpactArea).meta !== undefined && (doc as ImpactArea).meta.image !== undefined;
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: Solution | ImpactArea | Person
  relationTo?: 'solutions' | 'caseStudies' | 'impactAreas' | 'people'
  showImpactAreas?: boolean
  title?: string
  aspectClass?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showImpactAreas, title: titleFromProps } = props

  const { title} = doc || {}
  const { slug,  meta} = doc as ImpactArea || doc as Solution
  const {subtitle } = doc as Solution
  const {role ,photo} = doc as Person
  const { image: metaImage } = meta || {}

  let titleToUse;
  if (isPerson(doc)) {
    titleToUse = doc.name;
  } else {
    titleToUse = titleFromProps || title;
  }

  let subtitleToUse;
  if (isPerson(doc)) {
    subtitleToUse = doc.title;
  }
  else {
    subtitleToUse = subtitle;
  }

  const href = `/${relationTo}/${slug}`
  const aspectClass = props.aspectClass || "h-[300px] sm:h-[400px] md:h-[450px] lg:h-[542px] w-full"
  return (
    <article
      className={cn(
        'group overflow-hidden bg-card hover:cursor-pointer relative shadow-lg',
        className,
      )}
      ref={card.ref}
    >
      <div className={cn(
        aspectClass,
        "relative overflow-hidden")}>
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
        {photo && typeof photo !== 'string' && (
          <div className="inset-0 transition-transform duration-300 group-hover:scale-110">
            <Media
              resource={photo}
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
          {subtitleToUse && <div className="mt-2 text-sm text-white opacity-90">{subtitleToUse}</div>}
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
