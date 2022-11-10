import React, { useEffect } from "react"
import moment, { Moment } from "jalali-moment"
import { Modal } from "../shared/modal/Modal"
import { Hours } from "../views/hours/Hours"
import { Board } from "../shared/board/Board"

import "./Timepicker.scss"

type TimepickerProps = {
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

export const Timepicker: React.FC<TimepickerProps> = (props) => {
  const { errorMessage, containerStyle, className, defaultValue, onChangeValue, value, disabled } = props
  const [_value, setValue] = React.useState<moment.Moment | undefined>(defaultValue ? moment(defaultValue) : undefined)

  // local variables
  const [modalIsOpen, setModalIsOpen] = React.useState(false)

  useEffect(() => {
    if (onChangeValue) {
      onChangeValue(_value)
    }
  }, [_value])

  useEffect(() => {
    if (value && moment(value).isValid()) {
      if (moment(value).format("hh:mm") != _value?.format("hh:mm")) {
        setValue(moment(value))
      }
    }
  }, [value])

  return (
    <div className={`datepicker__wrapper ${containerStyle ?? ""}`}>
      <label className="datepicker__label" htmlFor="datapicker__input">
        {props.icon && <span className="inline-flex items-center px-1 flex-grow-0 select-none">{props.icon}</span>}
        <input
          className={`datapicker__input ${className ?? "bg-gray-100 py-2 px-3 rounded-lg w-full"} ` + (errorMessage ? "border-2 border-red-600 focus:outline-none " : "")}
          type="text"
          readOnly
          disabled={disabled}
          value={_value ? _value.format("hh:mm") : ""}
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
        <Board currentValue={_value ?? moment()} showTime="onlyTime" updateValue={(newValue) => setValue(newValue)} />
        <Hours currentValue={_value ?? moment()} updateValue={(newValue) => setValue(newValue)} dismissModal={() => setModalIsOpen(false)} />
      </Modal>
    </div>
  )
}
