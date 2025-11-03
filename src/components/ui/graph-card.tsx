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
        "px-4 md:px-6 w-full h-[38rem] py-5 md:py-6.5 bg-gray-1 flex flex-col shadow-card rounded-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function GraphCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-gray-7 mb-8 font-medium text-sm md:text-base",
        className
      )}
      {...props}
    />
  );
}

function GraphCardContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex-1 ", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { GraphCard, GraphCardTitle, GraphCardContent };
