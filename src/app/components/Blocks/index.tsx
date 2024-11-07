import { cn } from '@/utilities/cn'
import React, { Fragment } from 'react'

import type { Page } from '../../../payload-types'

import { ArchiveBlock } from '../../blocks/ArchiveBlock'
import { FilteredArchiveBlock } from '@/blocks/FilteredArchiveBlock'
import { CallToActionBlock } from '../../blocks/CallToAction'
import { ContentBlock } from '../../blocks/Content'
import { FormBlock } from '../../blocks/Form'
import { MediaBlock } from '../../blocks/MediaBlock'
import { toKebabCase } from '../../utilities/toKebabCase'
import { SideBySideBlock } from '../../blocks/SideBySide'
import { SliderBlock } from '../../blocks/SliderBlock'
import { MemberGalleryBlock } from '../../blocks/MemberGallery'

const blockComponents = {
  archive: ArchiveBlock,
  filteredArchive: FilteredArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  sideBySide: SideBySideBlock,
  slider: SliderBlock,
  gallery: MemberGalleryBlock
}

export const Blocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block
          console.log("HOIT",blockName,blockType)

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error */}
                  <Block id={toKebabCase(blockName)} {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
