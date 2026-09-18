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

      <div className="relative w-full md:max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari transaksi..."
          className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white outline-none transition focus:border-blue-500"
        />

      </div>

      <button
        onClick={onTambah}
        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <Plus size={18} />
        Tambah Transaksi
      </button>

    </div>
  );
}