import { Button } from "./ui/button";
import { SignalHigh } from "lucide-react";

function Header() {
  return (
    <header className="w-full h-25 border-2 border-gray-5 flex items-center justify-between px-18">
      <h1 className="font-semibold text-4xl">Dashboard</h1>
      <div className="flex gap-4.5">
        <Button children="Injective" icon={SignalHigh} />
        <Button children="Osmosis" icon={SignalHigh} />
      </div>
    </header>
  );
}

export default Header;
