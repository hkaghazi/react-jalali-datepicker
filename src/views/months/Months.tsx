import React, { useEffect, useState } from "react"
import moment, { Moment } from "jalali-moment"
import { SelectList } from "../../shared/selectList/SelectList"
import { months } from "../../helpers/persianMonthName"

import "./Months.scss"

type DaysProps = {
  currentValue: Moment
  switchView: (view: "months" | "days") => void
  updateValue: (newValue: Moment) => void
}

export const Months: React.FC<DaysProps> = ({ currentValue, switchView, updateValue }) => {
  const [currentYear, setCurrentYear] = useState<string>("1400")
  const [currentMonth, setCurrentMonth] = useState<string>("1")

  useEffect(() => {
    setCurrentYear(currentValue.format("jYYYY"))
    setCurrentMonth(Number(currentValue.format("jMM")).toString())
  }, [currentValue])

  const updateValueByMonth = (value: string) => {
    updateValue(moment(`${currentValue.format("jYYYY")}-${value}-${currentValue.format("jDD")}`, "jYYYY-jMM-jDD"))
  }
  const updateValueByYear = (value: string) => {
    updateValue(moment(`${value}-${currentValue.format("jMM")}-${currentValue.format("jDD")}`, "jYYYY-jMM-jDD"))
  }

  return (
    <div className="rjd__months-container">
      <SelectList list={months} defaultValue={currentMonth} onChange={(v) => updateValueByMonth(String(v))} />
      <SelectList list={getYearsList()} defaultValue={currentYear} onChange={(v) => updateValueByYear(String(v))} />
      <button type="button" className="rjd__btn-return" onClick={() => switchView("days")}>
        تایید
      </button>
    </div>
  )
}

const getYearsList = () => {
  const years = []
  for (let yr = 1450; yr > 1300; yr--) {
    years.push({ id: yr, name: yr.toLocaleString("fa-IR", { useGrouping: false }) })
  }

  return years
}
