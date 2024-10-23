import type { Page } from '../../../payload-types'

export type SliderBlockProps = Extract<Page['layout'][0], { blockType: 'slider' }>
