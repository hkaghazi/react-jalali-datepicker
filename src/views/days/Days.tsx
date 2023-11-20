import React, { useState, useEffect } from "react"
import moment, { Moment } from "moment-jalaali"
import { DaysHead } from "../../shared/daysHead/DaysHead"
import { DayItem } from "../../shared/dayItem/DayItem"
import { Hours } from "../hours/Hours"

import "./Days.scss"

type DaysProps = {
  currentValue: Moment
  updateValue: (newValue: Moment) => void
  dismissModal: () => void
  showTime: "onlyTime" | "onlyDate" | "both"
}

interface IdaysInMonth {
  date: string
  numDay: number
  dayInWeek: number
  isSelected: boolean
  selectable: boolean
}

export const Days: React.FC<DaysProps> = ({ currentValue, showTime, updateValue, dismissModal }) => {
  const [daysInMonth, setDaysInMonth] = useState<IdaysInMonth[]>([])

  useEffect(() => {
    currentValue.locale("fa")

    setDaysInMonth([...daysBeforeThisMonth(currentValue), ...daysThisMonth(currentValue), ...daysAfterThisMonth(currentValue)])
  }, [currentValue])

  return (
    <div className="rjd__days-container">
      <div className="rjd_days-main-wrapper">
        <div className="rjd_days-wrapper">
          <DaysHead />

          <div className="rjd_days-inner-wrapper">
            {daysInMonth.map((dayData, idx) => (
              <DayItem key={idx} updateValue={updateValue} {...dayData} />
            ))}
          </div>
        </div>

        {(showTime == "both" || showTime == "onlyTime") && <Hours currentValue={currentValue} updateValue={updateValue} showOkButton={false} />}
      </div>

      <button type="button" className="rjd__btn-return" onClick={dismissModal}>
        تایید
      </button>
    </div>
  )
}

const daysBeforeThisMonth = (currentValue: Moment) => {
  let daysInMonth = []
  const clonedDate = currentValue.clone()
  const weekOfFirstDayOFMonth = clonedDate.startOf("jMonth").weekday()

  const firstDayOFMonth = clonedDate.startOf("jMonth").set("hour", currentValue.get("hour")).set("minute", currentValue.get("minute"))
  for (let dayIdx = 1; dayIdx <= weekOfFirstDayOFMonth; dayIdx++) {
    firstDayOFMonth.subtract(1, "day")
    daysInMonth.push({
      date: firstDayOFMonth.toISOString(),
      numDay: Number(firstDayOFMonth.format("jDD")),
      dayInWeek: firstDayOFMonth.weekday(),
      isSelected: firstDayOFMonth.diff(currentValue, "d") == 0,
      selectable: false,
    })
  }
  daysInMonth = daysInMonth.reverse()
  return daysInMonth
}

const jDaysInMonth = (date: Moment) => moment(date.endOf("jMonth")).diff(date.startOf("jMonth"), "day") + 1

const daysThisMonth = (currentValue: Moment) => {
  const daysInMonth = []
  const clonedDate = currentValue.clone()
  const firstDayOFMonth = clonedDate.startOf("jMonth").set("hour", currentValue.get("hour")).set("minute", currentValue.get("minute"))
  const firstDayCloned = firstDayOFMonth.clone()
  for (let dayIdx = 1; dayIdx <= jDaysInMonth(clonedDate); dayIdx++) {
    daysInMonth.push({
      date: firstDayCloned.toISOString(),
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
  const weekOfLastDayOFMonth = clonedDate.endOf("jMonth").weekday()

  const lastDayOFMonth = clonedDate.endOf("jMonth").set("hour", currentValue.get("hour")).set("minute", currentValue.get("minute"))
  for (let dayIdx = 1; dayIdx <= 6 - weekOfLastDayOFMonth; dayIdx++) {
    lastDayOFMonth.add(1, "day")
    daysInMonth.push({
      date: lastDayOFMonth.toISOString(),
      numDay: Number(lastDayOFMonth.format("jDD")),
      dayInWeek: lastDayOFMonth.weekday(),
      isSelected: lastDayOFMonth.diff(currentValue, "d") == 0,
      selectable: false,
    })
  }

  return daysInMonth
}
