import React, { useEffect } from "react"
import moment, { Moment } from "jalali-moment"
import { Modal } from "../shared/modal/Modal"
import { Days } from "../views/days/Days"
import { Board } from "../shared/board/Board"
import { Months } from "../views/months/Months"

import "./Datepicker.scss"

type DatepickerProps = {
  label?: string
  defaultValue?: Moment | Date | string | number
}

export const Datepicker: React.FC<DatepickerProps> = (props) => {
  const { defaultValue } = props
  const [value, setValue] = React.useState<moment.Moment>(moment())

  // local variables
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [currentView, setCurrentView] = React.useState<"days" | "months" | "years">("days")

  useEffect(() => {
    if (!modalIsOpen) {
      setCurrentView("days")
    }
  }, [modalIsOpen])

  // set defualt value
  useEffect(() => {
    if (defaultValue) {
      if (typeof defaultValue == typeof moment) {
        setValue(defaultValue as Moment)
      }

      if (defaultValue instanceof Date) {
        setValue(moment(defaultValue))
      }

      if (typeof defaultValue == "string" || typeof defaultValue == "number") {
        if (moment(defaultValue).isValid()) {
          setValue(moment(defaultValue))
        }
      }
    }
  }, [defaultValue])

  //
  let view
  switch (currentView) {
    case "months":
      view = <Months currentValue={value} switchView={(v) => setCurrentView(v)} updateValue={(newValue) => setValue(newValue)} />
      break

    case "years":
      // !TODO
      break

    default:
      view = <Days currentValue={value} dismissModal={() => setModalIsOpen(false)} updateValue={(newValue) => setValue(newValue)} />
      break
  }

  return (
    <div className="datepicker__wrapper">
      <label htmlFor="datapicker__input">
        <span>{props.label}</span>
        <input id="datapicker__input" type="text" readOnly value={value.format("jYYYY/jMM/jDD")} onClick={() => setModalIsOpen(true)} />
      </label>

      <Modal isOpen={modalIsOpen} onDismis={() => setModalIsOpen(false)}>
        <Board currentValue={value} switchView={() => (currentView == "days" ? setCurrentView("months") : setCurrentView("days"))} updateValue={(newValue) => setValue(newValue)} />
        {view}
      </Modal>
    </div>
  )
}
