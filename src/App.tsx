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
import DynamicChart from "./components/graph";

function App() {
  return (
    <div className="min-w-[20rem] min-h-screen">
      <Header />
      <main className="w-full min-h-screen flex justify-center items-center flex-col gap-6 md:gap-8 lg:gap-11 p-4 md:p-6 lg:p-8">
        <section className="w-full max-w-[82rem]">
          <h2 className="hidden">코인 정보</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-12">
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
              <CardFooter trend="down" value="10.92%" footerText="Last month" />
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Net revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p>$3,342,868,034</p>
              </CardContent>
              <CardFooter trend="down" value="10.92%" footerText="Last month" />
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
          </div>
        </section>
        <section className="w-full max-w-[82rem]">
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
