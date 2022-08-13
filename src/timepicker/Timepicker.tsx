import React, { useEffect } from "react"
import moment, { Moment } from "jalali-moment"
import { Modal } from "../shared/modal/Modal"
import { Hours } from "../views/hours/Hours"
import { Board } from "../shared/board/Board"

import "./Timepicker.scss"

type DatepickerProps = {
  label?: string
  className?: string
  errorMessage?: string
  disabled?: boolean
  containerStyle?: string
  defaultValue?: moment.MomentInput
  value?: moment.MomentInput
  onChangeValue?: (value: Moment) => void
}

export const Timepicker: React.FC<DatepickerProps> = (props) => {
  const { errorMessage, containerStyle, label, className, defaultValue, onChangeValue, value, disabled } = props
  const [_value, setValue] = React.useState<moment.Moment>(moment(defaultValue))

  // local variables
  const [modalIsOpen, setModalIsOpen] = React.useState(false)

  useEffect(() => {
    if (onChangeValue) {
      onChangeValue(_value)
    }
  }, [_value])

  useEffect(() => {
    if (value) {
      if (_value.format("hh:mm") != moment(value).format("hh:mm")) {
        setValue(moment(value))
      }
    }
  }, [value])

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
          value={_value.format("hh:mm")}
          onClick={() => {
            if (!disabled) {
              setModalIsOpen(true)
            }
          }}
        />
      </label>

      {errorMessage && <small className="block text-xs text-red-600 select-none">{errorMessage}</small>}

      <Modal isOpen={modalIsOpen} onDismis={() => setModalIsOpen(false)}>
        <Board currentValue={_value} showTime="onlyTime" updateValue={(newValue) => setValue(newValue)} />

        <Hours currentValue={_value} updateValue={(newValue) => setValue(newValue)} />
      </Modal>
    </div>
  )
}
