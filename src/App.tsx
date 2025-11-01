import "./index.css";

import Header from "./components/header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./components/card";

import { GraphCard } from "./components/graph-card";

import DynamicChart from "./components/graph";

function App() {
  return (
    <div className="w-full h-screen">
      <Header />
      <main className="w-full h-full flex flex-col items-center  justify-center gap-11">
        <section className="flex gap-12">
          <h2 className="hidden">코인 정보</h2>
          <Card>
            <CardHeader>
              <CardTitle>Net revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p>$3,342,868,034</p>
            </CardContent>
            <CardFooter trend="up" value="10.92%" footerText="Last month" />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Net revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p>$3,342,868,034</p>
            </CardContent>
            <CardFooter trend="up" value="10.92%" footerText="Last month" />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Net revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p>$3,342,868,034</p>
            </CardContent>
            <CardFooter trend="up" value="10.92%" footerText="Last month" />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Net revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p>$3,342,868,034</p>
            </CardContent>
            <CardFooter trend="up" value="10.92%" footerText="Last month" />
          </Card>
        </section>

        <section>
          <h2 className="hidden">그래프</h2>
          <GraphCard>
            <CardTitle>
              User Growth/Attrition Relative to Price Movement
            </CardTitle>
            <CardContent className="h-full w-full">
              <DynamicChart />
            </CardContent>
          </GraphCard>
        </section>
      </main>
    </div>
  );
}

export default App;
