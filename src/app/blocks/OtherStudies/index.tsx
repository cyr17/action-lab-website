import clsx from 'clsx'
import React from 'react'
import RichText from 'src/app/components/RichText'

import type { CaseStudy } from '../../../payload-types'

import { Card } from '../../components/Card'
import { PrimaryCard } from '@/components/PrimaryCard'

export type OtherStudiesProps = {
  className?: string
  docs?: CaseStudy[]
  introContent?: any
}

export const OtherStudies: React.FC<OtherStudiesProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('container', className)} >
      {introContent && <RichText content={introContent} enableGutter={false} />}
      <h1 className='font-bold text-3xl'>Other Relevant Studies</h1>
      <div className="mt-4 h-fit w-fit grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 md:gap-8">
        <div className='col-span-1 md:col-span-4 lg:col-span-4'>
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <PrimaryCard key={index} doc={doc} relationTo="caseStudies" showImpactAreas color='bg-black'/>
        })}
        </div>
      </div>
    </div>
  )
}
