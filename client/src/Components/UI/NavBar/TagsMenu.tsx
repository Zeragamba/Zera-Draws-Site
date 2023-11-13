import { Box, Menu, MenuItem, TextField } from '@mui/material'
import React, { FC, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { NavBarLink } from './NavBarLink'
import { TagData } from '../../Tags/TagData'
import { filterTags, TagFilter } from '../../Tags/TagFilter'
import { useAllTags$ } from '../../Tags/TagsApi'
import { useIsMobile } from '../ScreenSize'

export const TagsMenu: FC = () => {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const allTags$ = useAllTags$()
  const [ menuOpen, setMenuOpen ] = useState<boolean>(false)
  const [ filterText, setFilterText ] = useState<string>('')

  const anchorEl = useRef<HTMLAnchorElement | null>(null)
  const MIN_TAGS_FOR_SEARCH = 15

  const activeTags = allTags$.data?.filter(tag => tag.num_posts >= 1) ?? []

  const tagFilter: TagFilter = {}

  if (filterText) {
    tagFilter.name = filterText
  } else if (activeTags.length >= MIN_TAGS_FOR_SEARCH) {
    tagFilter.minPosts = 10
  }

  const filteredTags = filterTags(activeTags, tagFilter)

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
          onExited: () => setFilterText(''),
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
        {(activeTags.length >= MIN_TAGS_FOR_SEARCH) && (
          <MenuItem onKeyDown={(e) => e.stopPropagation()}>
            <TextField
              fullWidth
              size={'small'}
              placeholder={'Search...'}
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
            />
          </MenuItem>
        )}

        {allTags$.isPending && <MenuItem disabled>Loading...</MenuItem>}

        {filteredTags.map(tag => (
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
