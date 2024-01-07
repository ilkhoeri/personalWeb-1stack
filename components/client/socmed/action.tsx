"use client";

import axios from "axios";
import { useState } from "react";
import { LuFileEdit, LuExternalLink, LuMinimize2, LuMoreHorizontal, LuTrash } from "react-icons/lu";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/assets/toast/use-toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/assets/modals/alert-modal";

import { SocmedType } from "./client";
import { twMerge } from "tailwind-merge";

interface ActionProps {
  data: SocmedType;

  setOnEdit?: () => void;
  onEdit?: boolean;
  classNames?: {
    trigger?: string;
  };
}

export const Action: React.FC<ActionProps> = ({ data, setOnEdit, onEdit, classNames }) => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      toast({
        title: `${data.siteName} deleted.`,
        icon: "loading",
        duration: 999999,
      });
      await axios.delete(`/api/client/${params.protectId}/socmed/${data.id}`);
      router.refresh();
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        icon: "error",
      });
    } finally {
      setOpen(false);
      setLoading(false);
      toast({
        title: `${data.siteName} updated.`,
        icon: "success",
        duration: 1500,
      });
    }
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={twMerge(
              "h-8 w-8 p-0 ml-auto focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0",
              classNames?.trigger,
            )}
          >
            <LuMoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="space-y-1">
          <a
            href={`${data.siteUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full justify-normal cursor-pointer select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-sky-600/50 hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            tabIndex={-1}
            data-orientation="vertical"
            data-radix-collection-item
          >
            <LuExternalLink className="mr-4 h-4 w-4" />
            Open
          </a>
          {setOnEdit ? (
            <DropdownMenuItem
              onClick={setOnEdit}
              className={
                onEdit
                  ? "bg-black dark:bg-white text-white dark:text-black focus:bg-black focus:dark:bg-white focus:text-white focus:dark:text-black"
                  : "focus:bg-orange-400"
              }
            >
              {onEdit ? (
                <>
                  <LuMinimize2 className="mr-4 h-4 w-4" />
                  Cancel
                </>
              ) : (
                <>
                  <LuFileEdit className="mr-4 h-4 w-4" />
                  Edit
                </>
              )}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => router.push(`/${params.protectId}/settings/profile/social-media/${data.id}`)}
              className="focus:bg-orange-400"
            >
              <LuFileEdit className="mr-4 h-4 w-4" /> Update
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="bg-[#da3633] hover:bg-[#b91c1c] focus:bg-[#b91c1c]"
          >
            <LuTrash className="mr-4 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
