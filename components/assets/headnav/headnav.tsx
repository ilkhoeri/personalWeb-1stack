import { ThemeToggle } from "@/components/theme/theme-toggle";
import React from "react";

const HeadNav: React.FC<{ name?: string }> = ({ name }) => {
  return (
    <header className="w-full h-16 sticky z-50 flex items-center justify-between px-6 border-b border-b-border">
      <div className="font-bold">{name}</div>
      <div className="">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default HeadNav;
