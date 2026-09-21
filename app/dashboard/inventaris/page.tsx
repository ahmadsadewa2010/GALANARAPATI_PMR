"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import Toolbar from "@/components/inventaris/Toolbar";
import DataTable from "@/components/ui/DataTable";
import InventarisModal from "@/components/inventaris/InventarisModal";
import { inventarisColumns } from "@/components/inventaris/columns";

import {
  Package,
  Boxes,
  Wrench,
  MapPin,
} from "lucide-react";

import {
  Inventaris,
  InventarisFormData,
} from "@/lib/inventaris/types";

import {
  getInventaris,
} from "@/lib/inventaris/queris";

import {
  tambahInventaris,
  updateInventaris,
  hapusInventaris,
} from "@/lib/inventaris/action";

import { supabase } from "@/lib/supabase";

type UserRole =
  | "super_admin"
  | "admin_sekolah"
  | "anggota";

interface SekolahOption {
  id: number;
  nama: string;
}

export default function InventarisPage() {
  const [barang, setBarang] =
    useState<Inventaris[]>([]);

  const [search, setSearch] =
    useState("");

  const [kategori, setKategori] =
    useState("Semua");

  const [kondisi, setKondisi] =
    useState("Semua");

  const [kepemilikan, setKepemilikan] =
    useState("Semua");

  const [sekolahFilter, setSekolahFilter] =
    useState("Semua");

  const [sekolahList, setSekolahList] =
    useState<SekolahOption[]>([]);

  const [role, setRole] =
    useState<UserRole | null>(null);

  const [sekolahId, setSekolahId] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [openModal, setOpenModal] =
    useState(false);

  const [editData, setEditData] =
    useState<Inventaris | null>(null);

  // =====================================================
  // LOAD PROFILE
  // =====================================================

  async function loadProfile() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      throw userError;
    }

    if (!user) {
      throw new Error("User belum login.");
    }

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select("role, sekolah_id")
      .eq("id", user.id)
      .single();

    if (profileError) {
      throw profileError;
    }

    const currentRole =
      profile.role as UserRole;

    setRole(currentRole);

    setSekolahId(
      profile.sekolah_id ?? null
    );

    console.log(
      "INVENTARIS ROLE:",
      currentRole
    );

    console.log(
      "INVENTARIS SEKOLAH:",
      profile.sekolah_id
    );

    // Hanya super admin yang butuh
    // daftar semua sekolah.
    if (
      currentRole === "super_admin"
    ) {
      const {
        data: sekolah,
        error,
      } = await supabase
        .from("sekolah")
        .select("id, nama")
        .order("nama");

      if (error) {
        throw error;
      }

      setSekolahList(
        (sekolah ?? []) as SekolahOption[]
      );
    }

    // Admin sekolah juga perlu
    // nama sekolahnya untuk modal.
    if (
      currentRole === "admin_sekolah" &&
      profile.sekolah_id
    ) {
      const {
        data: sekolah,
        error,
      } = await supabase
        .from("sekolah")
        .select("id, nama")
        .eq(
          "id",
          profile.sekolah_id
        )
        .single();

      if (error) {
        throw error;
      }

      if (sekolah) {
        setSekolahList([
          {
            id: sekolah.id,
            nama: sekolah.nama,
          },
        ]);
      }
    }
  }

  // =====================================================
  // LOAD DATA
  // =====================================================

  async function loadData() {
    try {
      setLoading(true);
      setErrorMessage("");

      const {
        data,
        error,
      } = await getInventaris();

      if (error) {
        throw error;
      }

      setBarang(
        (data ?? []) as Inventaris[]
      );
    } catch (error) {
      console.error(
        "INVENTARIS ERROR:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data inventaris."
      );
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    async function initialize() {
      try {
        setLoading(true);

        await loadProfile();
        await loadData();
      } catch (error) {
        console.error(
          "INITIAL INVENTARIS ERROR:",
          error
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Gagal memuat inventaris."
        );

        setLoading(false);
      }
    }

    initialize();
  }, []);

  // =====================================================
  // SAVE
  // =====================================================

  async function simpan(
    data: InventarisFormData
  ) {
    try {
      if (editData) {
        const result =
          await updateInventaris(
            editData.id,
            data
          );

        if (result.error) {
          throw result.error;
        }
      } else {
        const result =
          await tambahInventaris(
            data
          );

        if (result.error) {
          throw result.error;
        }
      }

      await loadData();

      setEditData(null);
      setOpenModal(false);

      alert(
        editData
          ? "Inventaris berhasil diperbarui."
          : "Inventaris berhasil ditambahkan."
      );
    } catch (error) {
      console.error(
        "SAVE INVENTARIS ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Gagal menyimpan inventaris."
      );
    }
  }

  // =====================================================
  // DELETE
  // =====================================================

  async function hapus(id: number) {
    const result =
      await hapusInventaris(id);

    if (result.error) {
      throw result.error;
    }

    await loadData();
  }

  // =====================================================
  // FILTER
  // =====================================================

  const filtered = useMemo(() => {
    return barang.filter((item) => {
      const cocokNama =
        item.nama
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const cocokKategori =
        kategori === "Semua"
          ? true
          : item.kategori === kategori;

      const cocokKondisi =
        kondisi === "Semua"
          ? true
          : item.kondisi === kondisi;

      const cocokKepemilikan =
        kepemilikan === "Semua"
          ? true
          : item.kepemilikan ===
            kepemilikan;

      const cocokSekolah =
        role !== "super_admin" ||
        sekolahFilter === "Semua"
          ? true
          : item.sekolah_id ===
            Number(sekolahFilter);

      return (
        cocokNama &&
        cocokKategori &&
        cocokKondisi &&
        cocokKepemilikan &&
        cocokSekolah
      );
    });
  }, [
    barang,
    search,
    kategori,
    kondisi,
    kepemilikan,
    sekolahFilter,
    role,
  ]);

  // =====================================================
  // STATISTIK
  // =====================================================

  const totalBarang =
    filtered.reduce(
      (total, item) =>
        total + item.jumlah,
      0
    );

  const totalNilai =
    filtered.reduce(
      (total, item) =>
        total +
        item.harga * item.jumlah,
      0
    );

  const barangRusak =
    filtered.filter(
      (item) =>
        item.kondisi === "Rusak"
    ).length;

  const totalLokasi =
    new Set(
      filtered.map(
        (item) => item.lokasi
      )
    ).size;

  // =====================================================
  // ACCESS
  // =====================================================

  const canManage =
    role === "super_admin" ||
    role === "admin_sekolah";

  // =====================================================
  // COLUMNS
  // =====================================================

  const columns =
    inventarisColumns({
      setEditData,
      setOpenModal,
      deleteInventaris: hapus,
      canManage,
    });

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* HEADER */}

        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
            MODUL INVENTARIS
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Inventaris PMR
          </h1>

          <p className="mt-2 text-slate-400">
            Kelola aset milik induk dan
            masing-masing sekolah.
          </p>
        </div>

        {/* ERROR */}

        {errorMessage && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        {/* STATISTIK */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Barang"
            value={totalBarang}
            icon={
              <Package size={24} />
            }
          />

          <StatCard
            title="Nilai Aset"
            value={`Rp ${totalNilai.toLocaleString(
              "id-ID"
            )}`}
            icon={
              <Boxes size={24} />
            }
            color="from-green-500 to-emerald-500"
          />

          <StatCard
            title="Barang Rusak"
            value={barangRusak}
            icon={
              <Wrench size={24} />
            }
            color="from-red-500 to-pink-500"
          />

          <StatCard
            title="Lokasi"
            value={totalLokasi}
            icon={
              <MapPin size={24} />
            }
            color="from-violet-500 to-indigo-500"
          />

        </div>

        {/* TOOLBAR */}

        <Toolbar
          search={search}
          setSearch={setSearch}

          kategori={kategori}
          setKategori={setKategori}

          kondisi={kondisi}
          setKondisi={setKondisi}

          kepemilikan={kepemilikan}
          setKepemilikan={setKepemilikan}

          sekolahFilter={sekolahFilter}
          setSekolahFilter={
            setSekolahFilter
          }

          sekolahList={sekolahList}

          showSchoolFilter={
            role === "super_admin"
          }

          canManage={canManage}

          onTambah={() => {
            setEditData(null);
            setOpenModal(true);
          }}
        />

        {/* TABLE */}

        <DataTable
          data={filtered}
          columns={columns}
        />

        {/* MODAL */}

        <InventarisModal
          open={openModal}
          editData={editData}
          onClose={() => {
            setOpenModal(false);
            setEditData(null);
          }}
          onSave={simpan}
          role={role}
          sekolahId={sekolahId}
          sekolahList={sekolahList}
        />

      </div>
    </DashboardLayout>
  );
}