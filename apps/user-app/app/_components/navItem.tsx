"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SheetClose } from "@repo/ui/components/ui/sheet";
type itemProp = {
  link: string;
  name: string;
  icon: React.ReactNode;
};
export const NavSmall = (item: itemProp) => {
  const path = usePathname();
  return (
    <SheetClose asChild>
    <Link
      href={item.link}
      className={`${path === item.link ? "bg-primary/10 text-primary" : ""}  mx-[-0.65rem] flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary`}
    >
      {item.icon}
      {item.name}
    </Link>
    </SheetClose>
  );
};

export const NavLarge = (item: itemProp) => {
  const path = usePathname();
  return (
    <Link
      href={item.link}
      className={`${path === item.link ? "bg-primary/10 text-primary" : ""} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
    >
      {item.icon}
      {item.name}
    </Link>
  );
};
