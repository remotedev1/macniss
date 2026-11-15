import {
  LayoutDashboard,
  PhoneIncoming,
  BriefcaseBusiness,
  FolderKanban,
  Images,
  Quote,
  ShieldCheck,
  MonitorSmartphone,
  BookOpenText,
} from "lucide-react";

export const sidebarData = {
  navGroups: [
    {
      title: "Workspace",
      items: [
        { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
        { title: "Consultations", url: "/dashboard/consultations", icon: PhoneIncoming },
        { title: "Documentation", url: "/dashboard/documentation", icon: BookOpenText },
      ],
    },
    {
      title: "Website content",
      items: [
        { title: "Developments", url: "/dashboard/projects", icon: FolderKanban },
        { title: "Capabilities", url: "/dashboard/solutions", icon: BriefcaseBusiness },
        { title: "Interior gallery", url: "/dashboard/interior-gallery", icon: Images },
        { title: "Testimonials", url: "/dashboard/testimonials", icon: Quote },
      ],
    },
    {
      title: "Account",
      items: [
        { title: "Security", url: "/settings/security", icon: ShieldCheck },
        { title: "Sessions", url: "/settings/sessions", icon: MonitorSmartphone },
      ],
    },
  ],
};
