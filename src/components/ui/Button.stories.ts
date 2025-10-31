import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { SignalHigh } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    icon: { control: false },
  },
  args: {
    children: "Button",
    disabled: false,
    icon: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Injective: Story = {
  args: {
    children: "Injective",
    icon: SignalHigh,
  },
};

export const NoIcon: Story = {
  args: {
    children: "NoIcon",
    icon: undefined,
  },
};
