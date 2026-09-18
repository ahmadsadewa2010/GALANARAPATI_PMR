import { ROLE } from "./roles";
import { ROUTES } from "../routes";

export function getDashboard(role: string) {

  switch(role){

    case ROLE.SUPER_ADMIN:
      return ROUTES.SUPER_ADMIN;

    case ROLE.ADMIN:
      return ROUTES.DASHBOARD;

    default:
      return ROUTES.ANGGOTA;

  }

}