import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { format } from 'date-fns'
import React, { FC } from 'react'

import { FontAwesomeIcon } from '../../../Lib'
import { TagChip } from '../Tags/TagChip'

interface ScheduledChipProps {
  date: Date
}

export const ScheduledChip: FC<ScheduledChipProps> = ({
  date,
}) => {
  const day = format(date, 'PP')
  const time = format(date, 'p')

  return (
    <TagChip
      icon={<FontAwesomeIcon icon={faCalendar} />}
      label={`${day} ${time}`}
      title={`Scheduled to release on ${day} at ${time}`}
    />
  )
}
