import { useState } from "react";
import { Button } from "./ui/button";
import { SignalHigh } from "lucide-react";

function Header() {
  const [active, setActive] = useState<"Injective" | "Osmosis">("Injective");

  return (
    <header className="w-full h-25 border-b-2 border-gray-5 flex items-center justify-between px-16.25">
      <h1 className="font-semibold text-4xl">Dashboard</h1>
      <div className="flex gap-4.5">
        <Button
          variant={active === "Injective" ? "active" : "default"}
          onClick={() => setActive("Injective")}
          icon={SignalHigh}
        >
          Injective
        </Button>
        <Button
          variant={active === "Osmosis" ? "active" : "default"}
          onClick={() => setActive("Osmosis")}
          icon={SignalHigh}
        >
          Osmosis
        </Button>
      </div>
    </header>
  );
}

export default Header;
