"use client";

import { formatRupiah } from "@/lib/utils/format";
import { useEffect, useState } from "react";
import { Kas } from "@/lib/Kas/types";
const kategoriMasuk = [
  "Iuran Anggota",
  "Donasi",
  "Sponsor",
  "Penjualan",
  "Lainnya",
];

const kategoriKeluar = [
  "Alat PMR",
  "Obat-obatan",
  "Konsumsi",
  "Transportasi",
  "Administrasi",
  "Lainnya",
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Kas, "id"> | Kas) => void;
  editData?: Kas | null;
}

export default function KasModal({
  open,
  onClose,
  onSave,
  editData,
}: Props) {
  const [tanggal, setTanggal] = useState("");
  const [jenis, setJenis] = useState<"Masuk" | "Keluar">("Masuk");
  const [kategori, setKategori] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [nominal, setNominal] = useState("");

  useEffect(() => {
    if (editData) {
      setTanggal(editData.tanggal);
      setJenis(editData.jenis);
      setKategori(editData.kategori);
      setKeterangan(editData.keterangan);
      setNominal(String(editData.nominal));
    } else {
      setTanggal(new Date().toISOString().split("T")[0]);
      setJenis("Masuk");
      setKategori("");
      setKeterangan("");
      setNominal("");
    }
  }, [editData]);

  if (!open) return null;


  const handleNominal = (value: string) => {
  const angka = value.replace(/\D/g, "");
    setNominal(angka);
  };
  const handleSave = () => {
      if (
        !tanggal ||
        !kategori ||
        !keterangan ||
        !nominal
      ) {
        alert("Semua field wajib diisi.");
        return;
      }

      if (editData) {
        onSave({
          id: editData.id,
          tanggal,
          jenis,
          kategori,
          keterangan,
          nominal: Number(nominal),
        });
      } else {
        onSave({
          tanggal,
          jenis,
          kategori,
          keterangan,
          nominal: Number(nominal),
        } as Kas);
      }

      onClose();
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

        <h2 className="mb-6 text-2xl font-bold text-white">
          {editData ? "Edit Transaksi" : "Tambah Transaksi"}
        </h2>

        <div className="space-y-5">

          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full rounded-xl bg-slate-800 p-3 text-white outline-none ring-1 ring-slate-700 focus:ring-blue-500"
          />

          <div className="grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={() => setJenis("Masuk")}
              className={`rounded-xl p-3 font-semibold transition ${
                jenis === "Masuk"
                  ? "bg-green-600 text-white"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              🟢 Pemasukan
            </button>

            <button
              type="button"
              onClick={() => setJenis("Keluar")}
              className={`rounded-xl p-3 font-semibold transition ${
                jenis === "Keluar"
                  ? "bg-red-600 text-white"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              🔴 Pengeluaran
            </button>

          </div>

          <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full rounded-xl bg-slate-800 p-3 text-white outline-none ring-1 ring-slate-700 focus:ring-blue-500"
            >
              <option value="">
                Pilih Kategori
              </option>

              {(jenis === "Masuk"
                ? kategoriMasuk
                : kategoriKeluar
              ).map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

          <input
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            placeholder="Keterangan"
            className="w-full rounded-xl bg-slate-800 p-3 text-white outline-none ring-1 ring-slate-700 focus:ring-blue-500"
          />

          <input
            type="text"
            inputMode="numeric"
            value={nominal ? formatRupiah(nominal) : ""}
            onChange={(e) => handleNominal(e.target.value)}
            placeholder="Nominal"
            className="w-full rounded-xl bg-slate-800 p-3 text-white outline-none ring-1 ring-slate-700 focus:ring-blue-500"
          />

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-700 px-5 py-3 text-white transition hover:bg-slate-600"
          >
            Batal
          </button>

          <button
            onClick={handleSave}
            className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            {editData ? "Update" : "Simpan"}
          </button>

        </div>

      </div>

    </div>
  );
}