"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  X,
  Upload,
} from "lucide-react";

import type {
  Inventaris,
  InventarisFormData,
  KepemilikanInventaris,
  KondisiInventaris,
} from "@/lib/inventaris/types";

import {
  uploadFoto,
  getFotoUrl,
} from "@/lib/inventaris/storage";

import {
  formatRupiah,
} from "@/lib/utils/format";

type UserRole =
  | "super_admin"
  | "admin_sekolah"
  | "anggota";

interface SekolahOption {
  id: number;
  nama: string;
}

interface Props {
  open: boolean;

  editData:
    | Inventaris
    | null;

  onClose: () => void;

  onSave: (
    data: InventarisFormData
  ) => Promise<void>;

  role: UserRole | null;

  sekolahId: number | null;

  sekolahList: SekolahOption[];
}

const kategoriList = [
  "Medis",
  "Peralatan",
  "Administrasi",
  "Furniture",
  "Konsumsi",
  "Lainnya",
];

const kondisiList: KondisiInventaris[] = [
  "Baik",
  "Perawatan",
  "Rusak",
  "Hilang",
];

export default function InventarisModal({
  open,
  editData,
  onClose,
  onSave,
  role,
  sekolahId,
  sekolahList,
}: Props) {
  const [nama, setNama] =
    useState("");

  const [kategori, setKategori] =
    useState("Medis");

  const [jumlah, setJumlah] =
    useState("1");

  const [harga, setHarga] =
    useState("");

  const [kondisi, setKondisi] =
    useState<KondisiInventaris>("Baik");

  const [kepemilikan, setKepemilikan] =
    useState<KepemilikanInventaris>(
      "induk"
    );

  const [targetSekolahId, setTargetSekolahId] =
    useState<number | null>(null);

  const [lokasi, setLokasi] =
    useState("");

  const [tanggalMasuk, setTanggalMasuk] =
    useState("");

  const [keterangan, setKeterangan] =
    useState("");

  const [foto, setFoto] =
    useState<string | null>(null);

  const [preview, setPreview] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  /*
   * ==========================================
   * RESET / EDIT
   * ==========================================
   */

  useEffect(() => {
    if (!open) {
      return;
    }

    if (editData) {
      setNama(editData.nama);
      setKategori(
        editData.kategori
      );
      setJumlah(
        String(editData.jumlah)
      );
      setHarga(
        String(editData.harga)
      );
      setKondisi(
        editData.kondisi
      );

      setKepemilikan(
        editData.kepemilikan
      );

      setTargetSekolahId(
        editData.sekolah_id
      );

      setLokasi(
        editData.lokasi
      );

      setTanggalMasuk(
        editData.tanggal_masuk
      );

      setKeterangan(
        editData.keterangan ?? ""
      );

      setFoto(
        editData.foto ?? null
      );

      setPreview(
        editData.foto
          ? getFotoUrl(editData.foto)
          : ""
      );

      return;
    }

    /*
     * DATA BARU
     */
    setNama("");
    setKategori("Medis");
    setJumlah("1");
    setHarga("");
    setKondisi("Baik");
    setLokasi("");
    setTanggalMasuk(
      new Date()
        .toISOString()
        .slice(0, 10)
    );
    setKeterangan("");
    setFoto(null);
    setPreview("");

    /*
     * Super admin default:
     * inventaris induk.
     */
    if (role === "super_admin") {
      setKepemilikan("induk");
      setTargetSekolahId(null);
    } else {
      /*
       * Admin sekolah:
       * otomatis sekolah sendiri.
       */
      setKepemilikan("sekolah");
      setTargetSekolahId(
        sekolahId
      );
    }
  }, [
    open,
    editData,
    role,
    sekolahId,
  ]);

  /*
   * ==========================================
   * UPLOAD FOTO
   * ==========================================
   */

  async function handleUpload(
    file: File
  ) {
    try {
      setUploading(true);

      const path =
        await uploadFoto(file);

      setFoto(path);
      setPreview(
        getFotoUrl(path)
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Gagal upload foto."
      );
    } finally {
      setUploading(false);
    }
  }

  /*
   * ==========================================
   * SAVE
   * ==========================================
   */

  async function handleSave() {
    if (!nama.trim()) {
      alert(
        "Nama barang wajib diisi."
      );
      return;
    }

    if (
      Number(jumlah) <= 0
    ) {
      alert(
        "Jumlah barang harus lebih dari 0."
      );
      return;
    }

    if (
      kepemilikan === "sekolah" &&
      !targetSekolahId
    ) {
      alert(
        "Sekolah wajib dipilih."
      );
      return;
    }

    try {
      setSaving(true);

      const payload: InventarisFormData =
        {
          nama: nama.trim(),

          kategori,

          jumlah:
            Number(jumlah),

          harga:
            Number(harga) || 0,

          kondisi,

          kepemilikan,

          sekolah_id:
            kepemilikan ===
            "induk"
              ? null
              : targetSekolahId,

          lokasi:
            lokasi.trim(),

          tanggal_masuk:
            tanggalMasuk,

          foto,

          keterangan:
            keterangan.trim() ||
            null,
        };

      await onSave(payload);
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-950/95 px-6 py-5 backdrop-blur">

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              INVENTARIS
            </p>

            <h2 className="mt-1 text-xl font-bold text-white">
              {editData
                ? "Edit Barang"
                : "Tambah Barang"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        <div className="space-y-5 p-6">

          {/* FOTO */}

          <label className="flex h-52 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900 transition hover:border-cyan-500">

            <input
              type="file"
              hidden
              accept="image/*"
              disabled={uploading}
              onChange={(e) => {
                const file =
                  e.target.files?.[0];

                if (file) {
                  handleUpload(file);
                }
              }}
            />

            {preview ? (
              <img
                src={preview}
                alt="Foto barang"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center">
                <Upload
                  size={34}
                  className="mx-auto text-cyan-400"
                />

                <p className="mt-3 text-sm font-medium text-white">
                  {uploading
                    ? "Mengupload..."
                    : "Upload Foto Barang"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  JPG, PNG, WEBP
                </p>
              </div>
            )}
          </label>

          {/* NAMA */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Nama Barang
            </label>

            <input
              value={nama}
              onChange={(e) =>
                setNama(
                  e.target.value
                )
              }
              placeholder="Contoh: Tandu Lipat"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          {/* KATEGORI + JUMLAH */}

          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Kategori
              </label>

              <select
                value={kategori}
                onChange={(e) =>
                  setKategori(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
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
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Jumlah
              </label>

              <input
                type="number"
                min="1"
                value={jumlah}
                onChange={(e) =>
                  setJumlah(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
              />
            </div>

          </div>

          {/* KEPEMILIKAN */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Kepemilikan
            </label>

            <select
              value={kepemilikan}
              disabled={
                role !==
                "super_admin"
              }
              onChange={(e) =>
                setKepemilikan(
                  e.target
                    .value as KepemilikanInventaris
                )
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="induk">
                Milik Induk
              </option>

              <option value="sekolah">
                Milik Sekolah
              </option>
            </select>

            {role ===
              "admin_sekolah" && (
              <p className="mt-2 text-xs text-slate-500">
                Inventaris admin otomatis menjadi milik sekolah sendiri.
              </p>
            )}
          </div>

          {/* SEKOLAH */}

          {kepemilikan ===
            "sekolah" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Sekolah
              </label>

              {role ===
              "super_admin" ? (
                <select
                  value={
                    targetSekolahId ??
                    ""
                  }
                  onChange={(e) =>
                    setTargetSekolahId(
                      e.target
                        .value
                        ? Number(
                            e.target.value
                          )
                        : null
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
                >
                  <option value="">
                    Pilih Sekolah
                  </option>

                  {sekolahList.map(
                    (sekolah) => (
                      <option
                        key={
                          sekolah.id
                        }
                        value={
                          sekolah.id
                        }
                      >
                        {sekolah.nama}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-300">
                  {sekolahList.find(
                    (item) =>
                      item.id ===
                      sekolahId
                  )?.nama ??
                    `Sekolah #${sekolahId}`}
                </div>
              )}
            </div>
          )}

          {/* HARGA */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Harga Satuan
            </label>

            <input
              type="text"
              value={
                harga
                  ? formatRupiah(
                      harga
                    )
                  : ""
              }
              onChange={(e) => {
                const angka =
                  e.target.value.replace(
                    /\D/g,
                    ""
                  );

                setHarga(
                  angka
                );
              }}
              placeholder="Rp 0"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          {/* KONDISI */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Kondisi
            </label>

            <select
              value={kondisi}
              onChange={(e) =>
                setKondisi(
                  e.target
                    .value as KondisiInventaris
                )
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
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
          </div>

          {/* LOKASI */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Lokasi Penyimpanan
            </label>

            <input
              value={lokasi}
              onChange={(e) =>
                setLokasi(
                  e.target.value
                )
              }
              placeholder="Contoh: Gudang PMR"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          {/* TANGGAL */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Tanggal Masuk
            </label>

            <input
              type="date"
              value={
                tanggalMasuk
              }
              onChange={(e) =>
                setTanggalMasuk(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </div>

          {/* KETERANGAN */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Keterangan
            </label>

            <textarea
              value={keterangan}
              onChange={(e) =>
                setKeterangan(
                  e.target.value
                )
              }
              rows={4}
              placeholder="Keterangan tambahan..."
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

        </div>

        {/* FOOTER */}

        <div className="flex justify-end gap-3 border-t border-white/10 bg-slate-950 px-6 py-5">

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={
              saving ||
              uploading
            }
            className="rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Menyimpan..."
              : "Simpan Inventaris"}
          </button>

        </div>

      </div>
    </div>
  );
}