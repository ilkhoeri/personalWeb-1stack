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
      "relative w-full flex items-center justify-center my-4 gap-x-2 p-3 rounded-md text-[16px] font-medium [transition:all_0.5s_ease] w-0h-0overflow-hidden",
      tendence === "success" && "bg-emerald-500/15 text-emerald-500",
      tendence === "error" && "bg-destructive/15 text-[#b22b2b]",
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
