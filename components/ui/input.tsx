"use client";
import * as React from "react";

import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const inputVariants = cva("class-input");

const Input = React.forwardRef<HTMLInputElement, InputProps & VariantProps<typeof inputVariants>>(
  ({ className, type, value, onChange, ...props }, ref) => {
    const [numb, setNumb] = React.useState(value ?? "");
    return (
      <input
        ref={ref}
        spellCheck={false}
        aria-invalid="false"
        className={twMerge(inputVariants(), className)}
        type={type === "number" ? "text" : type}
        value={type === "number" ? numb : value}
        onChange={(e) => {
          const numeric = e.target.value.replace(/[^0-9]/g, "");
          if (/^\d*$/.test(numeric)) {
            type === "number" && setNumb(numeric);
          }
          if (onChange) {
            onChange(e);
          }
        }}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

import { ElementType, FC } from "react";
import { Noop, RefCallBack } from "react-hook-form";

type HTMLInputTypeAttribute =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | (string & {});

export type InputPrimitiveProps = {
  className?: string;
  el?: ElementType;
} & {
  onChange: (...event: any[]) => void;
  onBlur?: Noop;
  value?: string | number | readonly string[] | null | undefined;
  disabled?: boolean;
  name?: string;
  ref?: RefCallBack;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
} & React.HTMLAttributes<HTMLElement>;

const InputPrimitive: FC<InputPrimitiveProps> = ({ className, el = "input", ...others }) => {
  const rootClassName = twMerge(inputVariants(), className);

  let Component: React.ComponentType<React.HTMLAttributes<HTMLElement>> = el as any;

  return <Component className={rootClassName} {...others} />;
};

export default InputPrimitive;
