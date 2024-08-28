import clsx from 'clsx'
import React from 'react'
import RichText from 'src/app/components/RichText'

import type { ImpactArea } from '../../../payload-types'

import { Card } from '../../components/Card'

export type RelatedImpactAreasProps = {
  className?: string
  docs?: ImpactArea[]
  introContent?: any
}

export const RelatedImpactAreas: React.FC<RelatedImpactAreasProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('container', className)}>
      {introContent && <RichText content={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card key={index} doc={doc} relationTo="impactAreas" showCategories />
        })}
      </div>
    </div>
  )
}
