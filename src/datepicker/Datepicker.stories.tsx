import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { Datepicker } from "./Datepicker"
import moment from "jalali-moment"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Datepicker",
  component: Datepicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Datepicker>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Datepicker> = (args) => <Datepicker {...args} />

export const FirstTemp = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FirstTemp.args = {
  placeholder: "Datepicker label",
  // defaultValue: new Date("2021-01-30"),
  defaultValue: undefined,
}
