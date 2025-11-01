import * as React from "react";
import { cn } from "@/lib/utils";
import { MoveUp, MoveDown } from "lucide-react";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("p-4 md:p-6 bg-gray-1 shadow-card rounded-md", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("mb-4 md:mb-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-gray-7 font-medium text-sm md:text-base", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "text-gray-9 font-semibold text-xl md:text-2xl lg:text-3xl break-words",
        className
      )}
      {...props}
    />
  );
}

interface CardFooterProps extends React.ComponentProps<"div"> {
  trend?: "up" | "down";
  value?: string | number;
  footerText?: string;
}

function CardFooter({
  className,
  trend,
  value,
  footerText,
  ...props
}: CardFooterProps) {
  let trendClass = "";
  let Icon: React.ElementType | null = null;

  if (trend === "up") {
    trendClass = "text-main-1";
    Icon = MoveUp;
  } else if (trend === "down") {
    trendClass = "text-red";
    Icon = MoveDown;
  }

  return (
    <div
      data-slot="card-footer"
      className={cn("flex gap-2 items-center text-sm md:text-base", className)}
      {...props}
    >
      {Icon && value !== undefined && (
        <p className={cn("flex items-center", trendClass)}>
          <Icon className="h-2.5 w-3 md:h-[0.625rem] md:w-3" />
          {value}
        </p>
      )}
      {footerText && <span className="text-gray-7">{footerText}</span>}
    </div>
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardContent };
