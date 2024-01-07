"use client";

import Header from "@/components/ui/header";
import { currentHeading, profileIdParams } from "@/routes";
import { useParams, usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const title = currentHeading({ pathname, routes: profileIdParams(params.protectId), viewing: "title" });
  const description = currentHeading({ pathname, routes: profileIdParams(params.protectId), viewing: "description" });
  return (
    <section className="flex-1 space-y-8 lg:p-8 lg:pt-0">
      <Header title={title} description={description} />
      {children}
    </section>
  );
}
