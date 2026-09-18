"use client";

import { motion } from "framer-motion";

export default function ProfileDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: .9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="
      absolute
      right-0
      mt-3
      w-56
      rounded-2xl
      border
      border-slate-700
      bg-slate-900/95
      backdrop-blur-xl
      shadow-2xl
      overflow-hidden
      "
    >
      <button className="w-full text-left p-4 hover:bg-slate-800">
        👤 Profil
      </button>

      <button className="w-full text-left p-4 hover:bg-slate-800">
        ⚙ Pengaturan
      </button>

      <button className="w-full text-left p-4 hover:bg-slate-800">
        🌙 Dark Mode
      </button>

      <button className="w-full text-left p-4 hover:bg-red-600">
        🚪 Logout
      </button>
    </motion.div>
  );
}