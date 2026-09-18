"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Inventaris } from "@/lib/inventaris/types";
import { uploadFoto, getFotoUrl } from "@/lib/inventaris/storage";

import { formatRupiah } from "@/lib/utils/format";

const kategoriList = [
  "Medis",
  "Peralatan",
  "Administrasi",
  "Furniture",
  "Konsumsi",
  "Lainnya",
];

const kondisiList = [
  "Baik",
  "Perawatan",
  "Rusak",
  "Hilang",
];

interface InventarisModalProps {
  editData?: Inventaris;
  onSave: (data: Inventaris) => void;
}

export default function InventarisModal({ editData, onSave }: InventarisModalProps) {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("Medis");
  const [jumlah, setJumlah] = useState("1");
  const [harga, setHarga] = useState("");
  const [kondisi, setKondisi] = useState("Baik");
  const [lokasi, setLokasi] = useState("");
  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [foto, setFoto] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!editData) {
      return;
    }

    setNama(editData.nama || "");
    setKategori(editData.kategori || "Medis");
    setJumlah(String(editData.jumlah ?? 1));
    setHarga(String(editData.harga ?? ""));
    setKondisi(editData.kondisi || "Baik");
    setLokasi(editData.lokasi || "");
    setTanggalMasuk(editData.tanggal_masuk || "");
    setKeterangan(editData.keterangan || "");
    setFoto(editData.foto || "");

    if (editData.foto) {
      setPreview(getFotoUrl(editData.foto));
    }
  }, [editData]);

  const handleUpload = async (file: File) => {
    const path = await uploadFoto(file);
    setFoto(path);
    setPreview(getFotoUrl(path));
  };

  const handleSave = () => {
    onSave({
      id: editData?.id || 0,
      nama,
      kategori,
      jumlah: Number(jumlah),
      harga: Number(harga),
      lokasi,
      tanggal_masuk: tanggalMasuk,
      kondisi,
      foto,
      keterangan,
    } as Inventaris);
  };

  return (
    <div className="space-y-4">
      <label className="flex h-56 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800 transition hover:border-blue-500">
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleUpload(file);
            }
          }}
        />

        {preview ? (
          <img
                src={preview}
                alt="Banner"
                className="h-full w-full object-cover"
              />
        ) : (
          <div className="text-center">
            <div className="text-6xl">📦</div>
            <p className="mt-3 text-slate-400">Upload Foto Barang</p>
          </div>
        )}
      </label>

      <input
        type="text"
        value={harga ? formatRupiah(harga) : ""}
        onChange={(e) => {
          const angka = e.target.value.replace(/\D/g, "");
          setHarga(angka);
        }}
        placeholder="Harga"
        className="w-full rounded-xl bg-slate-800 p-3 text-white"
      />

      <select
        value={kondisi}
        onChange={(e) => setKondisi(e.target.value)}
        className="w-full rounded-xl bg-slate-800 p-3 text-white"
      >
        {kondisiList.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <button type="button" onClick={handleSave} className="rounded-xl bg-blue-600 px-4 py-3 text-white">
        Simpan
      </button>
    </div>
  );
}

