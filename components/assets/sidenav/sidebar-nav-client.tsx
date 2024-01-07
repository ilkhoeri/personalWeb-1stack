"use client";

import { useParams } from "next/navigation";
import { SidebarNav } from "./sidebar-nav";
import { profileIdParams } from "@/routes";

export function SidebarNavClient() {
  const params = useParams();
  return (
    <aside className=" lg:w-[18%]">
      <SidebarNav items={profileIdParams(params.protectId)} />
    </aside>
  );
}
