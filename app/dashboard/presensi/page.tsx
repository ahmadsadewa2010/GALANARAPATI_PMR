"use client";

import { useEffect, useState } from "react";

import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Search,
  Users,
  XCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import PresensiModal from "@/components/presensi/PresensiModal";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { supabase } from "@/lib/supabase";

import {
  getPresensi,
  getAnggotaPresensi,
} from "@/lib/presensi";

type Presensi = {
  id: string;
  sekolah_id: string;
  anggota_id: string;
  tanggal: string;
  status: string;
  created_at: string;

  anggota?: {
    id: string;
    nama: string;
  } | null;
};

type PresensiStatus =
  | "Hadir"
  | "Izin"
  | "Sakit"
  | "Alpa";

type PresensiFormData = {
  anggota_id: string;
  tanggal: string;
  status: PresensiStatus;
};

function normalizePresensiStatus(
  status: string
): PresensiStatus {
  const normalized = status
    .trim()
    .toLowerCase();

  switch (normalized) {
    case "hadir":
      return "Hadir";

    case "izin":
      return "Izin";

    case "sakit":
      return "Sakit";

    const tidakHadir =
    presensi.filter(
      (item) =>
        item.status.toLowerCase() ===
        "alpa"
    ).length;

    default:
      throw new Error(
        `Status presensi tidak valid: ${status}`
      );
  }
}

export default function PresensiPage() {
  const [presensi, setPresensi] = useState<Presensi[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editData, setEditData] =
    useState<Presensi | null>(null);

  const [anggota, setAnggota] = useState<
    { id: string; nama: string }[]
  >([]);

  /*
   * ==========================================
   * LOAD DATA
   * ==========================================
   */

  async function loadPresensi() {
    try {
      setLoading(true);
      setErrorMessage("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User belum login.");
      }

      /*
       * Ambil sekolah user
       */

      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("sekolah_id")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      const sekolahId =
        profile?.sekolah_id ?? null;

      if (!sekolahId) {
        throw new Error(
          "User belum memiliki sekolah."
        );
      }

      /*
       * Ambil presensi
       */

      const data =
        await getPresensi(sekolahId);

      setPresensi(data as Presensi[]);

      /*
       * Ambil anggota sekolah
       */

      const anggotaData =
        await getAnggotaPresensi(
          sekolahId
        );

      setAnggota(
        anggotaData.map((item: any) => ({
          id: item.id,
          nama: item.nama,
        }))
      );

    } catch (error) {
      console.error(
        "PRESENSI ERROR:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data presensi."
      );

    } finally {
      setLoading(false);
    }
  }

  /*
   * ==========================================
   * INITIAL LOAD
   * ==========================================
   */

  useEffect(() => {
    loadPresensi();
  }, []);

  /*
   * ==========================================
   * SAVE / UPDATE
   * ==========================================
   */

  async function handleSavePresensi(
    data: PresensiFormData
  ) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error(
          "User belum login."
        );
      }

      const normalizedStatus =
      normalizePresensiStatus(data.status);

      /*
       * Ambil sekolah user
       */

      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("sekolah_id")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      const sekolahId =
        profile?.sekolah_id ?? null;

      if (!sekolahId) {
        throw new Error(
          "User belum memiliki sekolah."
        );
      }

      /*
       * ======================================
       * EDIT
       * ======================================
       */

      if (editData) {
        const {
          error,
        } = await supabase
          .from("presensi")
          .update({
            anggota_id: data.anggota_id,
            tanggal: data.tanggal,
            status: normalizedStatus,
          })
          .eq("id", editData.id)
          .eq(
            "sekolah_id",
            sekolahId
          );

        if (error) {
          throw error;
        }

      }

      /*
       * ======================================
       * TAMBAH
       * ======================================
       */

      else {
        const {
          error,
        } = await supabase
          .from("presensi")
          .insert({
          sekolah_id: sekolahId,
          anggota_id: data.anggota_id,
          tanggal: data.tanggal,
          status: normalizedStatus,
        })

        if (error) {
          throw error;
        }
      }

      /*
       * Reload data
       */

      await loadPresensi();

      /*
       * Reset edit
       */

      setEditData(null);
      setModalOpen(false);

    } catch (error) {
      console.error(
        "SAVE/UPDATE PRESENSI ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Gagal menyimpan presensi."
      );

      throw error;
    }
  }

  /*
   * ==========================================
   * DELETE
   * ==========================================
   */

  async function handleDeletePresensi(
    id: string
  ) {
    const yakin = window.confirm(
      "Yakin ingin menghapus data presensi ini?"
    );

    if (!yakin) {
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error(
          "User belum login."
        );
      }

      /*
       * Ambil sekolah user
       */

      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("sekolah_id")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      const sekolahId =
        profile?.sekolah_id ?? null;

      if (!sekolahId) {
        throw new Error(
          "User belum memiliki sekolah."
        );
      }

      /*
       * DELETE berdasarkan:
       *
       * id
       * +
       * sekolah_id
       */

      const {
        error,
      } = await supabase
        .from("presensi")
        .delete()
        .eq("id", id)
        .eq(
          "sekolah_id",
          sekolahId
        );

      if (error) {
        throw error;
      }

      await loadPresensi();

    } catch (error) {
      console.error(
        "DELETE PRESENSI ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Gagal menghapus presensi."
      );
    }
  }

  /*
   * ==========================================
   * FILTER
   * ==========================================
   */

  const filteredPresensi =
    presensi.filter((item) =>
      item.anggota?.nama
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  /*
   * ==========================================
   * STATISTIK
   * ==========================================
   */

  const total =
    presensi.length;

  const hadir =
    presensi.filter(
      (item) =>
        item.status.toLowerCase() ===
        "hadir"
    ).length;

  const izin =
    presensi.filter(
      (item) =>
        item.status.toLowerCase() ===
        "izin"
    ).length;

  const tidakHadir =
  presensi.filter(
    (item) =>
      item.status.toLowerCase() ===
      "alpa"
  ).length;

  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (
    <DashboardLayout>

      <div className="space-y-6 p-6">

        {/* HEADER */}

        <div>
          <p className="text-sm font-medium text-cyan-400">
            MODUL PRESENSI
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Presensi Anggota
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Kelola dan pantau kehadiran anggota PMR.
          </p>
        </div>

        {/* ERROR */}

        {errorMessage && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        {/* STATISTIK */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Presensi"
            value={total}
            icon={
              <CalendarCheck
                size={22}
              />
            }
          />

          <StatCard
            title="Hadir"
            value={hadir}
            icon={
              <CheckCircle2
                size={22}
              />
            }
          />

          <StatCard
            title="Izin"
            value={izin}
            icon={
              <Clock
                size={22}
              />
            }
          />

          <StatCard
            title="Tidak Hadir"
            value={tidakHadir}
            icon={
              <XCircle
                size={22}
              />
            }
          />

        </div>

        {/* TOOLBAR */}

        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between">

          {/* SEARCH */}

          <div className="relative w-full md:max-w-md">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Cari nama anggota..."
              className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
            />

          </div>

          {/* BUTTON */}

          <div className="flex gap-3">

            <button
              onClick={
                loadPresensi
              }
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
            >
              Refresh
            </button>

            <button
              onClick={() => {
                setEditData(null);
                setModalOpen(true);
              }}
              className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400"
            >
              + Tambah Presensi
            </button>

          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px]">

              <thead>

                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-slate-500">

                  <th className="px-6 py-4">
                    Anggota
                  </th>

                  <th className="px-6 py-4">
                    Tanggal
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Dibuat
                  </th>

                  <th className="px-6 py-4 text-right">
                    Aksi
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      Memuat data presensi...
                    </td>

                  </tr>

                ) : filteredPresensi.length === 0 ? (

                  <tr>

                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      Belum ada data presensi.
                    </td>

                  </tr>

                ) : (

                  filteredPresensi.map(
                    (item) => (

                      <tr
                        key={item.id}
                        className="border-b border-white/5 transition hover:bg-white/[0.03]"
                      >

                        {/* ANGGOTA */}

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">

                              <Users
                                size={18}
                              />

                            </div>

                            <span className="font-medium text-white">

                              {item.anggota?.nama ??
                                "Anggota"}

                            </span>

                          </div>

                        </td>

                        {/* TANGGAL */}

                        <td className="px-6 py-4 text-sm text-slate-300">

                          {item.tanggal}

                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-4">

                          <StatusBadge
                            status={
                              item.status
                            }
                          />

                        </td>

                        {/* CREATED */}

                        <td className="px-6 py-4 text-sm text-slate-500">

                          {new Date(
                            item.created_at
                          ).toLocaleString(
                            "id-ID"
                          )}

                        </td>

                        {/* ACTION */}

                        <td className="px-6 py-4">

                          <div className="flex justify-end gap-2">

                            {/* EDIT */}

                            <button
                              onClick={() => {

                                setEditData(
                                  item
                                );

                                setModalOpen(
                                  true
                                );

                              }}
                              className="flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-semibold text-blue-400 transition hover:bg-blue-500/20"
                            >

                              <Pencil
                                size={14}
                              />

                              Edit

                            </button>

                            {/* DELETE */}

                            <button
                              onClick={() =>
                                handleDeletePresensi(
                                  item.id
                                )
                              }
                              className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
                            >

                              <Trash2
                                size={14}
                              />

                              Hapus

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* MODAL */}

      <PresensiModal
        open={modalOpen}
        editData={
          editData
            ? {
                anggota_id:
                  editData.anggota_id,
                tanggal:
                  editData.tanggal,
                status:
                  editData.status,
              }
            : null
        }
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onSave={
          handleSavePresensi
        }
        anggota={anggota}
      />

    </DashboardLayout>
  );
}

/*
 * ==========================================
 * STATUS BADGE
 * ==========================================
 */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalized =
    status.toLowerCase();

  if (
    normalized ===
    "hadir"
  ) {
    return (
      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
        Hadir
      </span>
    );
  }

  if (
    normalized ===
    "izin"
  ) {
    return (
      <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
        Izin
      </span>
    );
  }

  if (
    normalized ===
    "sakit"
  ) {
    return (
      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
        Sakit
      </span>
    );
  }

  if (
    normalized ===
      "alpha" ||
    normalized ===
      "tidak_hadir"
  ) {
    return (
      <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
        Alpha
      </span>
    );
  }

  return (
    <span className="rounded-full bg-slate-500/10 px-3 py-1 text-xs font-semibold text-slate-400">
      {status}
    </span>
  );
}

/*
 * ==========================================
 * STAT CARD
 * ==========================================
 */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {value}
          </p>

        </div>

        <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
          {icon}
        </div>

      </div>

    </div>
  );
}