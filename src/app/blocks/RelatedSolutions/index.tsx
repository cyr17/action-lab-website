import clsx from 'clsx'
import React from 'react'
import RichText from 'src/app/components/RichText'

import type { CaseStudy, Solution } from '../../../payload-types'

import { Card } from '../../components/Card'
import { Button } from '../../components/ui/button'
import { PrimaryCard } from '@/components/PrimaryCard'



const SolutionCard:React.FC<{
  docs?: Solution[]
}> = (props) => {
  const docs =props.docs
  return(
    
    <div >
      {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null
          return <div className='grid md:grid-cols-12 bg-gray-300 rounded-lg h-fit w-full my-4'>
                  <div className='p-4 h-full col-span-1 md:col-span-6 lg:col-span-4 md:order-2'>
                      <Card key={index} doc={doc} relationTo="solutions" aspectClass='max-h-[300px] w-full' />
                  </div>

                  <div className='md:col-span-6 lg:col-span-8 md:order-1'>
                    <div className='p-4'>
                    <div className='font-bold text-4xl'>
                      {doc.title}
                    </div>
                    <div className='pt-4 text-2xl'>
                      {doc.subtitle}
                    </div>
                    </div>
                  </div>
                </div>
              })}    

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
