import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { SignalHigh } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "border border-transparent active:bg-gradient-to-r from-main-1 to-main-2 active:text-btn-text-1 bg-gray-4 border-btn-border",
      },
      size: {
        sm: "h-10.5 rounded-sm px-3.5 font-medium",
        md: "h-11.5 rounded-md px-5 font-semibold",
        lg: "h-11.5 rounded-md px-6 font-bold",
        circle: "size-12 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

function Button({
  className,
  variant,
  size,
  children,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <button
      className={cn("group", buttonVariants({ variant, size, className }))}
      {...props}
    >
      <SignalHigh className="text-gray-8 group-active:text-gray-4" />
      {children}
    </button>
  );
}

export { Button, buttonVariants };
