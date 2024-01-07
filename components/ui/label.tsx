"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const labelVariants = cva("class-label");

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={twMerge(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
