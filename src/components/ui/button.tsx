import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "h-14 w-50 rounded-md text-xl font-medium flex gap-2 items-center justify-center border-2 active:border-none border-transparent active:bg-gradient-to-r from-main-1 to-main-2 active:text-btn-text-1 bg-gray-4 border-btn-border",
  {
    variants: {},
  }
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ElementType;
}

function Button({
  className,
  children,
  icon: Icon,
  asChild = false,
  ...props
}: ButtonProps) {
  return (
    <button className={cn("group", buttonVariants({ className }))} {...props}>
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}

export { Button, buttonVariants };
