"use client";

import * as React from "react";
import { HiShieldCheck } from "react-icons/hi2";
import { RxExclamationTriangle } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

interface MessageProps {
  message?: string;
  tendence: "success" | "error";
}
const Attention = React.forwardRef<HTMLDialogElement, React.DialogHTMLAttributes<HTMLDialogElement> & MessageProps>(
  ({ className, message, tendence, ...props }, ref) => {
    const cN = twMerge(
      "bg-background relative w-full flex items-center justify-center my-4 gap-x-2 p-3 rounded-md text-[16px] font-medium [transition:all_0.5s_ease] border-solid border-[1px] border-[var(--cl)] text-[var(--cl)] [&>svg]:text-[var(--cl)]",
      tendence === "success" && "[--cl:#2499dd]",
      tendence === "error" && "[--cl:#b22b2b]",
      className,
    );

    if (!message) {
      return null;
    }

    const opened = message ? true : false;

    return (
      <dialog id="attention" open={opened} className={cN} data-messages={tendence} {...props} ref={ref}>
        {tendence === "success" && <HiShieldCheck className="h-7 w-7" />}
        {tendence === "error" && <RxExclamationTriangle className="h-6 w-6" />}
        {message}
      </dialog>
    );
  },
);
Attention.displayName = "Attention";

export { Attention };
