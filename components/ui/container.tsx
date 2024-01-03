import React, { ElementType, FC } from "react";
import { twMerge } from "tailwind-merge";

export type ContainerProps = {
  className?: string;
  el?: ElementType;
  /** Full Width Screen
   *
   * default: false
   */
  clean?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const Container: FC<ContainerProps> = ({ className, el = "div", clean = false, ...others }) => {
  const rootClassName = twMerge("relative", !clean && "mx-auto max-w-screen-2xl w-full", className);

  let Component: React.ComponentType<React.HTMLAttributes<HTMLElement>> = el as any;

  return <Component className={rootClassName} {...others} />;
};

export default Container;
