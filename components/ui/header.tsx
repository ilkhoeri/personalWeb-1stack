import * as React from "react";
import { RecordClasses } from "@/types";
import { twMerge } from "tailwind-merge";

type HeaderTrees = "wrapper" | "title" | "description";
type HeaderClasses = RecordClasses<HeaderTrees>;

interface HeaderProps extends HeaderClasses {
  title: string;
  description: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, description, className, classNames }) => {
  return (
    <div className={twMerge("space-y-0.5", className, classNames?.wrapper)}>
      <h2 className={twMerge("text-2xl font-bold tracking-tight", classNames?.title)}>{title}</h2>
      <p className={twMerge("text-sm text-muted-foreground", classNames?.description)}>{description}</p>
    </div>
  );
};

export default Header;
