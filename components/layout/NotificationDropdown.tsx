"use client";

import { motion } from "framer-motion";

export default function NotificationDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="
      absolute
      right-0
      mt-3
      w-80
      rounded-2xl
      border
      border-slate-700
      bg-slate-900/95
      backdrop-blur-xl
      shadow-2xl
      overflow-hidden
      "
    >
      <div className="p-5 border-b border-slate-800">
        <h2 className="font-bold text-lg">
          Notifikasi
        </h2>
      </div>

      <div className="divide-y divide-slate-800">

        <div className="p-4 hover:bg-slate-800 cursor-pointer">
          🎉 Anggota baru berhasil ditambahkan
        </div>

        <div className="p-4 hover:bg-slate-800 cursor-pointer">
          💰 Kas bulan Juni sudah masuk
        </div>

        <div className="p-4 hover:bg-slate-800 cursor-pointer">
          📅 Event donor darah besok
        </div>

        <div className="p-4 hover:bg-slate-800 cursor-pointer">
          📝 Jadwal latihan diperbarui
        </div>

      </div>
    </motion.div>
  );
}