"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  School,
  MapPin,
  Phone,
  Mail,
  UserRound,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import SekolahModal from "@/components/sekolah/SekolahModal";

import { useAuth } from "@/features/auth/AuthProvider";

import {
  getSekolah,
} from "@/lib/sekolah/queries";

import {
  tambahSekolah,
  updateSekolah,
  hapusSekolah,
} from "@/lib/sekolah/actions";

import { Sekolah } from "@/lib/sekolah/types";

export default function SekolahPage() {
  const {
    profile,
    loading: authLoading,
  } = useAuth();

  const [sekolah, setSekolah] =
    useState<Sekolah[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [openModal, setOpenModal] =
    useState(false);

  const [editData, setEditData] =
    useState<Sekolah | null>(null);

  /*
   * ==========================================
   * LOAD
   * ==========================================
   */

  const loadSekolah = async () => {
    try {
      setLoading(true);

      /*
       * SUPER ADMIN
       * melihat semua sekolah
       */

      const targetId =
        profile?.role === "super_admin"
          ? null
          : profile?.sekolah_id;

      const {
        data,
        error,
      } = await getSekolah(
        targetId
      );

      if (error) {
        throw error;
      }

      setSekolah(data);

    } catch (error) {
      console.error(
        "GET SEKOLAH ERROR:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengambil data sekolah.",
        background: "#0f172a",
        color: "#fff",
      });

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      authLoading ||
      !profile
    ) {
      return;
    }

    loadSekolah();
  }, [
    authLoading,
    profile,
  ]);

  /*
   * ==========================================
   * SAVE
   * ==========================================
   */

  const simpanSekolah = async (
    data: {
      nama: string;
      npsn: string;
      alamat: string;
      email: string;
      kontak: string;
      pembina: string;
      logo: string
    }
  ) => {
    try {

      if (editData) {

        const {
          error,
        } = await updateSekolah(
          editData.id,
          data
        );

        if (error) {
          throw error;
        }

      } else {

        const {
          error,
        } = await tambahSekolah(
          data
        );

        if (error) {
          throw error;
        }
      }

      await loadSekolah();

      setOpenModal(false);
      setEditData(null);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: editData
          ? "Data sekolah berhasil diperbarui."
          : "Data sekolah berhasil ditambahkan.",
        timer: 1500,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#fff",
      });

    } catch (error) {

      console.error(
        "SAVE SEKOLAH ERROR:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Data sekolah gagal disimpan.",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  /*
   * ==========================================
   * DELETE
   * ==========================================
   */

  const deleteSekolah = async (
    id: number
  ) => {

    const confirm =
      await Swal.fire({
        icon: "warning",
        title: "Hapus sekolah?",
        text: "Data sekolah akan dihapus.",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal",
        background: "#0f172a",
        color: "#fff",
      });

    if (!confirm.isConfirmed) {
      return;
    }

    try {

      const {
        error,
      } = await hapusSekolah(id);

      if (error) {
        throw error;
      }

      await loadSekolah();

      Swal.fire({
        icon: "success",
        title: "Terhapus",
        text: "Data sekolah berhasil dihapus.",
        timer: 1200,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#fff",
      });

    } catch (error) {

      console.error(
        "DELETE SEKOLAH ERROR:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Data sekolah gagal dihapus.",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  /*
   * ==========================================
   * AUTH LOADING
   * ==========================================
   */

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-slate-400">
            Memuat data sekolah...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  /*
   * ==========================================
   * STAT
   * ==========================================
   */

  const totalSekolah =
    sekolah.length;

  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (
    <DashboardLayout>

      <div className="space-y-6">

        {/* HEADER */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-sm font-medium text-blue-400">
              PANEL SEKOLAH
            </p>

            <h1 className="mt-1 text-3xl font-bold text-white">
              Data Sekolah
            </h1>

            <p className="mt-2 text-slate-400">
              Kelola data sekolah yang terhubung
              dengan sistem PMR.
            </p>

          </div>

          {profile?.role === "super_admin" && (
            <button
              onClick={() => {
                setEditData(null);
                setOpenModal(true);
              }}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-blue-500
              "
            >
              <Plus size={18} />
              Tambah Sekolah
            </button>
          )}

        </div>

        {/* STAT */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Sekolah"
            value={
              loading
                ? "..."
                : totalSekolah
            }
            icon={
              <School size={24} />
            }
          />

          <StatCard
            title="Sekolah Aktif"
            value={
              loading
                ? "..."
                : totalSekolah
            }
            icon={
              <School size={24} />
            }
            color="from-green-500 to-emerald-500"
          />

        </div>

        {/* DATA */}

        <div
          className="
            rounded-3xl
            border border-slate-800
            bg-slate-950/60
            p-6
            backdrop-blur-xl
          "
        >

          <div className="mb-6">

            <h2 className="text-lg font-semibold text-white">
              Daftar Sekolah
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Sekolah yang terdaftar dalam sistem.
            </p>

          </div>

          {loading ? (

            <div className="py-16 text-center">
              <p className="text-sm text-slate-500">
                Memuat data...
              </p>
            </div>

          ) : sekolah.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-800 py-16 text-center">

              <School
                size={40}
                className="mx-auto text-slate-700"
              />

              <p className="mt-4 text-sm text-slate-400">
                Belum ada data sekolah.
              </p>

            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2">

              {sekolah.map((item) => (

                <div
                  key={item.id}
                  className="
                    group
                    rounded-2xl
                    border border-slate-800
                    bg-slate-900/60
                    p-5
                    transition
                    hover:border-blue-500/30
                    hover:bg-slate-900
                  "
                >

                  <div className="flex gap-4">

                    {/* LOGO */}

                    <div
                      className="
                        flex h-16 w-16
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-2xl
                        border border-slate-800
                        bg-blue-500/10
                      "
                    >

                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.nama}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <School
                          size={28}
                          className="text-blue-400"
                        />
                      )}

                    </div>

                    {/* INFO */}

                    <div className="min-w-0 flex-1">

                      <h3 className="truncate text-lg font-semibold text-white">
                        {item.nama}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        ID Sekolah: {item.id}
                      </p>

                    </div>

                  </div>

                  {/* DETAIL */}

                  <div className="mt-5 space-y-3">

                    <div className="flex gap-3 text-sm">

                      <MapPin
                        size={17}
                        className="mt-0.5 shrink-0 text-blue-400"
                      />

                      <span className="text-slate-400">
                        {item.alamat ||
                          "Alamat belum tersedia"}
                      </span>

                    </div>

                    <div className="flex gap-3 text-sm">

                      <Phone
                        size={17}
                        className="shrink-0 text-cyan-400"
                      />

                      <span className="text-slate-400">
                        {item.kontak ||
                          "Kontak belum tersedia"}
                      </span>

                    </div>

                    <div className="flex gap-3 text-sm">
                        <Mail
                          size={17}
                          className="shrink-0 text-blue-400"
                        />

                        <span className="truncate text-slate-400">
                          {item.email ||
                            "Email belum tersedia"}
                        </span>
                      </div>

                    <div className="flex gap-3 text-sm">

                      <UserRound
                        size={17}
                        className="shrink-0 text-violet-400"
                      />

                      <span className="text-slate-400">
                        {item.pembina ||
                          "Pembina belum tersedia"}
                      </span>

                    </div>

                  </div>

                  {/* ACTION */}

                  <div className="mt-5 flex justify-end gap-2 border-t border-slate-800 pt-4">

                    <button
                      onClick={() => {
                        setEditData(item);
                        setOpenModal(true);
                      }}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border border-slate-800
                        px-4 py-2
                        text-sm
                        text-slate-300
                        transition
                        hover:border-blue-500/40
                        hover:bg-blue-500/10
                        hover:text-blue-400
                      "
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    {profile?.role === "super_admin" && (
                      <button
                        onClick={() =>
                          deleteSekolah(item.id)
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          border border-red-500/20
                          px-4 py-2
                          text-sm
                          text-red-400
                          transition
                          hover:bg-red-500/10
                        "
                      >
                        <Trash2 size={16} />
                        Hapus
                      </button>
                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* MODAL */}

        <SekolahModal
          open={openModal}
          editData={editData}
          onClose={() => {
            setOpenModal(false);
            setEditData(null);
          }}
          onSave={simpanSekolah}
        />

      </div>

    </DashboardLayout>
  );
}