import {
  LayoutDashboard,
  Users,
  Wallet,
  CalendarDays,
  ClipboardCheck,
  FileText,
  Package,
  School,
  User,
} from "lucide-react";

export const sekolahMenu = [
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
    label: "Kegiatan",
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
    label: "Kas Sekolah",
    href: "/dashboard/kas",
    icon: Wallet,
    permission: "finance.view",
  },
  {
    label: "Inventaris",
    href: "/dashboard/inventaris",
    icon: Package,
    permission: "inventory.view",
  },
  {
    label: "Persuratan",
    href: "/dashboard/persuratan",
    icon: FileText,
    permission: "letters.view",
  },
  {
    label: "Profil Sekolah",
    href: "/dashboard/sekolah/profil",
    icon: School,
    permission: "profile.view",
  },
  {
    label: "Profil Saya",
    href: "/dashboard/profil",
    icon: User,
    permission: "profile.view",
  },
];