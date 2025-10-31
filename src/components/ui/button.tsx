import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "h-[6.7vh] w-[14.6vw] rounded-md text-xl font-medium flex gap-2 items-center justify-center",
  {
    variants: {
      variant: {
        primary:
          "border-2 border-transparent active:bg-gradient-to-r from-main-1 to-main-2 active:text-btn-text-1 bg-gray-4 border-btn-border",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
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
  variant,
  children,
  icon: Icon,
  asChild = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn("group", buttonVariants({ variant, className }))}
      {...props}
    >
      {Icon && <Icon className="w-[1.458vw] h-[2.593vh]" />}
      {children}
    </button>
  );
}

export { Button, buttonVariants };
