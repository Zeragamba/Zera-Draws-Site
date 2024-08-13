import { Chip } from "@mui/material"
import { FC } from "react"

import { TagData } from "../../../../Models"

interface SelectedTagListProps {
  tags: TagData[]
  onDelete: (tag: TagData) => void
}

export const SelectedTagList: FC<SelectedTagListProps> = ({
  tags,
  onDelete,
}) => {
  return (
    <>
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          label={tag.name}
          onDelete={() => onDelete(tag)}
          sx={{
            ".MuiChip-label": {
              flexGrow: 1,
            },
          }}
        />
      ))}
    </>
  )
}
