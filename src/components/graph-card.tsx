import * as React from "react";
import { cn } from "@/lib/utils";

function GraphCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "px-6 w-328 h-152 py-6.5 bg-gray-1 flex flex-col shadow-card rounded-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-gray-7 font-medium text-base", className)}
      {...props}
    />
  );
}

function CardContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex-1 flex justify-center items-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { GraphCard, CardTitle, CardContent };
