import { useState } from "react";
import { Button } from "./ui/button";
import { SignalHigh } from "lucide-react";

function Header() {
  const [active, setActive] = useState<"Injective" | "Osmosis">("Injective");

  return (
    <header className="w-full h-20 md:h-25 border-b-2 border-gray-5 flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-[4.0625rem]">
      <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
        Dashboard
      </h1>
      <div className="flex gap-2 md:gap-3 lg:gap-4.5">
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
