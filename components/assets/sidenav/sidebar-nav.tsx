"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { buttonVariants } from "@/components/ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={twMerge(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 max-lg:px-4 max-lg:overflow-x-auto scroll_ [--scroll-sz:0px]",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={twMerge(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "font-semibold bg-muted hover:bg-muted"
              : "hover:bg-muted text-muted-foreground hover:underline",
            "flex-nowrap flex-row justify-start min-w-max",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
