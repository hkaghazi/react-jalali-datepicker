import React, { useEffect, useState } from "react"
import moment, { Moment } from "jalali-moment"
import { SelectList } from "../../shared/selectList/SelectList"

import "./Hours.scss"

type DaysProps = {
  currentValue: Moment
  updateValue: (newValue: Moment) => void
}

export const Hours: React.FC<DaysProps> = ({ currentValue, updateValue }) => {
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours())
  const [currentMinute, setCurrentMinute] = useState<number>(new Date().getMinutes())

  useEffect(() => {
    setCurrentMinute(currentValue.minute())
    setCurrentHour(currentValue.hour())
  }, [currentValue])

  const updateValueByHour = (value: number) => {
    updateValue(currentValue.set("hour", value).clone())
  }

  const updateValueByMinute = (value: number) => {
    updateValue(currentValue.set("minute", value).clone())
  }

  return (
    <div className="rjd__months-container">
      <SelectList list={minutesList()} defaultValue={currentMinute} onChange={(v) => updateValueByMinute(Number(v))} />
      <SelectList list={hoursList()} defaultValue={currentHour} onChange={(v) => updateValueByHour(Number(v))} />
      <button className="rjd__btn-return" onClick={() => {}}>
        تایید
      </button>
    </div>
  )
}

const hoursList = () => {
  const hours = []
  for (let i = 1; i <= 12; i++) {
    hours.push({ id: i, name: i.toString() })
  }
  return hours
}

const minutesList = () => {
  const hours = []
  for (let i = 1; i <= 60; i++) {
    hours.push({ id: i, name: i.toString() })
  }
  return hours
}
