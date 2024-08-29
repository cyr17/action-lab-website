import clsx from 'clsx'
import React from 'react'
import RichText from 'src/app/components/RichText'

import type { Solution } from '../../../payload-types'

import { Card } from '../../components/Card'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import configPromise from '@payload-config'
import { get } from 'http'

export type OtherSolutionsProps = {
  className?: string
  introContent?: any
}

async function getOtherSolutions() {
  const payload = await getPayloadHMR({ config: configPromise })
  const solutions = await payload.find({
    collection: 'solutions',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return solutions.docs
}

export const OtherSolutions: React.FC<OtherSolutionsProps> = async (props) => {

  

  const fetchDocs = async () => {

    const docs = await getOtherSolutions()
    return docs
  }
  const docs = fetchDocs()
  
  const { className, introContent } = props

  return (
    <div className={clsx('container', className)}>
      {introContent && <RichText content={introContent} enableGutter={false} />}
      <h1>Other Solutions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 items-stretch">
        
        
        {(await docs)?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card key={index} doc={doc} relationTo="solutions" showImpactAreas />
        })}
      </div>
    </div>
  )
}
