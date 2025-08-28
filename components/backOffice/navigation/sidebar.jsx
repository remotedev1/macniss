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

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <Link href="/">
          <h1 className="text-lg font-semibold relative left-2">{process.env.NEXT_PUBLIC_COMPANY_NAME}</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
