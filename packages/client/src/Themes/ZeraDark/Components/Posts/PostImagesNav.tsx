import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { Button, Stack, SxProps } from "@mui/material"
import { FC } from "react"

import { usePostImageCtrl } from "../../../../Controllers"
import { useHotkey, useIsMobile } from "../../../../Hooks"
import { FontAwesomeIcon } from "../../../../Lib"
import { AltImagesView } from "../images/AltImagesView"

const styles: SxProps = {
  maxWidth: "100%",
  maxHeight: "min(100vh, 800px)",
}

export const ImagesNav: FC = () => {
  const isMobile = useIsMobile()
  const postImageCtrl = usePostImageCtrl()

  useHotkey("ArrowDown", () => postImageCtrl.onNextImage())
  useHotkey("ArrowUp", () => postImageCtrl.onPrevImage())

  if (postImageCtrl.totalImages === 1) return null

  return (
    <Stack direction={isMobile ? "row" : "column"} sx={styles}>
      <Button
        className="prev"
        variant="text"
        disabled={!postImageCtrl.hasPrevImage}
        onClick={(event) => {
          event.preventDefault()
          postImageCtrl.onPrevImage()
        }}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </Button>

      <AltImagesView />

      <Button
        className="next"
        variant="text"
        disabled={!postImageCtrl.hasNextImage}
        onClick={(event) => {
          event.preventDefault()
          postImageCtrl.onNextImage()
        }}
      >
        <FontAwesomeIcon icon={faAngleDown} />
      </Button>
    </Stack>
  )
}
