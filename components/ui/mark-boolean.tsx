import React, { ElementType, FC } from "react";
import { twMerge } from "tailwind-merge";

export type MarkBooleanProps = {
  className?: string;
  childTrue?: React.ReactNode;
  childFalse?: React.ReactNode;
  el?: ElementType;
  mark: boolean;
} & React.HTMLAttributes<HTMLElement>;

const MarkBoolean: FC<MarkBooleanProps> = ({ childTrue, childFalse, className, el = "mark", mark, ...ot }) => {
  const cn = twMerge(
    "px-1 font-mono font-bold leading-normal text-center uppercase rounded text-black w-max text-[0.75rem] ",
    mark === true ? "bg-[#2ea043] tracking-wide" : "bg-[#e54b4b] tracking-[0]",
    className,
  );

  let M: React.ComponentType<React.HTMLAttributes<HTMLElement>> = el as any;
  return (
    <M className={cn} {...ot}>
      {mark === true ? childTrue ?? "True" : childFalse ?? "False"}
    </M>
  );
};

export default MarkBoolean;
