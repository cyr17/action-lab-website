import type { Page } from '../../../payload-types'

export type FilteredArchiveBlockProps = Extract<Page['layout'][0], { blockType: 'archive' }>
