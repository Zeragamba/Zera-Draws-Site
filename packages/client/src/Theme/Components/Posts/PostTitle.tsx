import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { Box, Button, Divider, Stack, Typography } from "@mui/material"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

import { usePostContext } from "../../../Lib"
import { useIsAdmin, useIsMobile } from "../../../Lib/Hooks"
import { FontAwesomeIcon } from "../Icons"

export const PostTitle: FC = () => {
  const navigate = useNavigate()
  const isAdmin = useIsAdmin()
  const isMobile = useIsMobile()
  const { post } = usePostContext()

  return (
    <Stack gap={1} paddingTop={1} width={"100%"}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Typography variant={isMobile ? "h3" : "h1"} color={"text.primary"}>
          {post.title}
        </Typography>
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

      <Divider sx={{ opacity: 0.35, borderColor: "text.primary" }} />
    </Stack>
  )
}
