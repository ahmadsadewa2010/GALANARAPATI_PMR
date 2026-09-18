"use client";

import { useEffect, useState } from "react";
import { X, CalendarDays, Clock, MapPin, User, Image as ImageIcon } from "lucide-react";

export type EventData = {
  id?: number;
  nama: string;
  deskripsi: string;
  tanggal: string;
  waktu_mulai: string;
  waktu_selesai: string;
  lokasi: string;
  penanggung_jawab: string;
  jenis: string;
  status: string;
  banner: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EventData) => Promise<void>;
  initialData?: EventData | null;
};

const emptyForm: EventData = {
  nama: "",
  deskripsi: "",
  tanggal: "",
  waktu_mulai: "",
  waktu_selesai: "",
  lokasi: "",
  penanggung_jawab: "",
  jenis: "Kegiatan",
  status: "Rencana",
  banner: "",
};

export default function EventModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState<EventData>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(emptyForm);
    }
  }, [initialData, open]);

  if (!open) return null;

  const update = (key: keyof EventData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nama.trim()) {
      alert("Nama event wajib diisi.");
      return;
    }

    if (!form.tanggal) {
      alert("Tanggal event wajib diisi.");
      return;
    }

    try {
      setSaving(true);
      await onSubmit(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#07111f] shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              EVENT MANAGEMENT
            </p>

            <h2 className="mt-1 text-xl font-bold text-white">
              {initialData ? "Edit Event" : "Tambah Event"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Kelola kegiatan PMR dari satu tempat.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={submit}
          className="max-h-[75vh] overflow-y-auto px-6 py-6"
        >
          <div className="grid gap-5 md:grid-cols-2">

            {/* NAMA */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Nama Event
              </label>

              <input
                value={form.nama}
                onChange={(e) => update("nama", e.target.value)}
                placeholder="Contoh: Latihan Gabungan PMR"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:bg-white/[0.07]"
              />
            </div>

            {/* DESKRIPSI */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Deskripsi
              </label>

              <textarea
                value={form.deskripsi}
                onChange={(e) => update("deskripsi", e.target.value)}
                rows={4}
                placeholder="Deskripsi singkat kegiatan..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60"
              />
            </div>

            {/* TANGGAL */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <CalendarDays size={15} />
                Tanggal
              </label>

              <input
                type="date"
                value={form.tanggal}
                onChange={(e) => update("tanggal", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400/60"
              />
            </div>

            {/* JENIS */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Jenis Event
              </label>

              <select
                value={form.jenis}
                onChange={(e) => update("jenis", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#0c1a2c] px-4 py-3 text-white outline-none focus:border-cyan-400/60"
              >
                <option>Kegiatan</option>
                <option>Latihan</option>
                <option>Diklat</option>
                <option>Rapat</option>
                <option>Lomba</option>
                <option>Jumbara</option>
                <option>Lainnya</option>
              </select>
            </div>

            {/* MULAI */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <Clock size={15} />
                Waktu Mulai
              </label>

              <input
                type="time"
                value={form.waktu_mulai}
                onChange={(e) => update("waktu_mulai", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400/60"
              />
            </div>

            {/* SELESAI */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <Clock size={15} />
                Waktu Selesai
              </label>

              <input
                type="time"
                value={form.waktu_selesai}
                onChange={(e) => update("waktu_selesai", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400/60"
              />
            </div>

            {/* LOKASI */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <MapPin size={15} />
                Lokasi
              </label>

              <input
                value={form.lokasi}
                onChange={(e) => update("lokasi", e.target.value)}
                placeholder="Contoh: Aula SMA Pancasila"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/60"
              />
            </div>

            {/* PJ */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <User size={15} />
                Penanggung Jawab
              </label>

              <input
                value={form.penanggung_jawab}
                onChange={(e) =>
                  update("penanggung_jawab", e.target.value)
                }
                placeholder="Nama penanggung jawab"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/60"
              />
            </div>

            {/* STATUS */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#0c1a2c] px-4 py-3 text-white outline-none focus:border-cyan-400/60"
              >
                <option>Rencana</option>
                <option>Berlangsung</option>
                <option>Selesai</option>
                <option>Dibatalkan</option>
              </select>
            </div>

            {/* BANNER */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <ImageIcon size={15} />
                URL Banner
              </label>

              <input
                value={form.banner}
                onChange={(e) => update("banner", e.target.value)}
                placeholder="https://..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/60"
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="mt-7 flex justify-end gap-3 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Menyimpan..."
                : initialData
                ? "Simpan Perubahan"
                : "Simpan Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}