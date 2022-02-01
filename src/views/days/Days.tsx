import React, { useState, useEffect } from "react"
import { Moment } from "jalali-moment"
import { DaysHead } from "../../shared/daysHead/DaysHead"
import { DayItem } from "../../shared/dayItem/DayItem"

import "./Days.scss"

type DaysProps = {
  currentValue: Moment
  updateValue: (newValue: Moment) => void
  dismissModal: () => void
}

interface IdaysInMonth {
  date: string
  numDay: number
  dayInWeek: number
  isSelected: boolean
  selectable: boolean
}

export const Days: React.FC<DaysProps> = ({ currentValue, updateValue, dismissModal }) => {
  const [daysInMonth, setDaysInMonth] = useState<IdaysInMonth[]>([])

  useEffect(() => {
    currentValue.locale("fa")

    setDaysInMonth([...daysBeforeThisMonth(currentValue), ...daysThisMonth(currentValue), ...daysAfterThisMonth(currentValue)])
  }, [currentValue])

  return (
    <div className="rjd__days-container">
      <DaysHead />

      <div className="rjd_days-inner-wrapper">
        {daysInMonth.map((dayData, idx) => (
          <DayItem key={idx} updateValue={updateValue} {...dayData} />
        ))}
      </div>

      <button className="rjd__btn-return" onClick={dismissModal}>
        تایید
      </button>
    </div>
  )
}

const daysBeforeThisMonth = (currentValue: Moment) => {
  const daysInMonth = []
  const clonedDate = currentValue.clone()
  let firstDayOFMonth = clonedDate.startOf("jMonth")
  const weekOfFirstDayOFMonth = clonedDate.startOf("jMonth").weekday()

  for (let dayIdx = 0; dayIdx < weekOfFirstDayOFMonth; dayIdx++) {
    firstDayOFMonth.subtract(6 - dayIdx, "jDay")
    daysInMonth.push({
      date: firstDayOFMonth.format("jYYYY-jMM-jDD"),
      numDay: Number(firstDayOFMonth.format("jDD")),
      dayInWeek: firstDayOFMonth.weekday(),
      isSelected: firstDayOFMonth.diff(currentValue, "d") == 0,
      selectable: false,
    })
    firstDayOFMonth = currentValue.clone().startOf("jMonth")
  }

  return daysInMonth
}

const daysThisMonth = (currentValue: Moment) => {
  const daysInMonth = []
  const clonedDate = currentValue.clone()
  const firstDayOFMonth = clonedDate.startOf("jMonth")
  const firstDayCloned = firstDayOFMonth.clone()
  for (let dayIdx = 1; dayIdx <= clonedDate.jDaysInMonth(); dayIdx++) {
    daysInMonth.push({
      date: firstDayCloned.format("jYYYY-jMM-jDD"),
      numDay: Number(firstDayCloned.format("jDD")),
      dayInWeek: firstDayCloned.weekday(),
      isSelected: firstDayCloned.isSame(currentValue, "day"),
      selectable: true,
    })

    firstDayCloned.add(1, "d")
  }

  return daysInMonth
}

const daysAfterThisMonth = (currentValue: Moment) => {
  const daysInMonth = []
  const clonedDate = currentValue.clone()
  let lastDayOFMonth = clonedDate.endOf("jMonth")
  const weekOfLastDayOFMonth = clonedDate.endOf("jMonth").weekday()

  for (let dayIdx = 1; dayIdx <= 6 - weekOfLastDayOFMonth; dayIdx++) {
    lastDayOFMonth.add(dayIdx, "jDay")
    daysInMonth.push({
      date: lastDayOFMonth.format("jYYYY-jMM-jDD"),
      numDay: Number(lastDayOFMonth.format("jDD")),
      dayInWeek: lastDayOFMonth.weekday(),
      isSelected: lastDayOFMonth.diff(currentValue, "d") == 0,
      selectable: false,
    })

    lastDayOFMonth = currentValue.clone().endOf("jMonth")
  }

  return daysInMonth
}
