import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"

import { Datepicker } from "./Datepicker"

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
  placeholder: "تاریخ",
  showTime: "both",
  // defaultValue: new Date("2021-01-30"),
  // defaultValue: undefined,
  clearable: true,
  value: undefined,
  onChangeValue: (v) => {
    console.log(v?.format("YYYY-MM-DD HH:mm"))
  },
}
