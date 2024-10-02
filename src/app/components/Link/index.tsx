import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '../../../payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string
  newTab?: boolean
  reference?: {
    relationTo: 'pages' | 'posts' | 'solutions' | 'caseStudies' | 'impactAreas'
    value: Page | Post | string | number
  }
  size?: ButtonProps['size']
  type?: 'custom' | 'reference'
  url?: string
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
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

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn('flex items-center', className)} href={href || url} {...newTabProps}>
  {label && <span>{label}</span>}
  {children && <span>{children}</span>}

  {/* SVG with padding */}
  <svg className="ml-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1.125H18M18 1.125V17.625M18 1.125L1.5 17.875" stroke="#FCFCFC" strokeWidth="2" />
  </svg>
</Link>
    </Button>
  )
}
