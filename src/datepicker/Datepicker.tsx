import React, { useEffect, useRef } from "react"
import moment, { Moment } from "jalali-moment"
import { Modal } from "../shared/modal/Modal"
import { Days } from "../views/days/Days"
import { Board } from "../shared/board/Board"
import { Months } from "../views/months/Months"

import "./Datepicker.style.scss"

type DatepickerProps = {
  icon?: React.ReactNode
  placeholder?: string[]
  className?: string
  errorMessage?: string
  disabled?: boolean
  containerStyle?: string
  defaultValue?: moment.MomentInput
  value?: moment.MomentInput | undefined
  onChangeValue?: (value: Moment | undefined) => void
}

export const Datepicker: React.FC<DatepickerProps> = (props) => {
  const {
    errorMessage,
    containerStyle,
    className,
    defaultValue,
    value,
    onChangeValue,
    disabled,
  } = props
  const [_value, setValue] = React.useState<moment.Moment | undefined>(
    defaultValue ? moment(defaultValue) : undefined
  )
  const [day, setDay] = React.useState("")
  const [month, setMonth] = React.useState("")
  const [year, setYear] = React.useState("")

  const updateDate = (d: string, m: string, y: string) => {
    if (Number(d) && Number(m) && Number(y)) {
      setValue(moment(`${y}-${m}-${d}`, "jYYYY-jMM-jDD"))
    }
  }

  // local variables
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [currentView, setCurrentView] =
    React.useState<"days" | "months" | "years">("days")

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
    } else {
      setDay("")
      setMonth("")
      setYear("")
    }
  }, [value])

  const onDayselect = (newValue: moment.Moment) => {
    setValue(newValue)
    setDay(String(newValue.jDate()))
    setMonth(String(newValue.jMonth() + 1))
    setYear(String(newValue.jYear()))
    if (newValue.format("jYYYY-jMM-jDD") == _value?.format("jYYYY-jMM-jDD")) {
      setModalIsOpen(false)
    }
  }

  //
  let view
  switch (currentView) {
    case "months":
      view = (
        <Months
          currentValue={_value ?? moment()}
          switchView={(v) => setCurrentView(v)}
          updateValue={onDayselect}
        />
      )
      break

    default:
      view = (
        <Days
          currentValue={_value ?? moment()}
          dismissModal={() => setModalIsOpen(false)}
          updateValue={onDayselect}
        />
      )
      break
  }

  return (
    <div className={`datepicker__wrapper ${containerStyle ?? ""}`}>
      <label className="datepicker__label" htmlFor="datapicker__input">
        <input
          type="number"
          autoFocus
          maxLength={2}
          min={1}
          max={31}
          value={day}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
            setDay(ev.target.value)
          }
          onBlur={() => {
            if (!day) {
              setDay(String(moment().jDate()))
            } else if (Number(day) > 31) {
              setDay("31")
            } else if (Number(day) < 1) {
              setDay("1")
            }
          }}
          placeholder={props?.placeholder?.[0] || "day"}
        />
        /
        <input
          type="number"
          maxLength={2}
          min={1}
          max={12}
          value={month}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
            setMonth(ev.target.value)
          }
          onBlur={(ev) => {
            let tmp = ev.target.value
            if (!month) {
              tmp = String(moment().jMonth() + 1)
              setMonth(tmp)
            } else if (Number(month) > 12) {
              tmp = "12"
              setMonth("12")
            } else if (Number(month) < 1) {
              tmp = "1"
              setMonth("1")
            }
            if (Number(tmp) >= 7 && Number(tmp) <= 11 && day == "31") {
              setDay("30")
            } else if (Number(tmp) == 12 && Number(day) > 29) {
              setDay("29")
            }
          }}
          placeholder={props?.placeholder?.[1] || "month"}
        />
        /
        <input
          type="number"
          maxLength={4}
          min={1300}
          max={1500}
          value={year}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
            setYear(ev.target.value)
          }
          onBlur={(ev) => {
            let tmp = ev.target.value
            if (!year) {
              tmp = String(moment().jYear())
              setYear(tmp)
            } else if (Number(year) > 1500) {
              tmp = "1500"
              setYear("1500")
            } else if (Number(year) < 1300) {
              tmp = "1300"
              setYear("1300")
            }
            updateDate(day, month, tmp)
          }}
          placeholder={props?.placeholder?.[2] || "year"}
        />
        <button
          onClick={() => setModalIsOpen(true)}
          style={{ cursor: "pointer" }}
        >
          {props.icon ? (
            <span className="inline-flex items-center px-1 flex-grow-0 select-none">
              {props.icon}
            </span>
          ) : (
            <>pick</>
          )}
        </button>
        {/*{props.icon && (
          <span className="inline-flex items-center px-1 flex-grow-0 select-none">
            {props.icon}
          </span>
        )}
         <input
          className={
            `datapicker__input ${
              className ?? "bg-gray-100 py-2 px-3 rounded-lg w-full"
            } ` +
            (errorMessage ? "border-2 border-red-600 focus:outline-none " : "")
          }
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
        /> */}
        {/* {props.placeholder && (
          <span className="datapicker__placeholder text-xs select-none">
            {props.placeholder}
          </span>
        )} */}
      </label>

      {errorMessage && (
        <small className="block text-xs text-red-600 select-none">
          {errorMessage}
        </small>
      )}

      <Modal isOpen={modalIsOpen} onDismis={() => setModalIsOpen(false)}>
        <Board
          currentValue={_value ?? moment()}
          switchView={() =>
            currentView == "days"
              ? setCurrentView("months")
              : setCurrentView("days")
          }
          updateValue={(newValue) => setValue(newValue)}
        />
        {view}
      </Modal>
    </div>
  )
}
