"use client";

import { LogOut } from "lucide-react";

interface Props {
  collapsed: boolean;
}

export default function SidebarFooter({
  collapsed,
}: Props) {
  return (
    <div className="border-t border-slate-800 p-4">

      <div className="rounded-2xl bg-slate-900 p-4">

        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500" />

          {!collapsed && (
            <div>

              <p className="font-semibold text-white">
                Administrator
              </p>

              <p className="text-xs text-green-400">
                ● Online
              </p>

            </div>
          )}

        </div>

        {!collapsed && (
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-white hover:bg-red-700">

            <LogOut size={18} />

            Logout

          </button>
        )}

      </div>

    </div>
  );
}