import React, { ElementType, FC } from "react";
import { twMerge } from "tailwind-merge";

export type ContainerProps = {
  el?: ElementType;
  /**
   **full width Screen*
   *```js
   * default: false
   *```
   */
  clean?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const Container: FC<ContainerProps> = ({ className, el = "div", clean = false, ...others }) => {
  const cN = twMerge("relative", !clean && "mx-auto max-w-screen-2xl w-full", className);
  let Ctn: React.ComponentType<React.HTMLAttributes<HTMLElement>> = el as any;
  return <Ctn className={cN} {...others} />;
};

export default Container;
