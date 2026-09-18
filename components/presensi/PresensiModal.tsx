"use client";

import { useEffect, useState } from "react";
import { X, Save, CalendarCheck } from "lucide-react";

type Anggota = {
  id: string;
  nama: string;
};

export type PresensiFormData = {
  anggota_id: string;
  tanggal: string;
  status: string;
};

type PresensiModalProps = {
  open: boolean;
  editData?: PresensiFormData | null;
  onClose: () => void;
  onSave: (data: PresensiFormData) => Promise<void>;
  anggota: Anggota[];
};

export default function PresensiModal({
  open,
  editData,
  onClose,
  onSave,
  anggota,
}: PresensiModalProps) {
  const [anggotaId, setAnggotaId] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [status, setStatus] = useState("hadir");
  const [saving, setSaving] = useState(false);

  const isEdit = !!editData;

  useEffect(() => {
    if (!open) return;

    if (editData) {
      setAnggotaId(editData.anggota_id);
      setTanggal(editData.tanggal);
      setStatus(editData.status);
    } else {
      setAnggotaId("");
      setTanggal(
        new Date().toISOString().split("T")[0]
      );
      setStatus("hadir");
    }

    setSaving(false);
  }, [open, editData]);

  if (!open) return null;

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!anggotaId) {
      alert("Silakan pilih anggota.");
      return;
    }

    if (!tanggal) {
      alert("Silakan pilih tanggal.");
      return;
    }

    try {
      setSaving(true);

      await onSave({
        anggota_id: anggotaId,
        tanggal,
        status,
      });

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <CalendarCheck size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                {isEdit
                  ? "Edit Presensi"
                  : "Tambah Presensi"}
              </h2>

              <p className="text-xs text-slate-500">
                {isEdit
                  ? "Perbarui data kehadiran"
                  : "Catat kehadiran anggota"}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* ANGGOTA */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Anggota
            </label>

            <select
              value={anggotaId}
              onChange={(e) =>
                setAnggotaId(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"
            >
              <option
                value=""
                className="bg-slate-900"
              >
                Pilih anggota
              </option>

              {anggota.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                  className="bg-slate-900"
                >
                  {item.nama}
                </option>
              ))}
            </select>
          </div>

          {/* TANGGAL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Tanggal
            </label>

            <input
              type="date"
              value={tanggal}
              onChange={(e) =>
                setTanggal(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"
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
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"
            >
              <option value="hadir" className="bg-slate-900">
                Hadir
              </option>

              <option value="izin" className="bg-slate-900">
                Izin
              </option>

              <option value="sakit" className="bg-slate-900">
                Sakit
              </option>

              <option value="alpha" className="bg-slate-900">
                Alpha
              </option>
            </select>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 border-t border-white/10 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 hover:bg-white/5"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-400 disabled:opacity-50"
            >
              <Save size={17} />

              {saving
                ? "Menyimpan..."
                : isEdit
                ? "Simpan Perubahan"
                : "Simpan Presensi"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}