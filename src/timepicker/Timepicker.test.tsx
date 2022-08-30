import React from "react"
import { render } from "@testing-library/react"

import { Timepicker } from "./Timepicker"

describe("Datepicker", () => {
  test("renders the Datepicker component", () => {
    render(<Timepicker placeholder="timepicker" />)
  })
})
