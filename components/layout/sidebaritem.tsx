"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  icon: any;
  title: string;
  href: string;
  active: boolean;
  badge?: string | null;
  collapsed: boolean;
}

export default function SidebarItem({
  icon: Icon,
  title,
  href,
  active,
 badge,
  collapsed,
}: Props) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ x: 6 }}
        whileTap={{ scale: 0.98 }}
        className={`group flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        } rounded-2xl px-4 py-3 transition-all duration-300 ${
          active
            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon size={20} />

          {!collapsed && (
            <span className="font-medium">{title}</span>
          )}
        </div>

        {!collapsed && badge && (
          <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs">
            {badge}
          </span>
        )}
      </motion.div>
    </Link>
  );
}