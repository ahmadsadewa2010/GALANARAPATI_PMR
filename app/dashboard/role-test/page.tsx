"use client";

import { useAuth } from "@/features/auth/AuthProvider";
import { usePermission } from "@/features/auth/hooks/usePermission";

export default function RoleTestPage() {
  const { profile, user } = useAuth();
  const { can } = usePermission();

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="text-3xl font-bold">
        RBAC Role Test
      </h1>

      <div className="mt-6 space-y-4">

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-400">
            Email
          </p>

          <p className="mt-1">
            {user?.email ?? "-"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-400">
            Role
          </p>

          <p className="mt-1 text-xl font-bold text-cyan-400">
            {profile?.role ?? "NO ROLE"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="mb-4 text-sm text-slate-400">
            Permission
          </p>

          <div className="space-y-2">
            {[
              "dashboard.view",
              "members.view",
              "schools.view",
              "finance.view",
              "events.view",
              "attendance.view",
              "letters.view",
              "inventory.view",
              "profile.view",
              "settings.manage",
            ].map((permission) => (
              <div
                key={permission}
                className="flex items-center justify-between rounded-lg bg-black/20 px-4 py-3"
              >
                <span>{permission}</span>

                <span
                  className={
                    can(permission as any)
                      ? "text-emerald-400"
                      : "text-red-400"
                  }
                >
                  {can(permission as any)
                    ? "✓ ALLOW"
                    : "✕ DENY"}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}