import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { Box, Button, Stack } from "@mui/material"
import classnames from "classnames"
import { FC } from "react"
import { useHotkey, useIsMobile } from "../../../Hooks"

import styles from "./ViewPost.module.scss"
import { FontAwesomeIcon } from "../Icons"
import { usePostNavCtrl } from "../../../Controllers"

export const PostNav: FC = () => {
  const ctrl = usePostNavCtrl()
  const isMobile = useIsMobile()

  useHotkey("ArrowLeft", () => ctrl.onNextPost())
  useHotkey("ArrowRight", () => ctrl.onPrevPost())

  return (
    <Stack gap={2}>
      <Box className={classnames(styles.nav, { [styles.mobile]: isMobile })}>
        <Box className={styles.nextPost}>
          <Button
            component="a"
            variant="contained"
            endIcon={<FontAwesomeIcon icon={faAngleLeft} />}
            href={ctrl.nextPostUrl}
            disabled={!ctrl.hasNextPost}
            onClick={(event) => {
              event.preventDefault()
              ctrl.onNextPost()
            }}
          >
            Next
          </Button>
        </Box>

        <Box className={styles.prevPost}>
          <Button
            component="a"
            variant="contained"
            endIcon={<FontAwesomeIcon icon={faAngleRight} />}
            href={ctrl.prevPostUrl}
            disabled={!ctrl.hasPrevPost}
            onClick={(event) => {
              event.preventDefault()
              ctrl.onPrevPost()
            }}
          >
            Prev
          </Button>
        </Box>
      </Box>
    </Stack>
  )
}
