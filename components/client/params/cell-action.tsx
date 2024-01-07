"use client";

import axios from "axios";
import { LuCopy, LuFileEdit, LuExternalLink, LuMoreHorizontal, LuTrash } from "react-icons/lu";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { AlertModal } from "@/components/assets/modals/alert-modal";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ParamsColumn } from "./columns";
import { useToast } from "@/components/assets/toast/use-toast";

interface CellActionProps {
  data: ParamsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const onConfirm = async () => {
    try {
      setLoading(true);
      toast({
        title: `Deleted ${data.heading}'`,
        icon: "loading",
        duration: 999999,
      });
      await axios.delete(`/api/${params.protectId}/params/${data.id}`);
      router.refresh();
    } catch (error) {
      toast({
        title: "Uh oh! Somehing when wrong!.",
        icon: "error",
      });
    } finally {
      setLoading(false);
      setOpen(false);
      toast({
        title: "Deleted Successfully.",
        icon: "success",
        duration: 1500,
      });
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Copied to clipboard.",
      icon: "success",
      duration: 1500,
    });
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <LuMoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="space-y-1">
          <DropdownMenuLabel></DropdownMenuLabel>
          <a
            href={`${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/params/${data.id}`}
            target="_blank"
            rel="noopener noreferrer"
            // role="menuitem"
            className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-sky-600/50 hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            tabIndex={-1}
            data-orientation="vertical"
            data-radix-collection-item
          >
            <LuExternalLink className="mr-2 h-4 w-4" />
            Open View
          </a>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <LuCopy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.protectId}/settings/add-params/${data.id}`)}
            className="focus:bg-orange-400"
          >
            <LuFileEdit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <hr className="my-2" />
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="bg-[#b91c1c] hover:bg-[#da3633] focus:bg-[#da3633]"
          >
            <LuTrash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
