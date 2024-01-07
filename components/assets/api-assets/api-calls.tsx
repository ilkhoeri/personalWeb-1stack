"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ApiList } from "./api-list";

import { LuFileCode, LuFileCode2 } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import type { ClassAlertType } from "./api-alert";
import Header from "@/components/ui/header";

interface APICallsProps extends ClassAlertType {
  entityName: string;
  entityIdName: string;
}

export const APICalls: React.FC<APICallsProps> = ({ entityName, entityIdName, classNames }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-row flex-nowrap items-center gap-4">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          title={`${open ? "Hidden" : "Open"} API ${entityName.toUpperCase()}`}
          className="flex items-center justify-center relative"
        >
          <LuFileCode2
            className={twMerge(
              "[transition:all_0.3s_ease] absolute",
              open ? "scale-100 w-[24px] h-[24px]" : "scale-0 w-0 h-0",
            )}
          />
          <LuFileCode
            className={twMerge(
              "[transition:all_0.3s_ease] absolute",
              open ? "scale-0 w-0 h-0" : "scale-100 w-[24px] h-[24px]",
            )}
          />
        </Button>

        <Header
          title="API"
          description={`calls for ${entityName.toUpperCase()}`}
          classNames={{
            wrapper: "flex flex-row flex-nowrap items-end gap-2",
            title: "text-[32px] leading-none",
            description: "text-[14px]",
          }}
        />
      </div>

      {open && <ApiList classNames={classNames} entityName={entityName} entityIdName={entityIdName} />}
    </>
  );
};

const FileCodeIcon: React.FC<{ open?: boolean }> = ({ open }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("w-[24px] h-[24px] [transition:all_0.3s_ease] absolute stroke-default")}
    >
      <g
        strokeWidth={open ? undefined : 3}
        className={twMerge(
          "[transition:all_0.3s_ease]",
          open ? "" : "[transform:translate(7.35px,_4.75px)_scale(0.68)]",
        )}
      >
        <path d="m9.1,18.45l3.45-3.45-3.45-3.45" />
        <path d="m4.5,11.55l-3.45,3.45,3.45,3.45" />
      </g>
      <line
        x1="4"
        y1="8"
        x2="4"
        y2="22"
        className={twMerge("[transition:all_0.3s_ease]", open ? "opacity-0 stroke-transparent" : "")}
      />
      <path d="m4,22h14c1.1,0,2-.9,2-2V7.5L14.5,2H6c-1.1,0-2,.9-2,2v4" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
};
