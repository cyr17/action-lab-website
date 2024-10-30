import React from 'react'

import type { Page } from '../../../payload-types'

import RichText from '../../components/RichText'
import BackButton from '../../components/ui/backButton'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container mt-16">
      <BackButton/>
      <div className="max-w-[48rem]">
        {children || <RichText content={richText} enableGutter={false} />}
      </div>
    </div>
  )
}
