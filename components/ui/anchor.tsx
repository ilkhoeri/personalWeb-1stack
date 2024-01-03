import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { twMerge } from "tailwind-merge";
import { buttonVariants } from "./button";
import Link, { type LinkProps } from "next/link";

export interface AnchorProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    LinkProps,
    VariantProps<typeof buttonVariants> {}

const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(({ className, variant, size, ...props }, ref) => {
  return <Link className={twMerge(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
});
Anchor.displayName = "Anchor";

export { Anchor };
