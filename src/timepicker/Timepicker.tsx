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
  defaultValue?: Date
  onChangeValue?: (value: Moment) => void
}

export const Timepicker: React.FC<DatepickerProps> = (props) => {
  const { errorMessage, containerStyle, label, className, defaultValue, onChangeValue, disabled } = props
  const [value, setValue] = React.useState<moment.Moment>(moment(defaultValue))

  // local variables
  const [modalIsOpen, setModalIsOpen] = React.useState(false)

  useEffect(() => {
    if (onChangeValue) {
      onChangeValue(value)
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
          value={value.format("hh:mm")}
          onClick={() => {
            if (!disabled) {
              setModalIsOpen(true)
            }
          }}
        />
      </label>

      {errorMessage && <small className="block text-xs text-red-600 select-none">{errorMessage}</small>}

      <Modal isOpen={modalIsOpen} onDismis={() => setModalIsOpen(false)}>
        <Board currentValue={value} showTime="onlyTime" updateValue={(newValue) => setValue(newValue)} />

        <Hours currentValue={value} updateValue={(newValue) => setValue(newValue)} />
      </Modal>
    </div>
  )
}
