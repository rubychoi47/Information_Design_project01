import "./index.css";

import { Button } from "./components/ui/button";
import { SignalHigh } from "lucide-react";

function App() {
  return (
    <>
      <h1 className="text-blue-1 ">information design project </h1>
      <Button variant="primary" children="button" icon={SignalHigh} />
    </>
  );
}

export default App;
