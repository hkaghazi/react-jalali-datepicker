import React from "react"
import { persianWeekDays } from "../../helpers/weekDayName"

import "./DaysHead.scss"

type DaysHeadProps = {}

export const DaysHead: React.FC<DaysHeadProps> = (props) => {
  return (
    <div className="rjd__days-head-container">
      {persianWeekDays.map((wd) => (
        <div key={wd.idx} className={`rjd__days-head-items ${wd.holiday ? "rjd__holiday" : ""}`}>
          {wd.abbre}
        </div>
      ))}
    </div>
  )
}
