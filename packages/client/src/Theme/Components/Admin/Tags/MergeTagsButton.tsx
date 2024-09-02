import { faRightToBracket, faSpinner } from "@fortawesome/free-solid-svg-icons"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material"
import { FC, useState } from "react"

import { FontAwesomeIcon, noop } from "../../../../Lib"
import { TagData } from "../../../../Models"
import { useAllTags$, useMergeTags$ } from "../../../../Queries"
import { Spinner } from "../../Shared"

interface MergeTagButtonProps {
  srcTag: TagData
  fullWidth?: boolean
  onMerged?: (tag: TagData) => void
}

export const MergeTagButton: FC<MergeTagButtonProps> = ({
  srcTag,
  fullWidth,
  onMerged = noop,
}) => {
  const allTags$ = useAllTags$()
  const mergeTags$ = useMergeTags$()
  const [promptOpen, setPromptOpen] = useState<boolean>(false)
  const [destTagId, setDestTagId] = useState<TagData["id"] | null>(null)

  const allTags = allTags$.data

  const onDestSelect = (destId: string) => {
    setDestTagId(destId || null)
  }

  const onMerge = async () => {
    if (!destTagId) return
    const mergedTag = await mergeTags$.mutateAsync({
      srcTagId: srcTag.id,
      destTagId: destTagId,
    })
    setPromptOpen(false)
    onMerged(mergedTag)
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setPromptOpen(true)}
        startIcon={<FontAwesomeIcon icon={faRightToBracket} />}
        fullWidth={fullWidth}
      >
        Merge Into
      </Button>

      <Dialog open={promptOpen}>
        <DialogContent>
          {!allTags && <Spinner />}
          {allTags && (
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Merge Into</InputLabel>
              <Select
                label="Merge into"
                value={destTagId || ""}
                onChange={(event) => onDestSelect(event.target.value)}
              >
                <MenuItem value="" />
                {allTags
                  .filter((tag) => tag.id !== srcTag.id)
                  .map((tag) => (
                    <MenuItem key={tag.id} value={tag.id}>
                      {tag.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          {mergeTags$.isPending ? (
            <Stack gap={2} direction="row">
              <FontAwesomeIcon icon={faSpinner} spin />
              <Typography>Merging...</Typography>
            </Stack>
          ) : (
            <>
              <Button onClick={() => setPromptOpen(false)}>Cancel</Button>
              <Button
                onClick={onMerge}
                color="error"
                variant="contained"
                disabled={!destTagId}
              >
                Merge
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
