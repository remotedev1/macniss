import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarData } from "../data/sidebar-data";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import Link from "next/link";
import Image from "next/image";

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" variant="sidebar" className="cms-sidebar" {...props}>
      <SidebarHeader className="px-4 py-4 group-data-[collapsible=icon]:px-2">
        <Link href="/dashboard" className="cms-brand" aria-label="Macniss dashboard">
          <Image src="/logo.png" alt="" width={36} height={36} className="shrink-0 rounded-lg group-data-[collapsible=icon]:size-8" />
          <span className="min-w-0 group-data-[collapsible=icon]:hidden">
            <strong className="block">Macniss</strong>
            <span className="cms-brand-subtitle">Content workspace</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        {sidebarData.navGroups.map((props) => <NavGroup key={props.title} {...props} />)}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
