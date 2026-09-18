"use client";

import { ReactNode } from "react";

import { useAuth } from "../AuthProvider";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
}

export default function RoleGuard({
  children,
  allowedRoles,
  fallback,
}: RoleGuardProps) {
  const {
    profile,
    loading,
  } = useAuth();

  // Masih mengambil profile
  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-blue-500" />
      </div>
    );
  }

  // Belum punya profile
  if (!profile) {
    return (
      fallback ?? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="text-lg font-semibold text-white">
            Profil Tidak Ditemukan
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Data profil akun belum tersedia.
          </p>
        </div>
      )
    );
  }

  // Cek role
  const hasPermission = allowedRoles.includes(
    profile.role
  );

  // Role tidak diizinkan
  if (!hasPermission) {
    return (
      fallback ?? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-xl">
            🔒
          </div>

          <h2 className="text-lg font-semibold text-white">
            Akses Ditolak
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Anda tidak memiliki izin untuk mengakses
            halaman ini.
          </p>
        </div>
      )
    );
  }

  return <>{children}</>;
}