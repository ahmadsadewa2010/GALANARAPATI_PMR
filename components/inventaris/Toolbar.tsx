"use client";

import { Search, Plus } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  kategori: string;
  setKategori: (value: string) => void;

  kondisi: string;
  setKondisi: (value: string) => void;

  onTambah: () => void;
}

const kategoriList = [
  "Semua",
  "Medis",
  "Peralatan",
  "Administrasi",
  "Furniture",
  "Konsumsi",
  "Lainnya",
];

const kondisiList = [
  "Semua",
  "Baik",
  "Perawatan",
  "Rusak",
  "Hilang",
];

export default function Toolbar({
  search,
  setSearch,
  kategori,
  setKategori,
  kondisi,
  setKondisi,
  onTambah,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* Search */}
        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama barang..."
            className="
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-slate-800
              py-3
              pl-12
              pr-4
              text-white
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
            "
          />

        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3">

          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="
              rounded-2xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-white
              outline-none
            "
          >
            {kategoriList.map((item) => (
              <option key={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={kondisi}
            onChange={(e) => setKondisi(e.target.value)}
            className="
              rounded-2xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-white
              outline-none
            "
          >
            {kondisiList.map((item) => (
              <option key={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            onClick={onTambah}
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              via-cyan-500
              to-blue-700
              px-6
              py-3
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-blue-500/30
            "
          >
            <Plus size={18} />

            Tambah Barang
          </button>

        </div>

      </div>

    </div>
  );
}