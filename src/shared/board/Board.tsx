import moment, { Moment } from "moment-jalaali"
import React from "react"
import { ArrowLeftCMP, ArrowRightCMP } from "../icons/Icons"
import "./Board.scss"

moment.loadPersian({ dialect: "persian-modern" })

const persianMonths: { [key: number]: string } = {
  1: "فروردین",
  2: "اردیبهشت",
  3: "خرداد",
  4: "تیر",
  5: "مرداد",
  6: "شهریور",
  7: "مهر",
  8: "آبان",
  9: "آذر",
  10: "دی",
  11: "بهمن",
  12: "اسفند",
}

type BoardProps = {
  currentValue: Moment
  showTime?: "onlyTime" | "onlyDate" | "both"
  switchView?: () => void
  updateValue: (newValue: Moment) => void
}

export const Board: React.FC<BoardProps> = ({ currentValue, showTime = "onlyDate", switchView, updateValue }) => {
  const monthNum = currentValue.jMonth()
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
        <span>
          {currentValue.format(showTime == "both" ? `jD [${persianMonths[monthNum]}] jYYYY HH:mm` : showTime == "onlyTime" ? "HH:mm" : `jD [${persianMonths[monthNum]}] jYYYY`)}
        </span>
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
