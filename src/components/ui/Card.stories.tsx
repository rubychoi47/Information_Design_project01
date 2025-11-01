import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";

import { MoveUp } from "lucide-react";

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

export const Basic: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Net revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p>$3,342,868,034</p>
        </CardContent>
        <CardFooter>
          <p className="text-main-1 flex items-center">
            <MoveUp className="h-[0.625rem] w-3" />
            10.92%
          </p>
          <span className="text-gray-7">Last month</span>
        </CardFooter>
      </>
    ) as React.ReactNode,
  },
};
