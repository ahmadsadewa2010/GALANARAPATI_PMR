import {
  LayoutDashboard,
  Users,
  School,
  Wallet,
  CalendarDays,
  ClipboardCheck,
  Package,
  Award,
  Settings,
} from "lucide-react";

export const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: "Data Anggota",
    href: "/anggota",
    icon: Users,
    badge: "248",
  },
  {
    title: "Sekolah",
    href: "/sekolah",
    icon: School,
    badge: "18",
  },
  {
    title: "Kas",
    href: "/kas",
    icon: Wallet,
    badge: null,
  },
  {
    title: "Event",
    href: "/event",
    icon: CalendarDays,
    badge: "6",
  },
  {
    title: "Presensi",
    href: "/presensi",
    icon: ClipboardCheck,
    badge: null,
  },
  {
    title: "Inventaris",
    href: "/inventaris",
    icon: Package,
    badge: null,
  },
  {
    title: "Prestasi",
    href: "/prestasi",
    icon: Award,
    badge: null,
  },
  {
    title: "Pengaturan",
    href: "/settings",
    icon: Settings,
    badge: null,
  },
];