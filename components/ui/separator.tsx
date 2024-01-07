"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { twMerge } from "tailwind-merge";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={twMerge(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className,
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export default Separator;

export interface SparatorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}
export const HR = React.forwardRef<HTMLHRElement, SparatorProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    const cN = twMerge(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className,
    );
    return <hr className={cN} ref={ref} {...props} />;
  },
);
HR.displayName = "HR";
