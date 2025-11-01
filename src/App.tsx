import "./index.css";

import Header from "./components/header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./components/card";

function App() {
  return (
    <div className="w-full h-screen">
      <Header />
      <main className="w-full h-full flex flex-col items-center  justify-center">
        <section className="flex gap-12">
          <h2 className="hidden">card</h2>
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
      </main>
    </div>
  );
}

export default App;
