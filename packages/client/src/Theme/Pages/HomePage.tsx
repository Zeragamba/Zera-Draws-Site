import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { Button, Paper, Typography } from "@mui/material"
import Stack from "@mui/material/Stack"
import { FC, MouseEventHandler } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "../../Lib"
import {
  AllPostsGallery,
  FeaturedPostsGallery,
  GalleryTitle,
} from "../Components"

export const HomePage: FC = () => {
  const navigate = useNavigate()

  const onViewFeatured: MouseEventHandler = (event) => {
    event.preventDefault()
    navigate("/featured")
  }

  return (
    <Stack gap={3}>
      <Paper>
        <Stack direction={"row"} padding={2} gap={1}>
          <Typography variant={"h2"} sx={{ flexGrow: 1 }}>
            Featured
          </Typography>

          <Button
            endIcon={<FontAwesomeIcon icon={faArrowRight} />}
            href={"/featured"}
            sx={{ typography: "body1", color: "text.primary" }}
            onClick={onViewFeatured}
          >
            View All
          </Button>
        </Stack>

        <FeaturedPostsGallery maxRows={1} />
      </Paper>

      <Paper>
        <GalleryTitle>All posts</GalleryTitle>
        <AllPostsGallery />
      </Paper>
    </Stack>
  )
}
