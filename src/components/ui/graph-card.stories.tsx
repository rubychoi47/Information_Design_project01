import { GraphCard, GraphCardTitle, GraphCardContent } from "./graph-card";

import type { Meta, StoryObj } from "@storybook/react";
import DynamicChart from "../injective-graph";

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
        <GraphCardTitle>
          User Growth/Attrition Relative to Price Movement
        </GraphCardTitle>
        <GraphCardContent>
          <DynamicChart />
        </GraphCardContent>
      </>
    ) as React.ReactNode,
  },
};
