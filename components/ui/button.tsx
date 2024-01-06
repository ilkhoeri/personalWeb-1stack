import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        app: "bg-primary text-primary-foreground shadow hover:bg-primary/90 font-bold",
        green: "text-white font-bold bg-[#238636] hover:bg-[#2ea043] shadow",
        red: "text-white font-bold bg-[#b91c1c] hover:bg-[#da3633] shadow",
        blue: "text-white font-bold bg-[#0b6ec5] hover:bg-[#3b82f6] shadow",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border bg-background hover:bg-muted",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        app: "h-9 px-4 py-2",
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "rounded-md [--size-icon:40px] min-h-[var(--size-icon)] min-w-[var(--size-icon)] h-[var(--size-icon)] w-[var(--size-icon)]",
      },
    },
    defaultVariants: {
      variant: "app",
      size: "app",
    },
  },
);

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
