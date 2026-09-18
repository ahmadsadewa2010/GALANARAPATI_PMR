"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Sekolah {
  id: number;
  nama: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  editData?: any;

  // Role user yang sedang login
  role?: "super_admin" | "admin_sekolah" | "anggota" | null;

  // Sekolah akun yang sedang login
  sekolahId?: number | null;
}

export default function AnggotaModal({
  open,
  onClose,
  onSave,
  editData,
  role,
  sekolahId,
}: Props) {
  const [nama, setNama] = useState("");
  const [nisn, setNisn] = useState("");
  const [namaIbuKandung, setNamaIbuKandung] = useState("");
  const [sekolahIdForm, setSekolahIdForm] = useState<number | null>(null);
  const [jabatan, setJabatan] = useState("");
  const [status, setStatus] = useState("Aktif");

  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [sekolahList, setSekolahList] = useState<Sekolah[]>([]);
  const [loadingSekolah, setLoadingSekolah] = useState(false);

  /*
   * Ambil daftar sekolah.
   * Hanya super_admin yang membutuhkan selector sekolah.
   */
  useEffect(() => {
    if (!open || role !== "super_admin") return;

    const loadSekolah = async () => {
      try {
        setLoadingSekolah(true);

        const { data, error } = await supabase
          .from("sekolah")
          .select("id, nama")
          .eq("aktif", true)
          .order("nama", { ascending: true });

        if (error) throw error;

        setSekolahList(data ?? []);
      } catch (error) {
        console.error("LOAD SEKOLAH ERROR:", error);
      } finally {
        setLoadingSekolah(false);
      }
    };

    loadSekolah();
  }, [open, role]);

  /*
   * Isi form saat tambah / edit
   */
  useEffect(() => {
    if (!open) return;

    if (editData) {
      setNama(editData.nama ?? "");
      setNisn(editData.nisn ?? "");
      setNamaIbuKandung(editData.nama_ibu_kandung ?? "");

      setSekolahIdForm(
        editData.sekolah_id
          ? Number(editData.sekolah_id)
          : sekolahId ?? null
      );

      setJabatan(editData.jabatan ?? "Anggota");
      setStatus(editData.status ?? "Aktif");

      if (editData.foto) {
        setPreview(editData.foto);
      } else {
        setPreview(null);
      }

      setFoto(null);
    } else {
      setNama("");
      setNisn("");
      setNamaIbuKandung("");

      // Admin sekolah otomatis menggunakan sekolah akunnya
      setSekolahIdForm(sekolahId ?? null);

      setJabatan("Anggota");
      setStatus("Aktif");

      setFoto(null);
      setPreview(null);
    }
  }, [open, editData, sekolahId]);

  if (!open) return null;

  const handleSave = () => {
    if (!nama.trim()) {
      alert("Nama lengkap harus diisi.");
      return;
    }

    if (!nisn.trim()) {
      alert("NISN harus diisi.");
      return;
    }

    if (nisn.trim().length < 10) {
      alert("NISN minimal 10 digit.");
      return;
    }

    if (!namaIbuKandung.trim()) {
      alert("Nama ibu kandung harus diisi.");
      return;
    }

    if (!jabatan.trim()) {
      alert("Jabatan harus diisi.");
      return;
    }

    /*
     * Super admin wajib memilih sekolah.
     * Admin sekolah otomatis memakai sekolah akun.
     */
    const finalSekolahId =
      role === "super_admin"
        ? sekolahIdForm
        : sekolahId ?? null;

    if (!finalSekolahId) {
      alert("Sekolah anggota belum ditentukan.");
      return;
    }

    onSave({
      id: editData?.id,

      nama: nama.trim(),

      nisn: nisn.trim(),

      nama_ibu_kandung: namaIbuKandung.trim(),

      sekolah_id: Number(finalSekolahId),

      jabatan: jabatan.trim(),

      status,

      foto,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

        {/* HEADER */}
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-400">
            DATA ANGGOTA
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            {editData ? "Edit Anggota" : "Tambah Anggota"}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Lengkapi informasi anggota PMR.
          </p>
        </div>

        <div className="space-y-5">

          {/* FOTO */}
          <div className="flex flex-col items-center gap-3">
            {preview ? (
              <img
                src={preview}
                alt="Preview foto anggota"
                className="h-32 w-32 rounded-full object-cover ring-4 ring-blue-500/30"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-800 text-5xl">
                👤
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                setFoto(file);

                setPreview(
                  URL.createObjectURL(file)
                );
              }}
              className="
                block
                w-full
                text-sm
                text-slate-300
                file:mr-4
                file:rounded-lg
                file:border-0
                file:bg-blue-600
                file:px-4
                file:py-2
                file:text-white
                file:hover:bg-blue-700
              "
            />
          </div>

          {/* NAMA */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Nama Lengkap
            </label>

            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="
                w-full
                rounded-xl
                bg-slate-800
                p-3
                text-white
                outline-none
                ring-1
                ring-slate-700
                transition
                focus:ring-blue-500
              "
            />
          </div>

          {/* NISN */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              NISN
            </label>

            <input
              value={nisn}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10);

                setNisn(value);
              }}
              inputMode="numeric"
              maxLength={10}
              placeholder="Masukkan 10 digit NISN"
              className="
                w-full
                rounded-xl
                bg-slate-800
                p-3
                text-white
                outline-none
                ring-1
                ring-slate-700
                transition
                focus:ring-blue-500
              "
            />

            <p className="mt-1 text-xs text-slate-500">
              NISN harus terdiri dari 10 digit.
            </p>
          </div>

          {/* NAMA IBU */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Nama Ibu Kandung
            </label>

            <input
              value={namaIbuKandung}
              onChange={(e) =>
                setNamaIbuKandung(e.target.value)
              }
              placeholder="Masukkan nama ibu kandung"
              className="
                w-full
                rounded-xl
                bg-slate-800
                p-3
                text-white
                outline-none
                ring-1
                ring-slate-700
                transition
                focus:ring-blue-500
              "
            />
          </div>

          {/* SEKOLAH SUPER ADMIN */}
          {role === "super_admin" ? (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Sekolah
              </label>

              <select
                value={sekolahIdForm ?? ""}
                onChange={(e) =>
                  setSekolahIdForm(
                    e.target.value
                      ? Number(e.target.value)
                      : null
                  )
                }
                className="
                  w-full
                  rounded-xl
                  bg-slate-800
                  p-3
                  text-white
                  outline-none
                  ring-1
                  ring-slate-700
                  transition
                  focus:ring-blue-500
                "
              >
                <option value="">
                  {loadingSekolah
                    ? "Memuat sekolah..."
                    : "Pilih sekolah"}
                </option>

                {sekolahList.map((sekolah) => (
                  <option
                    key={sekolah.id}
                    value={sekolah.id}
                  >
                    {sekolah.nama}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            /* SEKOLAH ADMIN */
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Sekolah
              </label>

              <div
                className="
                  rounded-xl
                  border
                  border-blue-500/20
                  bg-blue-500/5
                  px-4
                  py-3
                "
              >
                <p className="text-sm font-medium text-blue-300">
                  Mengikuti sekolah akun
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Sekolah anggota otomatis mengikuti
                  sekolah akun yang sedang digunakan.
                </p>
              </div>
            </div>
          )}

          {/* JABATAN */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Jabatan
            </label>

            <input
              value={jabatan}
              onChange={(e) =>
                setJabatan(e.target.value)
              }
              placeholder="Contoh: Anggota, Ketua, Sekretaris"
              className="
                w-full
                rounded-xl
                bg-slate-800
                p-3
                text-white
                outline-none
                ring-1
                ring-slate-700
                transition
                focus:ring-blue-500
              "
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="
                w-full
                rounded-xl
                bg-slate-800
                p-3
                text-white
                outline-none
                ring-1
                ring-slate-700
                transition
                focus:ring-blue-500
              "
            >
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>

        </div>

        {/* BUTTON */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              bg-slate-700
              px-5
              py-3
              text-white
              transition
              hover:bg-slate-600
            "
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="
              rounded-xl
              bg-blue-600
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:bg-blue-700
            "
          >
            {editData ? "Update" : "Simpan"}
          </button>
        </div>

      </div>
    </div>
  );
}