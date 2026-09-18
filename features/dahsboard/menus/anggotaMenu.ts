import {
  LayoutDashboard,
  CalendarDays,
  ClipboardCheck,
  User,
} from "lucide-react";

export const anggotaMenu = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: "dashboard.view",
  },
  {
    label: "Event",
    href: "/dashboard/event",
    icon: CalendarDays,
    permission: "events.view",
  },
  {
    label: "Presensi",
    href: "/dashboard/presensi",
    icon: ClipboardCheck,
    permission: "attendance.view",
  },
  {
    label: "Profil",
    href: "/dashboard/profil",
    icon: User,
    permission: "profile.view",
  },
];