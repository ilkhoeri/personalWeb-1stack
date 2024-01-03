import React from "react";
import { ModeToggle } from "../toggle/theme";

const HeaderRoot = () => {
  return (
    <header className="h-16 px-4 md:px-8 relative">
      <div className=""></div>
      <div className="">
        <ModeToggle />
      </div>
    </header>
  );
};

export default HeaderRoot;
