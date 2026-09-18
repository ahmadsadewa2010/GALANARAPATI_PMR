"use client";

import { usePermission } from "@/features/auth/hooks/usePermission";
import type { Permission } from "@/features/auth/permissions";

import { ShieldX } from "lucide-react";
import Link from "next/link";

export default function PermissionGuard({
  permission,
  children,
}: {
  permission: Permission;
  children: React.ReactNode;
}) {
  const { can } = usePermission();

  if (!can(permission)) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center p-8">
        <div className="w-full max-w-md text-center">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-red-400/10 bg-red-500/10">
            <ShieldX
              size={38}
              className="text-red-400"
            />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-400">
            Error 403
          </p>

          <h1 className="text-3xl font-bold text-white">
            Akses Ditolak
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Akun kamu tidak memiliki izin untuk
            mengakses halaman ini.
          </p>

          <Link
            href="/dashboard"
            className="mt-7 inline-flex items-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400"
          >
            Kembali ke Dashboard
          </Link>

        </div>
      </main>
    );
  }

  return <>{children}</>;
}