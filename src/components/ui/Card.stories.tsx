import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Up: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Net revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p>$3,342,868,034</p>
        </CardContent>
        <CardFooter trend="up" value="10.92%" footerText="Last month" />
      </>
    ) as React.ReactNode,
  },
};

export const Down: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Net revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p>$3,342,868,034</p>
        </CardContent>
        <CardFooter trend="down" value="10.92%" footerText="Last month" />
      </>
    ) as React.ReactNode,
  },
};
