import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { Stack, Typography } from '@mui/material'
import React, { FC } from 'react'

import { NavItem } from './NavItem'
import { SidebarGroup } from './SidebarGroup'
import { SidebarTextField } from './SidebarTextField'
import { FontAwesomeIcon } from '../../../../Lib/Icons/FontAwesomeIcon'
import { useTagMenu } from '../../../../Lib/Tags/UseTagMenu'

interface SidebarTagsProps {
  onBack: () => void
}

export const SidebarTags: FC<SidebarTagsProps> = ({
  onBack,
}) => {
  const tagMenu = useTagMenu()

  return (
    <>
      <SidebarGroup>
        <NavItem
          label={'Back'}
          onClick={() => onBack()}
          adornments={{ right: <FontAwesomeIcon icon={faAngleLeft} /> }}
        />
      </SidebarGroup>

      <SidebarTextField
        placeholder={'Search...'}
        value={tagMenu.filterText}
        onChange={(event) => tagMenu.setFilterText(event.target.value)}
      />

      <Stack sx={{ flexGrow: 1, overflowY: 'auto', paddingTop: 2, paddingBottom: 2 }}>
        {tagMenu.isPending && <NavItem label="Loading..." />}

        {tagMenu.filteredTags.map(tag => (
          <NavItem
            key={tag.id}
            to={`/tag/${tag.slug}`}
            label={tag.name}
            adornments={{ right: <Typography>{tag.num_posts}</Typography> }}
          />
        ))}
      </Stack>
    </>
  )
}