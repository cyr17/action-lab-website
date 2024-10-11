import clsx from 'clsx'
import React from 'react'
import RichText from 'src/app/components/RichText'

import type { CaseStudy, Solution } from '../../../payload-types'

import { Card } from '../../components/Card'
import { Button } from '@payloadcms/ui'
import { PrimaryCard } from '@/components/PrimaryCard'



const SolutionCard:React.FC<{
  docs?: CaseStudy []| Solution[]
}> = (props) => {
  const docs =props.docs
  return(
    <div className='grid sm:grid-cols-12 bg-gray-300 rounded-lg h-fit w-full ' >
      
      

      <div className='p-4 h-fit col-span-1 sm:col-span-3 sm:order-2'>
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card key={index} doc={doc} relationTo="solutions" showImpactAreas />
        })}    
      </div>

      <div className='sm:col-span-9 sm:order-1'>
        <div className='p-4'>
        <div className='font-bold text-4xl'>
          Lorem ipsum dolor sit amet consectetur. Integer vitae tincidunt massa senectus ut. S
        </div>
        <div className='pt-4 text-2xl'>
          Lorem ipsum dolor sit amet consectetur. Integer vitae tincidunt massa senectus ut. Sagittis quis cras commodo nec pharetra viverra aliquam sed. Sit ullamcorper dictum molestie at vitae sociis mattis sed.
        </div>
        <Button className='p-4 mt-4 rounded-lg bg-black text-white'>
          Button
        </Button>
        </div>
      </div>

    </div>
  )
}
export type RelatedSolutionsProps = {
  className?: string
  docs?: Solution[]
  introContent?: any
}

export const RelatedSolutions: React.FC<RelatedSolutionsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('container', className)}>
      {introContent && <RichText content={introContent} enableGutter={false} />}
      <div className='text-2xl font-bold'>Systems used for this project</div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:gap-8 items-stretch">
        <SolutionCard docs={docs}/>
      </div>
    </div>
  )
}
