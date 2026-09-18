import { ROLE } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";

export function getDashboard(
  role: string
) {
  switch (role) {
    case ROLE.SUPER_ADMIN:
      return ROUTES.SUPER_ADMIN;

    case ROLE.ADMIN:
      return ROUTES.DASHBOARD;

    default:
      return ROUTES.ANGGOTA;
  }
}