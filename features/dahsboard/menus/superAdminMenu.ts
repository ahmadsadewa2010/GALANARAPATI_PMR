import {
  LayoutDashboard,
  Users,
  School,
  Wallet,
  CalendarDays,
  ClipboardCheck,
  FileText,
  Package,
  User,
  Settings,
} from "lucide-react";

export const superAdminMenu = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: "dashboard.view",
  },
  {
    label: "Anggota",
    href: "/dashboard/anggota",
    icon: Users,
    permission: "members.view",
  },
  {
    label: "Sekolah Mitra",
    href: "/dashboard/sekolah",
    icon: School,
    permission: "schools.view",
  },
  {
    label: "Kas",
    href: "/dashboard/kas",
    icon: Wallet,
    permission: "finance.view",
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
    label: "Persuratan",
    href: "/dashboard/persuratan",
    icon: FileText,
    permission: "letters.view",
  },
  {
    label: "Inventaris",
    href: "/dashboard/inventaris",
    icon: Package,
    permission: "inventory.view",
  },
  {
    label: "Profil",
    href: "/dashboard/profil",
    icon: User,
    permission: "profile.view",
  },
  {
    label: "Pengaturan",
    href: "/dashboard/pengaturan",
    icon: Settings,
    permission: "settings.manage",
  },
];