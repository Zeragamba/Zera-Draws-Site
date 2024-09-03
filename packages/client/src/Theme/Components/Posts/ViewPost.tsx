import { Box, Paper, Stack, Typography } from "@mui/material"
import classnames from "classnames"
import { FC } from "react"
import { useIsMobile, useViewPostCtrl } from "../../../Lib"
import { AsyncImg } from "../Images"
import { MarkdownViewer } from "../Markdown/MarkdownViewer"

import { ImagesNav } from "./PostImagesNav"
import { PostNav } from "./PostNav"
import { PostTags } from "./PostTags"
import { PostTitle } from "./PostTitle"

import styles from "./ViewPost.module.scss"

export const ViewPost: FC = () => {
  const isMobile = useIsMobile()
  const { post, ...ctrl } = useViewPostCtrl()
  const description = post.description || ""

  return (
    <Stack gap={2}>
      <PostTitle />

      <Box
        className={classnames(styles.postImage, {
          [styles.isMobile]: isMobile,
        })}
      >
        <ImagesNav />
        <Box className={styles.imgWrapper}>
          <AsyncImg
            key={ctrl.currentImage.id}
            src={ctrl.currentImageSrc}
            onClick={ctrl.onPostImageClick}
          />
        </Box>
      </Box>

      <PostNav />

      <Paper sx={{ padding: 2 }}>
        <Stack gap={2}>
          <Typography variant={"h3"}>Tags</Typography>
          <PostTags post={post} />
        </Stack>
      </Paper>

      {description?.trim() !== "" && (
        <Paper sx={{ padding: 2 }}>
          <MarkdownViewer>{post.description}</MarkdownViewer>
        </Paper>
      )}
    </Stack>
  )
}
