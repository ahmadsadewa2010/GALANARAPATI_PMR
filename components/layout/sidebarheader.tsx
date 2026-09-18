"use client";

import { HeartPulse } from "lucide-react";

interface Props {
  collapsed: boolean;
}

export default function SidebarHeader({
  collapsed,
}: Props) {
  return (
    <div className="border-b border-slate-800 p-6">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">

          <HeartPulse className="text-white" size={28} />

        </div>

        {!collapsed && (
          <div>
            <h1 className="text-xl font-bold text-white">
              PMR System
            </h1>

            <p className="text-sm text-slate-400">
              Premium Dashboard
            </p>
          </div>
        )}

      </div>

    </div>
  );
}