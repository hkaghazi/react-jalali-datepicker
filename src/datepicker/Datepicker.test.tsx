import React from "react"
import { render } from "@testing-library/react"

import { Datepicker } from "./Datepicker"

describe("Datepicker", () => {
  test("renders the Datepicker component", () => {
    render(<Datepicker label="datepicker" />)
  })
})
