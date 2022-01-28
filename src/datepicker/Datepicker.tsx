import React from "react"

type DatepickerProps = {
  label?: string
}

export const Datepicker: React.FC<DatepickerProps> = (props) => {
  return (
    <>
      <label htmlFor="datapicker__input">
        <span>{props.label}</span>
        <input id="datapicker__input" type="text" />
      </label>
    </>
  )
}
