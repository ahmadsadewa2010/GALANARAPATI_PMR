"use client";

import {
  hasPermission,
  type Permission,
} from "../permissions";

import { useAuth } from "../AuthProvider";

export function usePermission() {
  const { profile } = useAuth();

  function can(
    permission: Permission
  ) {
    if (!profile) return false;

    return hasPermission(
      profile.role,
      permission
    );
  }

  return {
    can,
  };
}