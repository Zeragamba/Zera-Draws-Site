import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sortArray } from 'dyna-sort'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { TagChip } from './TagChip'
import { TagData } from './TagData'
import { byTagName } from './TagSorters'

interface TagListProps {
  tags: TagData[]
}

export const TagList: FC<TagListProps> = ({
  tags,
}) => {
  const navigate = useNavigate()

  return (
    <>
      {sortArray(tags, byTagName).map(tag => (
        <TagChip
          key={tag.id}
          icon={<FontAwesomeIcon icon={faTag} />}
          label={tag.name}
          href={`/tag/${tag.slug}`}
          onClick={() => navigate(`/tag/${tag.slug}`)}
        />
      ))}
    </>
  )
}
