import { Box, Stack, SxProps } from "@mui/material"
import classnames from "classnames"
import { FC, useEffect, useRef } from "react"

import { usePostImageCtrl } from "../../../../Controllers"
import { AsyncImg } from "../Images/AsyncImg"

const styles: Record<string, SxProps> = {
  row: {
    overflow: "hidden",
    overflowX: "auto",
    paddingBottom: 1,
  },

  imageWrapper: {
    position: "relative",
    display: "inline-flex",
    height: 100,
    minWidth: 100,
    justifyContent: "center",
    alignItems: "center",

    "& img": {
      objectFit: "cover",
      objectPosition: "center",
      height: "100%",
      width: "100%",
      borderRadius: 2,
    },

    "&.active img": {
      borderStyle: "solid",
      borderWidth: "4px",
      borderColor: "secondary.main",
    },
  },
}

export const AltImagesView: FC = () => {
  const ctrl = usePostImageCtrl()
  const activeImgRef = useRef<HTMLElement>()

  useEffect(() => {
    if (!activeImgRef.current) return
    const element = activeImgRef.current
    element.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    })
  }, [activeImgRef, ctrl.currentIndex])

  if (ctrl.totalImages === 1) return null

  return (
    <Stack direction={"row"} gap={1} sx={styles.row}>
      {ctrl.images.map((image, index) => (
        <Box
          key={image.id}
          sx={styles.imageWrapper}
          onClick={(event) => {
            event.preventDefault()
            ctrl.onChangeImage(index)
          }}
          className={classnames({
            active: index === ctrl.currentIndex,
          })}
          ref={index === ctrl.currentIndex ? activeImgRef : undefined}
        >
          <AsyncImg src={image.srcs.gallery || image.srcs.full} />
        </Box>
      ))}
    </Stack>
  )
}
