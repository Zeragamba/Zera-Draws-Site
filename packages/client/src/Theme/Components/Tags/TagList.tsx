import { faTag } from "@fortawesome/free-solid-svg-icons"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

import { TagChip } from "./TagChip"
import { byTagName, TagData } from "../../../Lib"
import { sort } from "fast-sort"
import { FontAwesomeIcon } from "../Icons"

interface TagListProps {
  tags: TagData[]
}

export const TagList: FC<TagListProps> = ({ tags }) => {
  const navigate = useNavigate()

  return (
    <>
      {sort(tags)
        .by({ asc: byTagName })
        .map((tag) => (
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
