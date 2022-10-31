import React, { useEffect, useRef } from "react"
import moment, { Moment } from "jalali-moment"
import { Modal } from "../shared/modal/Modal"
import { Days } from "../views/days/Days"
import { Board } from "../shared/board/Board"
import { Months } from "../views/months/Months"

import "./Datepicker.style.scss"

type DatepickerProps = {
  icon?: React.ReactNode
  placeholder?: string
  className?: string
  errorMessage?: string
  disabled?: boolean
  containerStyle?: string
  defaultValue?: moment.MomentInput
  value?: moment.MomentInput
  onChangeValue?: (value: Moment | undefined) => void
}

export const Datepicker: React.FC<DatepickerProps> = (props) => {
  const { errorMessage, containerStyle, className, defaultValue, value, onChangeValue, disabled } = props
  const [_value, setValue] = React.useState<moment.Moment | undefined>(defaultValue ? moment(defaultValue) : undefined)

  // local variables
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [currentView, setCurrentView] = React.useState<"days" | "months" | "years">("days")

  useEffect(() => {
    if (onChangeValue) {
      onChangeValue(_value)
    }
  }, [_value])

  useEffect(() => {
    if (value && moment(value).isValid()) {
      if (moment(value).format("YYYY-MM-DD") != _value?.format("YYYY-MM-DD")) {
        setValue(moment(value))
      }
    }
  }, [value])

  const onDayselect = (newValue: moment.Moment) => {
    setValue(newValue)
    if (newValue.format("jYYYY-jMM-jDD") == _value?.format("jYYYY-jMM-jDD")) {
      setModalIsOpen(false)
    }
  }

  //
  let view
  switch (currentView) {
    case "months":
      view = <Months currentValue={_value ?? moment()} switchView={(v) => setCurrentView(v)} updateValue={onDayselect} />
      break

    default:
      view = <Days currentValue={_value ?? moment()} dismissModal={() => setModalIsOpen(false)} updateValue={onDayselect} />
      break
  }

  return (
    <div className={`datepicker__wrapper ${containerStyle ?? ""}`}>
      <label className="datepicker__label" htmlFor="datapicker__input">
        {props.icon && <span className="inline-flex items-center px-1 flex-grow-0 select-none">{props.icon}</span>}
        <input
          className={`datapicker__input ${className} bg-gray-100 py-2 px-3 rounded-lg w-full ` + (errorMessage ? "border-2 border-red-600 focus:outline-none " : "")}
          type="text"
          readOnly
          disabled={disabled}
          value={_value ? _value.format("jYYYY/jMM/jDD") : ""}
          placeholder={props.placeholder}
          onClick={() => {
            if (!disabled) {
              setModalIsOpen(true)
            }
          }}
        />
        {props.placeholder && <span className="datapicker__placeholder text-xs select-none">{props.placeholder}</span>}
      </label>

      {errorMessage && <small className="block text-xs text-red-600 select-none">{errorMessage}</small>}

      <Modal isOpen={modalIsOpen} onDismis={() => setModalIsOpen(false)}>
        <Board
          currentValue={_value ?? moment()}
          switchView={() => (currentView == "days" ? setCurrentView("months") : setCurrentView("days"))}
          updateValue={(newValue) => setValue(newValue)}
        />
        {view}
      </Modal>
    </div>
  )
}
