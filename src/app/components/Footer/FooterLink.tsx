import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import React from 'react'

import type { CaseStudy, ImpactArea, Page, Post, Solution } from '../../../payload-types'

type FooterLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string
  newTab?: boolean
  reference?: {
    relationTo: 'pages' | 'posts' | 'solutions' | 'caseStudies' | 'impactAreas'
    value: Page | Post | Solution | CaseStudy | ImpactArea | string | number
  }
  size?: ButtonProps['size']
  type?: 'custom' | 'reference'
  url?: string
}

export const FooterLink: React.FC<FooterLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null


  /* Ensure we don't break any styles set by richText */


  return (
    <div className='mt-4 text-gray-300'>
        <Link href={href || url}>
            {label && <span>{label}</span>}
        </Link>
    </div>
    )
}
