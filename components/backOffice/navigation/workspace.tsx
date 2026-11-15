"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar";
import { ThemeSwitch } from "./theme-switch";
import { ProfileDropdown } from "./profile-dropdown";
import { sidebarData } from "../data/sidebar-data";
import "./workspace.css";

const destinations = sidebarData.navGroups.flatMap(({ items }) => items);

export default function Workspace({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const section = destinations.find(({ url }) => url === pathname)?.title || "Site settings";

  return (
    <div className="cms-shell">
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="cms-topbar">
            <SidebarTrigger className="cms-icon-button shrink-0" />
            <div className="flex min-w-0 items-center gap-2 text-sm">
              <span className="hidden text-muted-foreground sm:inline">Workspace</span>
              <span className="hidden text-muted-foreground sm:inline" aria-hidden="true">/</span>
              <span className="truncate font-semibold">{section}</span>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
              <Link href="/" target="_blank" rel="noopener" className="cms-quiet-link hidden sm:inline-flex">
                View website <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <ThemeSwitch />
              <ProfileDropdown />
            </div>
          </header>
          <main id="cms-content" className="cms-content">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
