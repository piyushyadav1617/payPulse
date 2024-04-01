import Link from "next/link";
import {
  Home,
  Menu,
  Wallet,
  Percent,
  Clock4,
  User,
  ArrowLeftRight,
  MoveUpRight,
} from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";

import React from "react";
import { NavLarge, NavSmall } from "./components/navItem";
import { UserNav } from "../_components/userNav";
import { ModeToggle } from "../_components/modeToggle";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-12 items-center border-b px-4  lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Wallet className="h-6 w-6" />
              <span className="">PayPulse</span>
            </Link>
          </div>
          <div className="flex-1  shadow-md">
            <nav className="grid gap-2 items-start px-2 my-4 font-medium lg:px-4">
              {navigationItems.map((item) => {
                return (
                  <NavLarge
                    key={item.id}
                    link={item.link}
                    name={item.name}
                    icon={item.icon}
                  />
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-12 items-center justify-between gap-4 border-b bg-muted/40 px-4  lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="flex flex-col">
              <SheetHeader className="border-b pb-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Wallet className="h-6 w-6" />
                  <span className="">PayPulse</span>
                </Link>
              </SheetHeader>
              <nav className="grid gap-2 text-lg font-medium">
                {navigationItems.map((item) => {
                  return (
                    <NavSmall
                      key={item.id}
                      link={item.link}
                      name={item.name}
                      icon={item.icon}
                    />
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="absolute right-4 space-x-2">
            <ModeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
          {children}
        </main>
      </div>
    </div>
  );
}

const navigationItems = [
  {
    id: 0,
    name: "Home",
    link: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    id: 1,
    name: "Transfer",
    link: "/dashboard/transfer",
    icon: <ArrowLeftRight className="h-4 w-4" />,
  },
  {
    id: 2,
    name: "P2P transfer",
    link: "/dashboard/p2p",
    icon: <MoveUpRight className="h-4 w-4" />,
  },
  {
    id: 3,
    name: "Transactions",
    link: "/dashboard/transactions",
    icon: <Clock4 className="h-4 w-4" />,
  },
  {
    id: 4,
    name: "Account",
    link: "/dashboard/account",
    icon: <User className="h-4 w-4" />,
  },
];
