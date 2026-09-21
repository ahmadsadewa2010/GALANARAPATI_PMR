"use client";

import {
  Search,
  Plus,
} from "lucide-react";

interface SekolahOption {
  id: number;
  nama: string;
}

interface Props {
  search: string;
  setSearch: (value: string) => void;

  kategori: string;
  setKategori: (value: string) => void;

  kondisi: string;
  setKondisi: (value: string) => void;

  kepemilikan: string;
  setKepemilikan: (value: string) => void;

  sekolahFilter: string;
  setSekolahFilter: (value: string) => void;

  sekolahList: SekolahOption[];

  showSchoolFilter: boolean;

  canManage: boolean;

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
  kepemilikan,
  setKepemilikan,
  sekolahFilter,
  setSekolahFilter,
  sekolahList,
  showSchoolFilter,
  canManage,
  onTambah,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl">

      <div className="flex flex-col gap-4">

        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Cari nama barang..."
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex flex-wrap gap-3">

          <select
            value={kepemilikan}
            onChange={(e) =>
              setKepemilikan(
                e.target.value
              )
            }
            className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
          >
            <option value="Semua">
              Semua Kepemilikan
            </option>

            <option value="induk">
              Milik Induk
            </option>

            <option value="sekolah">
              Milik Sekolah
            </option>
          </select>

          {showSchoolFilter && (
            <select
              value={sekolahFilter}
              onChange={(e) =>
                setSekolahFilter(
                  e.target.value
                )
              }
              className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
            >
              <option value="Semua">
                Semua Sekolah
              </option>

              {sekolahList.map(
                (sekolah) => (
                  <option
                    key={sekolah.id}
                    value={sekolah.id}
                  >
                    {sekolah.nama}
                  </option>
                )
              )}
            </select>
          )}

          <select
            value={kategori}
            onChange={(e) =>
              setKategori(e.target.value)
            }
            className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
          >
            {kategoriList.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          <select
            value={kondisi}
            onChange={(e) =>
              setKondisi(e.target.value)
            }
            className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
          >
            {kondisiList.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          {canManage && (
            <button
              onClick={onTambah}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30"
            >
              <Plus size={18} />
              Tambah Barang
            </button>
          )}

        </div>
      </div>
    </div>
  );
}