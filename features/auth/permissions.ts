export type UserRole =
  | "super_admin"
  | "admin_sekolah"
  | "anggota";

export type Permission =
  | "dashboard.view"
  | "members.view"
  | "members.manage"
  | "schools.view"
  | "schools.manage"
  | "finance.view"
  | "finance.manage"
  | "events.view"
  | "events.manage"
  | "attendance.view"
  | "attendance.manage"
  | "letters.view"
  | "letters.manage"
  | "inventory.view"
  | "inventory.manage"
  | "profile.view"
  | "settings.manage";

const ROLE_PERMISSIONS: Record<
  UserRole,
  Permission[]
> = {
  super_admin: [
    "dashboard.view",

    "members.view",
    "members.manage",

    "schools.view",
    "schools.manage",

    "finance.view",
    "finance.manage",

    "events.view",
    "events.manage",

    "attendance.view",
    "attendance.manage",

    "letters.view",
    "letters.manage",

    "inventory.view",
    "inventory.manage",

    "profile.view",
    "settings.manage",
  ],

  admin_sekolah: [
    "dashboard.view",

    "members.view",
    "members.manage",

    "finance.view",
    "finance.manage",

    "events.view",
    "events.manage",

    "attendance.view",
    "attendance.manage",

    "inventory.view",
    "inventory.manage",

    "profile.view",
  ],

  anggota: [
    "dashboard.view",

    "events.view",

    "attendance.view",

    "profile.view",
  ],
};

export function hasPermission(
  role: UserRole,
  permission: Permission
) {
  return ROLE_PERMISSIONS[role]?.includes(
    permission
  ) ?? false;
}

export function getRolePermissions(
  role: UserRole
) {
  return ROLE_PERMISSIONS[role] ?? [];
}