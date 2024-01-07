import { faCalendar, faCheck, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Button, ButtonGroup, MenuItem, Select, SelectChangeEvent, SelectProps, Stack } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import classnames from 'classnames'
import {
  addDays,
  addHours,
  eachHourOfInterval,
  endOfDay,
  format as formatDate,
  isToday,
  parse as parseDate,
  parseISO,
  setHours,
  setMinutes,
  startOfDay,
  startOfHour,
} from 'date-fns'
import React, { FC } from 'react'
import { Control, useController } from 'react-hook-form'

import { FontAwesomeIcon } from '../../../Lib/Icons/FontAwesomeIcon'
import { PostData } from '../PostData'

import styles from './PublishToggle.module.scss'

interface PublishToggleProps {
  formControl: Control<PostData>
}

export const PublishSettings: FC<PublishToggleProps> = ({
  formControl,
}) => {
  const releasedController = useController({ control: formControl, name: 'released' })
  const scheduledController = useController({ control: formControl, name: 'scheduled' })

  let state: 'public' | 'private' | 'scheduled'
  if (releasedController.field.value === true) {
    state = 'public'
  } else if (scheduledController.field.value !== null) {
    state = 'scheduled'
  } else {
    state = 'private'
  }

  const onSetPublic = () => {
    releasedController.field.onChange(true)
    scheduledController.field.onChange(null)
  }

  const onSetScheduled = () => {
    releasedController.field.onChange(false)

    let releaseDate = new Date()

    if (releaseDate.getHours() >= 8) {
      releaseDate = addDays(releaseDate, 1)
    }
    releaseDate = setHours(releaseDate, 8)
    releaseDate = setMinutes(releaseDate, 0)

    scheduledController.field.onChange(releaseDate.toISOString())
  }

  const onSetPrivate = () => {
    releasedController.field.onChange(false)
    scheduledController.field.onChange(null)
  }

  const onScheduledDateChange = (date: Date | null) => {
    if (date === null) return scheduledController.field.onChange(null)

    const now = startOfHour(new Date())
    if (isToday(date) && date.getHours() <= now.getHours()) {
      date = addHours(now, 1)
    }

    scheduledController.field.onChange(date.toISOString())
  }

  return (
    <Stack gap={2}>
      <ButtonGroup>
        <Button
          fullWidth
          variant={state === 'public' ? 'contained' : 'outlined'}
          onClick={onSetPublic}
          className={classnames(styles.PublishToggle)}
          startIcon={<FontAwesomeIcon icon={faCheck} fixedWidth />}
        >
          Public
        </Button>

        <Button
          fullWidth
          variant={state === 'scheduled' ? 'contained' : 'outlined'}
          onClick={onSetScheduled}
          className={classnames(styles.PublishToggle)}
          startIcon={<FontAwesomeIcon icon={faCalendar} fixedWidth />}
        >
          Scheduled
        </Button>

        <Button
          fullWidth
          variant={state === 'private' ? 'contained' : 'outlined'}
          onClick={onSetPrivate}
          className={classnames(styles.PublishToggle)}
          startIcon={<FontAwesomeIcon icon={faEyeSlash} fixedWidth />}
        >
          Private
        </Button>
      </ButtonGroup>

      {state === 'scheduled' && (
        <Stack direction="row" gap={1}>
          <DatePicker
            disablePast
            showDaysOutsideCurrentMonth
            value={parseISO(scheduledController.field.value || '')}
            onChange={onScheduledDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                size: 'small',
              },
            }}
          />

          <TimeSelect
            size="small"
            fullWidth
            onChange={onScheduledDateChange}
            value={parseISO(scheduledController.field.value || '')}
          />
        </Stack>
      )}
    </Stack>
  )
}

interface TimeSelectProps extends Omit<SelectProps, 'onChange' | 'value'> {
  onChange: (date: Date) => void
  value: Date
}

export const TimeSelect: FC<TimeSelectProps> = ({
  onChange,
  value,
  ...selectProps
}) => {
  const formatTime = (date: Date) => {
    return formatDate(date, 'h:mm aaa')
  }

  const options = eachHourOfInterval({
    start: startOfDay(value),
    end: endOfDay(value),
  }).map(date => formatTime(date))

  const selected = options.find(option => option === formatTime(value)) || options[0]

  const onSelectChange = (event: SelectChangeEvent<unknown>) => {
    const date = parseDate(event.target.value as string, 'h:mm aaa', value || new Date())
    onChange(date)
  }

  return (
    <Select {...selectProps} value={selected} onChange={onSelectChange}>
      {options.map(time => (
        <MenuItem key={time} value={time}>{time}</MenuItem>
      ))}
    </Select>
  )
}
