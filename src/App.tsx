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
        { title: "Market Cap", value: "$12,345,678", trend: "up" },
        { title: "Daily Volume", value: "$1,234,567", trend: "down" },
        { title: "Active Users", value: "56,789", trend: "up" },
        { title: "New Listings", value: "12", trend: "up" },
      ],
      chart: <Injective />,
      chartTitle: "Injective User Growth / Price",
    },
    Osmosis: {
      cards: [
        { title: "Market Cap", value: "$8,765,432", trend: "down" },
        { title: "Daily Volume", value: "$987,654", trend: "up" },
        { title: "Active Users", value: "34,567", trend: "down" },
        { title: "New Listings", value: "8", trend: "up" },
      ],
      chart: <Osmosis />,
      chartTitle: "Osmosis User Growth / Price",
    },
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
                  <p>{card.value}</p>
                </CardContent>
                <CardFooter
                  trend={card.trend as "up" | "down"}
                  value="10.92%"
                  footerText="Last month"
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
