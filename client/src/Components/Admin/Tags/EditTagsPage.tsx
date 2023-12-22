import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { sortArray } from 'dyna-sort'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AddTagButton } from './AddTagButton'
import { DeleteEmptyTagsButton } from './DeleteEmptyTagsButton'
import { EditTagDialog } from './EditTagDialog'
import { TagData } from '../../Tags/TagData'
import { useAllTags$ } from '../../Tags/TagsApi'
import { byTagName } from '../../Tags/TagSorters'

export const EditTagsPage: FC = () => {
  const navigate = useNavigate()
  const tagsQuery = useAllTags$()
  const [ activeTag, setActiveTag ] = useState<TagData | null>(null)

  if (tagsQuery.isPending) return <div>Loading...</div>
  if (tagsQuery.isError) return <div>Error: {String(tagsQuery.error)}</div>
  const allTags = tagsQuery.data

  const emptyTags = allTags.find(tag => tag.num_posts === 0)

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack gap={2}>
        <Stack direction="row" justifyContent="space-between">
          <AddTagButton />
          {emptyTags && <DeleteEmptyTagsButton />}
        </Stack>

        {sortArray(allTags, byTagName).map(tag => (
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
              transition: 'background-color 250ms',
              '&:hover': {
                backgroundColor: 'hsla(0deg, 0%, 0%, 5%)',
              },
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography>{tag.name}</Typography>
            </Box>

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
              sx={{ alignItems: 'stretch' }}
              startIcon={<FontAwesomeIcon icon={faEdit} />}
              onClick={() => setActiveTag(tag)}
            >
              Edit
            </Button>

            <EditTagDialog tagId={tag.id} open={activeTag?.id === tag.id} onClose={() => setActiveTag(null)} />
          </Stack>
        ))}
      </Stack>
    </Paper>
  )
}
