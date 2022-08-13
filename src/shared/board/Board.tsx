import React from "react"
import { Moment } from "jalali-moment"
import { ArrowLeftCMP, ArrowRightCMP } from "../icons/Icons"
import { getMonthPersianName } from "../../helpers/persianMonthName"

import "./Board.scss"

type BoardProps = {
  currentValue: Moment
  showTime?: "onlyTime" | "onlyDate" | "both"
  switchView?: () => void
  updateValue: (newValue: Moment) => void
}

export const Board: React.FC<BoardProps> = ({ currentValue, showTime = "onlyDate", switchView, updateValue }) => {
  const goAMonthAhead = () => {
    updateValue(currentValue.add(1, "jMonth").clone())
  }

  const returnAMonthBack = () => {
    updateValue(currentValue.subtract(1, "jMonth").clone())
  }

  return (
    <div className="rjd__board-container">
      <div>
        {(showTime == "both" || showTime == "onlyDate") && (
          <button type="button" className="rjd__go-back" onClick={goAMonthAhead}>
            <ArrowRightCMP width={32} height={32} />
          </button>
        )}
      </div>

      <main className="rjd__board-text" onClick={switchView}>
        {(showTime == "both" || showTime == "onlyDate") && (
          <>
            <span>{Number(currentValue.format("jD")).toLocaleString("fa-IR", { useGrouping: false })}</span>
            <span style={{ paddingLeft: 4, paddingRight: 4 }}>{getMonthPersianName(currentValue.format("jMM"))}</span>
            <span>{Number(currentValue.format("jYYYY")).toLocaleString("fa-IR", { useGrouping: false })}</span>
          </>
        )}
        {(showTime == "both" || showTime == "onlyTime") && (
          <>
            <span>{currentValue.format("hh:mm")}</span>
          </>
        )}
      </main>

      <div>
        {(showTime == "both" || showTime == "onlyDate") && (
          <button type="button" className="rjd__go-forward" onClick={returnAMonthBack}>
            <ArrowLeftCMP width={32} height={32} />
          </button>
        )}
      </div>
    </div>
  )
}
