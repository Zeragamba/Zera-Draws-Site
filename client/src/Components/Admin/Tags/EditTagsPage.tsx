import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Grid, Paper, Stack, Typography } from '@mui/material'
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

  if (tagsQuery.isLoading) return <div>Loading...</div>
  if (tagsQuery.isError) return <div>Error: {String(tagsQuery.error)}</div>
  const allTags = tagsQuery.data

  const emptyTags = allTags.find(tag => tag.num_posts === 0)

  return (
    <Paper sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <AddTagButton />
            {emptyTags && <DeleteEmptyTagsButton />}
          </Stack>
        </Grid>

        {sortArray(allTags, byTagName).map(tag => (
          <Grid item sm={12} md={6} lg={4} key={tag.id}>
            <Stack
              component={Paper}
              variant="outlined"
              gap={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ padding: 2 }}
            >
              <Typography>{tag.name}</Typography>

              <Stack direction="row" gap={2} alignItems="center">
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
              </Stack>
            </Stack>

            <EditTagDialog tagId={tag.id} open={activeTag?.id === tag.id} onClose={() => setActiveTag(null)} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}
