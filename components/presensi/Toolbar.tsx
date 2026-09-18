"use client";

import {
  Search,
  Plus,
} from "lucide-react";

interface ToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  onTambah: () => void;
}

export default function Toolbar({
  search,
  setSearch,
  onTambah,
}: ToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      <div className="relative w-full sm:max-w-md">

        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Cari anggota..."
          className="
            w-full
            rounded-xl
            border
            border-slate-800
            bg-slate-900/70
            py-3
            pl-11
            pr-4
            text-sm
            text-white
            outline-none
            transition
            placeholder:text-slate-600
            focus:border-blue-500/50
          "
        />

      </div>

      <button
        onClick={onTambah}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-blue-600
          px-5
          py-3
          text-sm
          font-medium
          text-white
          transition
          hover:bg-blue-500
        "
      >
        <Plus size={18} />

        Tambah Presensi
      </button>

    </div>
  );
}