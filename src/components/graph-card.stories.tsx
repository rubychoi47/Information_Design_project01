import { GraphCard, CardTitle, CardContent } from "./graph-card";

import type { Meta, StoryObj } from "@storybook/react";
import DynamicChart from "./graph";

const meta: Meta<typeof GraphCard> = {
  title: "Components/Graph",
  component: GraphCard,
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
        <CardTitle>User Growth/Attrition Relative to Price Movement</CardTitle>
        <CardContent>
          <DynamicChart />
        </CardContent>
      </>
    ) as React.ReactNode,
  },
};
