import { faEye } from '@fortawesome/free-regular-svg-icons'
import { FC } from 'react'

import { usePostViews$ } from './ViewsQueries'
import { FontAwesomeIcon } from '../../Lib/Icons/FontAwesomeIcon'
import { PostData } from '../Posts/PostData'
import { TagChip } from '../Tags/TagChip'

interface ViewCounterProps {
  postId: PostData['id']
}

export const ViewCounter: FC<ViewCounterProps> = ({
  postId,
}) => {
  const views$ = usePostViews$(postId)

  if (views$.isPending || views$.isError) return null
  const { total, unique } = views$.data

  return (
    <TagChip color={'default'} icon={<FontAwesomeIcon icon={faEye} />} label={`${total} Total | ${unique} Unique`} />
  )
}
