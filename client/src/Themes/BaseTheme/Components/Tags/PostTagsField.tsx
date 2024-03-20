import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { Autocomplete, createFilterOptions, Stack, TextField } from '@mui/material'
import React, { FC } from 'react'

import { byTagName, FontAwesomeIcon, formatSlug } from '../../../../Lib'
import { TagData } from '../../../../Models'
import { useAllTags$, useCreateTag$ } from '../../../../Queries'

type NewTagData = { id: null; name: string }
type TagOption = TagData | NewTagData

const tagsFilter = createFilterOptions<TagOption>()

interface PostTagsFieldProps {
  onChange: (tags: TagData[]) => void
  selected: TagData[]
  error?: unknown
}

export const PostTagsField: FC<PostTagsFieldProps> = ({
  selected = [],
  onChange,
}) => {
  const allTags$ = useAllTags$()
  const createTag$ = useCreateTag$()

  if (allTags$.isPending) {
    return <div>Loading...</div>
  } else if (allTags$.isError) {
    return <div>Error: {String(allTags$.error)}</div>
  }

  const onTagsChanged = async (tags: TagOption[]) => {
    let selectedTags = tags.filter(tag => tag.id !== null) as TagData[]

    const newTags = tags.filter(tag => tag.id === null) as NewTagData[]
    if (newTags.length >= 0) {
      const createdTags = await Promise.all(newTags.map(tag => {
        const tagPayload = { name: tag.name, slug: formatSlug(tag.name), featured: false }
        return createTag$.mutateAsync({ tag: tagPayload })
      }))

      selectedTags = [ ...selectedTags, ...createdTags ]
    }

    return onChange(selectedTags.sort(byTagName.ascending()))
  }

  const allTags: TagOption[] = allTags$.data

  return (
    <Autocomplete
      size="small"
      value={selected}
      multiple
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      disableClearable
      disableCloseOnSelect
      options={allTags}
      onChange={(event, tags) => onTagsChanged(tags)}
      renderTags={() => null}
      getOptionLabel={(tag) => tag.name}
      renderInput={(params) => (<TextField {...params} placeholder="Search" />)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterOptions={(options, params) => {
        const filtered = tagsFilter(options, params)
        const { inputValue } = params

        const isExisting = options.some((option) => inputValue.toLowerCase() === option.name.toLowerCase())
        if (inputValue !== '' && !isExisting) {
          filtered.push({ name: inputValue, id: null })
        }

        return filtered
      }}
      renderOption={(props, tag, state) => (
        <li {...props}>
          <Stack direction="row" gap={2} alignItems="center">
            <FontAwesomeIcon icon={state.selected ? faSquareCheck : faSquare} />
            {tag.name}
          </Stack>
        </li>
      )}
    />
  )
}
