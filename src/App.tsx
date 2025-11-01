import { useState } from "react";
import "./index.css";
import Header from "./components/header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./components/ui/card";
import { GraphCard } from "./components/ui/graph-card";

import Injective from "./components/injective-graph";
import Osmosis from "./components/osmosis-graph";

function App() {
  const [activeCoin, setActiveCoin] = useState<"Injective" | "Osmosis">(
    "Injective"
  );

  const contentData = {
    Injective: {
      cards: [
        {
          title: "Net revenue",
          value: 3342868034,
          trend: "up",
          percentage: 10.92,
          footerText: "Last month",
        },
        {
          title: "New orders",
          value: 2220005937,
          trend: "up",
          percentage: 2.95,
          footerText: "Last month",
        },
        {
          title: "Number of leaves",
          value: -870,
          trend: "down",
          percentage: 0.65,
          footerText: "Last month",
        },
        {
          title: "Net revenue",
          value: 3342868034,
          trend: "up",
          percentage: 10.91,
          footerText: "Last month",
        },
      ],
      chart: <Injective />,
      chartTitle: "User Growth/Attrition Relative to Price Movement",
    },
    Osmosis: {
      cards: [
        {
          title: "Net revenue",
          value: 2112833,
          trend: "up",
          percentage: 41.64,
          footerText: "Last day",
        },
        {
          title: "New orders",
          value: 2234975,
          trend: "up",
          percentage: 79.64,
          footerText: "Last month",
        },
        {
          title: "Number of leaves",
          value: -10941,
          trend: "down",
          percentage: 0.83,
          footerText: "Last month",
        },
        {
          title: "Net revenue",
          value: 1456789,
          trend: "up",
          percentage: 10.91,
          footerText: "Last month",
        },
      ],
      chart: <Osmosis />,
      chartTitle: "User Growth/Attrition Relative to Price Movement",
    },
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="min-w-[20rem] min-h-screen">
      <Header active={activeCoin} setActive={setActiveCoin} />
      <main className="w-full min-h-screen flex justify-center items-center flex-col gap-6 md:gap-8 lg:gap-11 p-4 md:p-6 lg:p-8">
        <section className="w-full max-w-[82rem]">
          <h2 className="hidden">코인 정보</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-12">
            {contentData[activeCoin].cards.map((card, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{formatNumber(card.value)}</p>
                </CardContent>
                <CardFooter
                  trend={card.trend as "up" | "down"}
                  value={`${card.percentage}%`}
                  footerText={card.footerText}
                />
              </Card>
            ))}
          </div>
        </section>
        <section className="w-full max-w-[82rem]">
          <h2 className="hidden">그래프</h2>
          <GraphCard>
            <CardTitle>{contentData[activeCoin].chartTitle}</CardTitle>
            <CardContent className="h-full w-full">
              {contentData[activeCoin].chart}
            </CardContent>
          </GraphCard>
        </section>
      </main>
    </div>
  );
}

export default App;
