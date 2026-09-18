"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
  X,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import EventModal, {
  EventData,
} from "@/components/event/EventModal";

import { supabase } from "@/lib/supabase";

export default function EventPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);

  const [error, setError] = useState("");

  // =====================================================
  // LOAD EVENT
  // =====================================================

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("event")
        .select("*")
        .order("tanggal", { ascending: true })
        .order("waktu_mulai", { ascending: true });

      if (error) {
        console.error("LOAD EVENT ERROR:", error);
        throw error;
      }

      setEvents((data || []) as EventData[]);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Gagal mengambil data event.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredEvents = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return events.filter((event) => {
      const matchesSearch =
        !keyword ||
        event.nama?.toLowerCase().includes(keyword) ||
        event.deskripsi?.toLowerCase().includes(keyword) ||
        event.lokasi?.toLowerCase().includes(keyword) ||
        event.penanggung_jawab?.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "Semua" ||
        event.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [events, search, statusFilter]);

  // =====================================================
  // ADD / EDIT
  // =====================================================

  const saveEvent = async (form: EventData) => {
    try {
      setSaving(true);

      const payload = {
        nama: form.nama,
        deskripsi: form.deskripsi || null,
        tanggal: form.tanggal,
        waktu_mulai: form.waktu_mulai || null,
        waktu_selesai: form.waktu_selesai || null,
        lokasi: form.lokasi || null,
        penanggung_jawab: form.penanggung_jawab || null,
        jenis: form.jenis || null,
        status: form.status || null,
        banner: form.banner || null,
      };

      if (form.id) {
        const { error } = await supabase
          .from("event")
          .update(payload)
          .eq("id", form.id);

        if (error) {
          console.error("UPDATE EVENT ERROR:", error);
          throw error;
        }
      } else {
        const { error } = await supabase
          .from("event")
          .insert(payload);

        if (error) {
          console.error("INSERT EVENT ERROR:", error);
          throw error;
        }
      }

      setModalOpen(false);
      setEditingEvent(null);

      await loadEvents();

    } catch (err: any) {
      console.error("SAVE EVENT ERROR:", err);

      alert(
        `Gagal menyimpan event.\n\n${
          err?.message || "Terjadi kesalahan."
        }`
      );

      throw err;
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const deleteEvent = async (id?: number) => {
    if (!id) return;

    const confirmed = window.confirm(
      "Yakin ingin menghapus event ini?"
    );

    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from("event")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("DELETE EVENT ERROR:", error);
        throw error;
      }

      await loadEvents();

    } catch (err: any) {
      console.error(err);

      alert(
        `Gagal menghapus event.\n\n${
          err?.message || "Terjadi kesalahan."
        }`
      );
    }
  };

  // =====================================================
  // FORMAT
  // =====================================================

  const formatDate = (date?: string) => {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "id-ID",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatTime = (time?: string) => {
    if (!time) return "-";

    return time.slice(0, 5);
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const statusClass = (status?: string) => {
    switch (status) {
      case "Berlangsung":
        return "bg-blue-500/15 text-blue-300 border-blue-400/20";

      case "Selesai":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-400/20";

      case "Dibatalkan":
        return "bg-red-500/15 text-red-300 border-red-400/20";

      default:
        return "bg-amber-500/15 text-amber-300 border-amber-400/20";
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#030b16] p-5 text-white md:p-7">

        {/* HEADER */}
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
              MANAJEMEN KEGIATAN
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Event PMR
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Kelola seluruh agenda dan kegiatan PMR.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingEvent(null);
              setModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-bold shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
          >
            <Plus size={18} />
            Tambah Event
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <X size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* STAT */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
              <CalendarDays size={20} />
            </div>

            <p className="text-sm text-slate-400">
              Total Event
            </p>

            <p className="mt-1 text-2xl font-bold">
              {events.length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <Clock size={20} />
            </div>

            <p className="text-sm text-slate-400">
              Berlangsung
            </p>

            <p className="mt-1 text-2xl font-bold">
              {events.filter((e) => e.status === "Berlangsung").length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <CalendarDays size={20} />
            </div>

            <p className="text-sm text-slate-400">
              Selesai
            </p>

            <p className="mt-1 text-2xl font-bold">
              {events.filter((e) => e.status === "Selesai").length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400">
              <Users size={20} />
            </div>

            <p className="text-sm text-slate-400">
              Ditampilkan
            </p>

            <p className="mt-1 text-2xl font-bold">
              {filteredEvents.length}
            </p>
          </div>
        </div>

        {/* FILTER */}
        <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.035] p-4 md:flex-row">

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari event, lokasi, PJ..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl border border-white/10 bg-[#0b1728] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"
          >
            <option>Semua</option>
            <option>Rencana</option>
            <option>Berlangsung</option>
            <option>Selesai</option>
            <option>Dibatalkan</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse">

              <thead>
                <tr className="border-b border-white/10 bg-white/[0.025] text-left">
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Event
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Waktu
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Lokasi
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    PJ
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Jenis
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-20 text-center text-slate-500"
                    >
                      Memuat data event...
                    </td>
                  </tr>
                ) : filteredEvents.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-20 text-center"
                    >
                      <CalendarDays
                        size={40}
                        className="mx-auto mb-3 text-slate-700"
                      />

                      <p className="font-semibold text-slate-300">
                        Belum ada event
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Tambahkan event pertama kamu.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((event) => (
                    <tr
                      key={event.id}
                      className="border-b border-white/5 transition hover:bg-white/[0.025]"
                    >

                      {/* EVENT */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-4">

                          {event.banner ? (
                            <img
                              src={event.banner}
                              alt=""
                              className="h-14 w-20 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-20 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                              <CalendarDays size={22} />
                            </div>
                          )}

                          <div>
                            <p className="font-semibold text-white">
                              {event.nama}
                            </p>

                            <p className="mt-1 max-w-[280px] truncate text-xs text-slate-500">
                              {event.deskripsi || "Tidak ada deskripsi"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* WAKTU */}
                      <td className="px-5 py-5">
                        <p className="text-sm font-medium text-slate-200">
                          {formatDate(event.tanggal)}
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <Clock size={13} />

                          {formatTime(event.waktu_mulai)}
                          {" - "}
                          {formatTime(event.waktu_selesai)}
                        </p>
                      </td>

                      {/* LOKASI */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <MapPin
                            size={15}
                            className="text-cyan-400"
                          />

                          <span>
                            {event.lokasi || "-"}
                          </span>
                        </div>
                      </td>

                      {/* PJ */}
                      <td className="px-5 py-5">
                        <span className="text-sm text-slate-300">
                          {event.penanggung_jawab || "-"}
                        </span>
                      </td>

                      {/* JENIS */}
                      <td className="px-5 py-5">
                        <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
                          {event.jenis || "-"}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-5">
                        <span
                          className={`rounded-xl border px-3 py-1.5 text-xs font-semibold ${statusClass(
                            event.status
                          )}`}
                        >
                          {event.status || "-"}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="px-5 py-5">
                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() => {
                              setEditingEvent(event);
                              setModalOpen(true);
                            }}
                            className="rounded-xl border border-white/10 p-2.5 text-slate-400 transition hover:bg-cyan-500/10 hover:text-cyan-400"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => deleteEvent(event.id)}
                            className="rounded-xl border border-white/10 p-2.5 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                            title="Hapus"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL */}
        <EventModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingEvent(null);
          }}
          onSubmit={saveEvent}
          initialData={editingEvent}
        />

      </div>
    </DashboardLayout>
  );
}