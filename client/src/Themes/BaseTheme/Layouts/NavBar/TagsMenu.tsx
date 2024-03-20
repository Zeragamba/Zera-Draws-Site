import { Box, Menu, MenuItem, TextField } from '@mui/material'
import React, { FC, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { NavBarLink } from './NavBarLink'
import { useTagMenuCtrl } from '../../../../Controllers'
import { useIsMobile } from '../../../../Hooks'
import { TagData } from '../../../../Models'

const MIN_TAGS_FOR_SEARCH = 15

export const TagsMenu: FC = () => {
  const navigate = useNavigate()
  const tagMenu = useTagMenuCtrl()

  const isMobile = useIsMobile()
  const [ menuOpen, setMenuOpen ] = useState<boolean>(false)

  const anchorEl = useRef<HTMLAnchorElement | null>(null)

  const onTagClick = (tag: TagData) => {
    setMenuOpen(false)
    navigate(`/tag/${tag.slug}`)
  }

  return (
    <>
      <NavBarLink onClick={() => setMenuOpen(true)} buttonRef={anchorEl} label="Tags" />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl.current}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        TransitionProps={{
          onExited: () => tagMenu.setFilterText(''),
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            maxHeight: '500px',
            width: isMobile ? '100%' : undefined,
          },
        }}
      >
        {(tagMenu.activeTags.length >= MIN_TAGS_FOR_SEARCH) && (
          <MenuItem onKeyDown={(e) => e.stopPropagation()}>
            <TextField
              fullWidth
              size={'small'}
              placeholder={'Search...'}
              value={tagMenu.filterText}
              onChange={(event) => tagMenu.setFilterText(event.target.value)}
            />
          </MenuItem>
        )}

        {tagMenu.isPending && <MenuItem disabled>Loading...</MenuItem>}

        {tagMenu.filteredTags.map(tag => (
          <MenuItem
            key={tag.id}
            onClick={() => onTagClick(tag)}
            sx={{ justifyContent: 'space-between', gap: 2 }}
          >
            <Box>{tag.name}</Box>
            <Box>{tag.num_posts}</Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
