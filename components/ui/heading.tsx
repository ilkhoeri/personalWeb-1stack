import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const headingVariants = cva("", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
      h6: "text-h6",
      relative: "text-[clamp(1rem,3.4783vw_+_0.3043rem,3rem)] leading-[1.25rem]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  el: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ el, className, variant, size, ...props }, ref) => {
    const attr: { [key: string]: any } = {};
    attr["data-heading"] = el as string;
    attr.className = twMerge(headingVariants({ variant, size: size ?? el }), className);

    let Component: React.ElementType = el;
    return <Component {...attr} {...props} ref={ref} />;
  },
);
Heading.displayName = "Heading";

export default Heading;
