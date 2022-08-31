import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { Timepicker } from "./Timepicker"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Timepicker",
  component: Timepicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Timepicker>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Timepicker> = (args) => <Timepicker {...args} />

export const FirstTemp = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FirstTemp.args = {
  placeholder: "Timepicker label",
  // defaultValue: 1660331281000,
  // value: new Date().valueOf()
}
