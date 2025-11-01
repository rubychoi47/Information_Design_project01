import "./index.css";

import { Button } from "./components/ui/button";
import { SignalHigh } from "lucide-react";

import { GraphCard, CardTitle, CardContent } from "./components/ui/graph-card";
import DynamicChart from "./components/ui/graph";

function App() {
  return (
    <>
      <h1 className="text-blue-1 ">information design project </h1>
      <Button children="Injective" icon={SignalHigh} />

      <GraphCard>
        <CardTitle>User Growth/Attrition Relative to Price Movement</CardTitle>
        <CardContent>
          <DynamicChart />
        </CardContent>
      </GraphCard>
    </>
  );
}

export default App;
