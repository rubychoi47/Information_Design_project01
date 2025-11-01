import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "h-14 w-50 rounded-md text-xl font-medium flex gap-2 items-center justify-center border-2 border-transparent bg-gray-4 border-btn-border text-gray-700",
  {
    variants: {
      variant: {
        default: "",
        active:
          "bg-gradient-to-r from-main-1 to-main-2 text-btn-text-1 border-none",
      },
    },
    defaultVariants: {
      variant: "default",
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
  children,
  icon: Icon,
  variant,
  asChild = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn("group", buttonVariants({ variant, className }))}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}

export { Button, buttonVariants };
