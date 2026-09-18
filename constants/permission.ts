import { ROLE } from "./roles";

export const PERMISSION = {

  dashboard: [
    ROLE.ADMIN,
    ROLE.SUPER_ADMIN,
  ],

  anggota: [
    ROLE.ANGGOTA,
  ],

  kas: [
    ROLE.ADMIN,
  ],

  inventaris: [
    ROLE.ADMIN,
  ],

  event: [
    ROLE.ADMIN,
  ],

  presensi: [
    ROLE.ADMIN,
  ],

  sekolah: [
    ROLE.SUPER_ADMIN,
  ],

  monitoring: [
    ROLE.SUPER_ADMIN,
  ],

};