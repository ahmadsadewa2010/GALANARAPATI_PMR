export const ROLE = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  ANGGOTA: "anggota",
} as const;

export type Role =
  (typeof ROLE)[keyof typeof ROLE];