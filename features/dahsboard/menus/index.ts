import { superAdminMenu } from "./superAdminMenu";
import { sekolahMenu } from "./sekolahMenu";
import { anggotaMenu } from "./anggotaMenu";

import type { UserRole } from "@/features/auth/permissions";

export function getDashboardMenu(
  role: UserRole
) {
  switch (role) {
    case "super_admin":
      return superAdminMenu;

    case "admin_sekolah":
      return sekolahMenu;

    case "anggota":
      return anggotaMenu;

    default:
      return [];
  }
}