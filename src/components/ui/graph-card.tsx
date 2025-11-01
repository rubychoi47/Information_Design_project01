import * as React from "react";
import { cn } from "@/lib/utils";

function GraphCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("px-6 py-6.5 bg-gray-1 shadow-card rounded-md", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-gray-7 mb-12.5 font-medium text-base", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("w-[73rem] h-[29.4375rem]", className)}
      {...props}
    />
  );
}

export { GraphCard, CardTitle, CardContent };
