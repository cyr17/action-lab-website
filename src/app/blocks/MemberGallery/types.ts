import type { Page } from '../../../payload-types'

export type MemberGalleryProps = Extract<Page['layout'][0], { blockType: 'gallery' }>
