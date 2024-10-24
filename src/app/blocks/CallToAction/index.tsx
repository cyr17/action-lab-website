import React from 'react'
import RichText from 'src/app/components/RichText'

import type { Page } from '../../../payload-types'

import { CMSLink } from '../../components/Link'

type Props = Extract<Page['layout'][0], { blockType: 'cta' }>

export const CallToActionBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ links, richText }) => {
  return (
    <div className="container w-full">
      <div className="flex flex-col gap-8 md:justify-between md:items-center">
        <div className="w-[100%] lg:w-[110%] flex items-center text-center">
          <RichText className="" content={richText} enableGutter={false} />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} className='w-full'/>
          })}
        </div>
      </div>
    </div>
  )
}
