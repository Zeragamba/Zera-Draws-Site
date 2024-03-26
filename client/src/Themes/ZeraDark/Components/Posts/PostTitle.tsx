import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { usePostContext } from '../../../../Contexts'
import { useIsAdmin, useIsMobile } from '../../../../Hooks'
import { FontAwesomeIcon } from '../../../../Lib'

export const PostTitle: FC = () => {
  const navigate = useNavigate()
  const isAdmin = useIsAdmin()
  const isMobile = useIsMobile()
  const { post } = usePostContext()

  return (
    <Stack gap={1} paddingTop={1} width={'100%'}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
        <Typography variant={isMobile ? 'h3' : 'h1'} color={'text.primary'}>{post.title}</Typography>
        {isAdmin && (
          <Box>
            <Button
              component="a"
              variant="contained"
              href={`/post/${post.id}/edit`}
              onClick={(event) => {
                event.preventDefault()
                navigate(`/post/${post.id}/edit`)
              }}
              endIcon={<FontAwesomeIcon icon={faEdit} />}
              size="small"
            >
              Edit
            </Button>
          </Box>
        )}
      </Stack>

      <Divider sx={{ opacity: 0.35, borderColor: 'text.primary' }} />
    </Stack>
  )
}
