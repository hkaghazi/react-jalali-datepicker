import React, { useEffect, useRef } from "react"
import moment, { Moment } from "jalali-moment"
import { Modal } from "../shared/modal/Modal"
import { Days } from "../views/days/Days"
import { Board } from "../shared/board/Board"
import { Months } from "../views/months/Months"

import "./Datepicker.scss"

type DatepickerProps = {
  label?: string
  className?: string
  errorMessage?: string
  disabled?: boolean
  containerStyle?: string
  defaultValue?: Date
  onChangeValue?: (value: Moment) => void
}

export const Datepicker: React.FC<DatepickerProps> = (props) => {
  const { errorMessage, containerStyle, label, className, defaultValue, onChangeValue, disabled } = props
  const [value, setValue] = React.useState<moment.Moment>(moment(defaultValue))

  // local variables
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [currentView, setCurrentView] = React.useState<"days" | "months" | "years">("days")

  useEffect(() => {
    if (onChangeValue) {
      onChangeValue(value)
    }
  }, [value])

  //
  let view
  switch (currentView) {
    case "months":
      view = <Months currentValue={value} switchView={(v) => setCurrentView(v)} updateValue={(newValue) => setValue(newValue)} />
      break

    default:
      view = <Days currentValue={value} dismissModal={() => setModalIsOpen(false)} updateValue={(newValue) => setValue(newValue)} />
      break
  }

  return (
    <div className={`datepicker__wrapper ${containerStyle}`}>
      <label htmlFor="datapicker__input">
        <span>{label}</span>
        <input
          id="datapicker__input"
          className={`${className} bg-gray-100 py-2 px-3 rounded-lg w-full ` + (errorMessage ? "border-2 border-red-600 focus:outline-none " : "")}
          type="text"
          readOnly
          disabled={disabled}
          value={value.format("jYYYY/jMM/jDD")}
          onClick={() => {
            if (!disabled) {
              setModalIsOpen(true)
            }
          }}
        />
      </label>

      {errorMessage && <small className="block text-xs text-red-600 select-none">{errorMessage}</small>}

      <Modal isOpen={modalIsOpen} onDismis={() => setModalIsOpen(false)}>
        <Board currentValue={value} switchView={() => (currentView == "days" ? setCurrentView("months") : setCurrentView("days"))} updateValue={(newValue) => setValue(newValue)} />
        {view}
      </Modal>
    </div>
  )
}
