import { Menu, MenuItem } from '@mui/material'
import React, { FC, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { NavBarLink } from './NavBarLink'
import { TagData } from '../../Tags/TagData'
import { useAllTags$ } from '../../Tags/TagsApi'
import { useIsMobile } from '../ScreenSize'

export const TagsMenu: FC = () => {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const { data: tags } = useAllTags$()
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
        {!tags && <MenuItem disabled>Loading...</MenuItem>}
        {(tags && tags?.length === 0) && <MenuItem disabled>None</MenuItem>}
        {(tags && tags.length >= 1) && (
          tags
            .filter(tag => tag.num_posts >= 1)
            .map(tag => (
              <MenuItem key={tag.id} onClick={() => onTagClick(tag)}>
                {tag.name}
              </MenuItem>
            ))
        )}
      </Menu>
    </>
  )
}
