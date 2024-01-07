"use client";

import { useState } from "react";
import { LuClipboard, LuClipboardCheck, LuDatabase } from "react-icons/lu";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { useToast } from "@/components/assets/toast/use-toast";

export type ClassAlertType = {
  classNames?: {
    alert?: string;
  };
};

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps & ClassAlertType> = ({
  title,
  description,
  classNames,
  variant = "public",
}) => {
  const [copy, setCopy] = useState(false);
  const { toast } = useToast();

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast({
      title: title,
      description: `Copied to clipboard.`,
      icon: (
        <span className="bg-green-500 opacity-0 animate-bounce-in rounded-full p-1 h-9 w-9 flex items-center justify-center">
          <LuClipboardCheck className="h-6 w-6 opacity-0 animate-bounce-out" />
        </span>
      ),
    });
  };

  return (
    <Alert className={classNames?.alert}>
      <AlertTitle className="flex items-center bg-muted border-b border-b-[#555555] gap-x-0 py-1 px-4 lg:px-6">
        <LuDatabase className="h-4 w-4 min-h-[16px] min-w-[16px] mr-2" />
        <p className="text-[14px] truncate">{title}</p>

        <Badge variant={variantMap[variant]} className="ml-auto mr-2">
          {textMap[variant]}
        </Badge>

        <Button
          title={`Copy ${title}`}
          variant="outline"
          size="icon"
          className="[--sz:34px] relative rounded-md border-[1px] border-[#555555] hover:bg-[#cdcdcd] dark:hover:bg-[#282828]"
          onClick={() => {
            onCopy(description);
            setCopy(true);
          }}
        >
          <LuClipboard
            className={twMerge(
              "[transition:all_0.3s_ease] absolute",
              copy ? "scale-0 w-0 h-0 opacity-0" : "scale-100 opacity-100 w-[20px] h-[20px]",
            )}
          />
          <LuClipboardCheck
            className={twMerge(
              "[transition:all_0.3s_ease] absolute",
              copy ? "scale-100 opacity-100 w-[22px] h-[22px]" : "scale-0 w-0 h-0 opacity-0",
            )}
          />
        </Button>
      </AlertTitle>

      <AlertDescription className="py-4 px-4 lg:px-6 w-full flex items-center justify-between">
        <code className="relative w-full rounded-md gap-x-0 font-mono text-sm font-semibold text-theme truncate !select-text">
          {description}
        </code>
      </AlertDescription>
    </Alert>
  );
};
