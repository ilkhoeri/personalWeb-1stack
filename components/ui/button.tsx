import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { twMerge } from "tailwind-merge";

const buttonVariants = cva("text-sm font-medium rounded-md", {
  variants: {
    variant: {
      app: "text-primary-foreground font-bold bg-primary shadow hover:bg-primary/90",
      green: "text-white font-bold bg-[#238636] hover:bg-[#2ea043] shadow",
      red: "text-white font-bold bg-[#b91c1c] hover:bg-[#da3633] shadow",
      blue: "text-white font-bold bg-[#0b6ec5] hover:bg-[#3b82f6] shadow",
      default: "text-primary-foreground bg-primary hover:bg-primary/90",
      destructive: "text-destructive-foreground bg-destructive hover:bg-destructive/90",
      outline: "border bg-background hover:bg-muted",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-muted hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      app: "h-9 px-4 py-2",
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "[--sz:40px] min-h-[var(--sz)] min-w-[var(--sz)] h-[var(--sz)] w-[var(--sz)]",
    },
  },
  defaultVariants: {
    variant: "app",
    size: "app",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Btn = asChild ? Slot : "button";
    const tp = type === "submit" ? "submit" : "button";
    const clNm = twMerge(buttonVariants({ variant, size }), className);
    return <Btn type={tp} className={clNm} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
