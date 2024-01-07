import { Button, ButtonProps } from "@/components/ui/button";

import { LuPlusCircle } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

type AddNewProps = { className?: string } & ButtonProps;

const AddNew: React.FC<AddNewProps> = ({ className, ...p }) => {
  return (
    <Button
      title="add new item"
      variant="green"
      size="icon"
      className={twMerge("ml-8 md:ml-auto md:px-2 md:min-w-[80px] w-max", className)}
      {...p}
    >
      <LuPlusCircle className="h-5 w-5" />
      <p className="hidden md:inline-block ml-2">New</p>
    </Button>
  );
};

export default AddNew;
