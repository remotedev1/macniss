import {
  AudioWaveform,
  Bell,
  Command,
  GalleryVerticalEnd,
  HelpCircle,
  LayoutDashboard,
  ListTodo,
  Megaphone,
  MessageCircle,
  MonitorCheck,
  Package,
  Palette,
  PhoneIncoming,
  Settings,
  UserCog,
  Users,
  Wrench,
} from "lucide-react";

export const sidebarData = {
  // teams: [
  //   {
  //     name: "Shadcn Admin",
  //     logo: Command,
  //     plan: "Vite + ShadcnUI",
  //   },
  //   {
  //     name: "Acme Inc",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  // ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Consultations",
          url: "/dashboard/consultations",
          badge: "3",
          icon: PhoneIncoming,
        },
        {
          title: "Solutions",
          url: "/dashboard/solutions",
          icon: Megaphone,
        },
        {
          title: "Projects",
          url: "/dashboard/projects",
          icon: Megaphone,
        },
        {
          title: "Testimonials",
          url: "/dashboard/testimonials",
          icon: Megaphone,
        },
      ],
    },

    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: Settings,
          items: [
            {
              title: "Profile",
              url: "/dashboard",
              icon: UserCog,
            },
          ],
        },
        {
          title: "Help Center",
          url: "/dashboard",
          icon: HelpCircle,
        },
      ],
    },
  ],
};
