import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import { format } from "date-fns"
import { FC } from "react"

import { TagChip } from "../Tags"
import { FontAwesomeIcon } from "../Icons"

interface ScheduledChipProps {
  date: Date
}

export const ScheduledChip: FC<ScheduledChipProps> = ({ date }) => {
  const day = format(date, "PP")
  const time = format(date, "p")

  return (
    <TagChip
      icon={<FontAwesomeIcon icon={faCalendar} />}
      label={`${day} ${time}`}
      title={`Scheduled to release on ${day} at ${time}`}
    />
  )
}
