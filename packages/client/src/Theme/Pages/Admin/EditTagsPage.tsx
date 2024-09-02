import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons"
import {
  faEdit,
  faStar as faFilledStar,
} from "@fortawesome/free-solid-svg-icons"
import { Button, IconButton, Paper, Stack, Typography } from "@mui/material"
import { sort } from "fast-sort"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { byTagName, TagData, useAllTags$, useUpdateTag$ } from "../../../Lib"
import {
  AddTagButton,
  DeleteEmptyTagsButton,
  EditTagDialog,
  FontAwesomeIcon,
} from "../../Components"

export const EditTagsPage: FC = () => {
  const navigate = useNavigate()
  const tagsQuery = useAllTags$()
  const [activeTag, setActiveTag] = useState<TagData | null>(null)
  const editTag$ = useUpdateTag$()

  if (tagsQuery.isPending) return <div>Loading...</div>
  if (tagsQuery.isError) return <div>Error: {String(tagsQuery.error)}</div>
  const allTags = tagsQuery.data

  const emptyTags = allTags.find((tag) => tag.num_posts === 0)

  const onToggleFeatured = (tag: TagData) => {
    const updatedTag = { ...tag, featured: !tag.featured }
    editTag$.mutateAsync({
      tagId: tag.id,
      tag: { featured: updatedTag.featured },
    })
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack gap={2}>
        <Stack direction="row" justifyContent="space-between">
          <AddTagButton />
          {emptyTags && <DeleteEmptyTagsButton />}
        </Stack>

        {sort(allTags)
          .by({ asc: byTagName })
          .map((tag) => (
            <Stack
              key={tag.id}
              component={Paper}
              variant="outlined"
              gap={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                padding: 2,
                transition: "background-color 250ms",
                "&:hover": {
                  backgroundColor: "hsla(0deg, 0%, 0%, 5%)",
                },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                gap={2}
                sx={{ flexGrow: 1 }}
              >
                <IconButton onClick={() => onToggleFeatured(tag)} size="small">
                  <FontAwesomeIcon
                    icon={tag.featured ? faFilledStar : faEmptyStar}
                  />
                </IconButton>
                <Typography>{tag.name}</Typography>
              </Stack>

              <Button
                component="a"
                href={`/tag/${tag.slug}`}
                onClick={(event) => {
                  event.preventDefault()
                  navigate(`/tag/${tag.slug}`)
                }}
              >
                {tag.num_posts} posts
              </Button>

              <Button
                size="small"
                sx={{ alignItems: "stretch" }}
                startIcon={<FontAwesomeIcon icon={faEdit} />}
                onClick={() => setActiveTag(tag)}
              >
                Edit
              </Button>

              <EditTagDialog
                tagId={tag.id}
                open={activeTag?.id === tag.id}
                onClose={() => setActiveTag(null)}
              />
            </Stack>
          ))}
      </Stack>
    </Paper>
  )
}
