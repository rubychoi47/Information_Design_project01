import "./index.css";

import { Button } from "./components/ui/button";
import { SignalHigh } from "lucide-react";

function App() {
  return (
    <>
      <h1 className="font-semibold text-4xl">Dashboard</h1>
      <Button children="Injective" icon={SignalHigh} />
    </>
  );
}

export default App;
