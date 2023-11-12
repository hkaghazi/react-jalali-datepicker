import moment, { Moment } from "jalali-moment"
import React from "react"

import "./DayItem.scss"

type DayItemProps = {
  date: string
  numDay: number
  dayInWeek: number
  isSelected: boolean
  selectable: boolean
  updateValue: (newValue: Moment) => void
}

export const DayItem: React.FC<DayItemProps> = (props) => {
  const { date, numDay, selectable, isSelected, dayInWeek, updateValue } = props

  const selectNewDate = () => {
    updateValue(moment(new Date(date)))
  }

  return (
    <div className={`rjd__day-item ${!selectable ? "disabled" : ""} ${isSelected ? "selected" : ""} ${dayInWeek == 6 ? "rjd__holiday" : ""}`} onClick={selectNewDate}>
      {numDay?.toLocaleString("fa-IR")}
    </div>
  )
}
