import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { ImpactArea } from '../../../../payload-types'

export const revalidateImpactArea: CollectionAfterChangeHook<ImpactArea> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/impactAreas/${doc.slug}`

    payload.logger.info(`Revalidating caseStudy at path: ${path}`)

    revalidatePath(path)
  }

  // If the caseStudy was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/impactAreas/${previousDoc.slug}`

    payload.logger.info(`Revalidating old caseStudy at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
