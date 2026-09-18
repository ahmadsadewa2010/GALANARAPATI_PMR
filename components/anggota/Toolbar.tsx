"use client";

import { Search, Plus } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  onTambah: () => void;
}

export default function Toolbar({
  search,
  setSearch,
  onTambah,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 md:flex-row md:items-center md:justify-between">

      <div className="relative w-full md:w-96">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari anggota..."
          className="w-full rounded-xl bg-slate-800 py-3 pl-11 pr-4 text-white outline-none ring-1 ring-slate-700 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={onTambah}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
      >
        <Plus size={18} />
        Tambah Anggota
      </button>

    </div>
  );
}