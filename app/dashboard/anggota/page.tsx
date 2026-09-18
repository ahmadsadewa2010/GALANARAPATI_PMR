"use client";

import PermissionGuard from "@/features/auth/components/PermissionGuard";

import { uploadFoto } from "@/lib/storage/anggota";

import {
  Users,
  UserCheck,
  UserX,
  School,
} from "lucide-react";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Toolbar from "@/components/anggota/Toolbar";
import DataTable from "@/components/ui/DataTable";
import StatCard from "@/components/dashboard/StatCard";
import AnggotaModal from "@/components/anggota/AnggotaModal";
import { anggotaColumns } from "@/components/anggota/columns";

import {
  getAnggota,
} from "@/lib/anggota/queries";

import {
  tambahAnggota,
  updateAnggota,
  hapusAnggota,
} from "@/lib/anggota/actions";

import { Anggota } from "@/lib/anggota/types";

import { supabase } from "@/lib/supabase";

export default function AnggotaPage() {
  const [anggota, setAnggota] = useState<Anggota[]>([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<Anggota | null>(null);

  const [sekolahId, setSekolahId] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD PROFILE LOGIN
  // =====================================================

  const loadProfile = async () => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      throw authError;
    }

    if (!user) {
      throw new Error("User belum login.");
    }

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select("id, role, sekolah_id")
      .eq("id", user.id)
      .single();

    if (profileError) {
      throw profileError;
    }

    setRole(profile.role);
    setSekolahId(profile.sekolah_id ?? null);

    return profile;
  };

  // =====================================================
  // LOAD ANGGOTA
  // =====================================================

  const loadAnggota = async () => {
    try {
      setLoading(true);

      const profile = await loadProfile();

      /*
       * Super admin:
       * boleh melihat semua sekolah.
       *
       * Admin sekolah / anggota:
       * hanya sekolah miliknya.
       */

      const { data, error } = await getAnggota(
        profile.role === "super_admin"
          ? null
          : profile.sekolah_id
      );

      if (error) {
        throw error;
      }

      if (data) {
        setAnggota(data);
      } else {
        setAnggota([]);
      }

    } catch (error) {
      console.error(
        "LOAD ANGGOTA ERROR:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text:
          error instanceof Error
            ? error.message
            : "Gagal mengambil data anggota.",
        background: "#0f172a",
        color: "#fff",
      });

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnggota();
  }, []);

  // =====================================================
  // SIMPAN ANGGOTA
  // =====================================================

  const simpanAnggota = async (data: any) => {
  try {
    if (!role) {
      throw new Error("Profil pengguna belum dimuat.");
    }

    // =====================================================
    // TENTUKAN SEKOLAH
    // =====================================================

    let targetSekolahId: number | null = null;

    if (role === "super_admin") {
      targetSekolahId =
        data.sekolah_id ??
        editData?.sekolah_id ??
        null;
    } else {
      targetSekolahId = sekolahId;
    }

    if (!targetSekolahId) {
      throw new Error(
        "Sekolah anggota belum ditentukan."
      );
    }

    // =====================================================
    // VALIDASI SEKOLAH
    // =====================================================

    const {
      data: sekolahData,
      error: sekolahError,
    } = await supabase
      .from("sekolah")
      .select("id, nama")
      .eq("id", targetSekolahId)
      .maybeSingle();

    if (sekolahError) {
      throw sekolahError;
    }

    if (!sekolahData) {
      throw new Error(
        `Sekolah dengan ID ${targetSekolahId} tidak ditemukan.`
      );
    }

    // =====================================================
    // VALIDASI DATA
    // =====================================================

    if (!data.nama?.trim()) {
      throw new Error(
        "Nama lengkap harus diisi."
      );
    }

    if (!data.nisn?.trim()) {
      throw new Error(
        "NISN harus diisi."
      );
    }

    if (data.nisn.trim().length !== 10) {
      throw new Error(
        "NISN harus terdiri dari 10 digit."
      );
    }

    if (!data.nama_ibu_kandung?.trim()) {
      throw new Error(
        "Nama ibu kandung harus diisi."
      );
    }

    if (!data.jabatan?.trim()) {
      throw new Error(
        "Jabatan harus diisi."
      );
    }

    // =====================================================
    // FOTO
    // =====================================================

    let foto = editData?.foto ?? null;

    if (data.foto instanceof File) {
      foto = await uploadFoto(data.foto);
    }

    // =====================================================
    // PAYLOAD
    // =====================================================

    const payload = {
      nama: data.nama.trim(),

      nisn: data.nisn.trim(),

      nama_ibu_kandung:
        data.nama_ibu_kandung.trim(),

      sekolah_id: targetSekolahId,

      // Kolom sekolah masih NOT NULL
      sekolah: sekolahData.nama,

      jabatan: data.jabatan.trim(),

      status:
        data.status ??
        editData?.status ??
        "Aktif",

      foto,
    };

    console.log(
      "SAVE ANGGOTA PAYLOAD:",
      payload
    );

    // =====================================================
    // UPDATE
    // =====================================================

    if (editData) {
      const { error } =
        await updateAnggota(
          editData.id,
          payload
        );

      if (error) {
        throw error;
      }
    }

    // =====================================================
    // INSERT
    // =====================================================

    else {
      const { error } =
        await tambahAnggota(
          payload
        );

      if (error) {
        throw error;
      }
    }

    // =====================================================
    // REFRESH
    // =====================================================

    await loadAnggota();

    setOpenModal(false);
    setEditData(null);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: editData
        ? "Data anggota berhasil diperbarui."
        : "Data anggota berhasil ditambahkan.",
      timer: 1500,
      showConfirmButton: false,
      background: "#0f172a",
      color: "#fff",
    });

  } catch (error) {
    console.error(
      "SAVE ANGGOTA ERROR:",
      error
    );

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text:
        error instanceof Error
          ? error.message
          : "Gagal menyimpan data.",
      background: "#0f172a",
      color: "#fff",
    });
  }
};

  const deleteAnggota = async (id: number) => {
    const confirmation = await Swal.fire({
      icon: "warning",
      title: "Hapus anggota?",
      text: "Data yang dihapus tidak dapat dikembalikan.",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      background: "#0f172a",
      color: "#fff",
    });

    if (!confirmation.isConfirmed) return;

    try {
      const { error } = await hapusAnggota(id);
      if (error) throw error;

      await loadAnggota();
      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data anggota berhasil dihapus.",
        timer: 1500,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#fff",
      });
    } catch (error) {
      console.error("DELETE ANGGOTA ERROR:", error);
      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text:
          error instanceof Error
            ? error.message
            : "Gagal menghapus data anggota.",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredData =
    anggota.filter((a) =>
      a.nama
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // =====================================================
  // COLUMNS
  // =====================================================

  const columns = anggotaColumns({
    setEditData,
    setOpenModal,
    deleteAnggota,
    loadAnggota,
  });

  // =====================================================
  // STATISTICS
  // =====================================================

  const total = anggota.length;

  const aktif = anggota.filter(
    (a) =>
      a.status === "Aktif"
  ).length;

  const nonaktif = anggota.filter(
    (a) =>
      a.status === "Nonaktif"
  ).length;

  const jumlahSekolah =
    new Set(
      anggota.map(
        (a) => a.sekolah_id
      )
    ).size;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <PermissionGuard permission="members.view">
      <DashboardLayout>

        <div className="space-y-6">

          {/* HEADER */}

          <div>
            <p className="text-sm font-medium text-cyan-400">
              MODUL ANGGOTA
            </p>

            <h1 className="mt-1 text-3xl font-bold text-white">
              Data Anggota
            </h1>

            <p className="mt-2 text-slate-400">
              Kelola data anggota PMR
              sesuai sekolah.
            </p>
          </div>

          {/* STATISTIK */}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Total Anggota"
              value={
                loading
                  ? 0
                  : total
              }
              icon={
                <Users size={24} />
              }
            />

            <StatCard
              title="Aktif"
              value={
                loading
                  ? 0
                  : aktif
              }
              icon={
                <UserCheck
                  size={24}
                />
              }
              color="from-green-500 to-emerald-500"
            />

            <StatCard
              title="Nonaktif"
              value={
                loading
                  ? 0
                  : nonaktif
              }
              icon={
                <UserX
                  size={24}
                />
              }
              color="from-red-500 to-pink-500"
            />

            <StatCard
              title="Sekolah"
              value={
                loading
                  ? 0
                  : jumlahSekolah
              }
              icon={
                <School
                  size={24}
                />
              }
              color="from-violet-500 to-indigo-500"
            />

          </div>

          {/* TOOLBAR */}

          <Toolbar
            search={search}
            setSearch={setSearch}
            onTambah={() => {
              setEditData(null);
              setOpenModal(true);
            }}
          />

          {/* TABLE */}

          <DataTable
            data={filteredData}
            columns={columns}
          />

          {/* MODAL */}

          <AnggotaModal
          open={openModal}
          editData={editData}
          onSave={simpanAnggota}
          onClose={() => {
            setOpenModal(false);
            setEditData(null);
          }}
          role={
            role as
              | "super_admin"
              | "admin_sekolah"
              | "anggota"
              | null
          }
          sekolahId={sekolahId}
        />

        </div>

      </DashboardLayout>
    </PermissionGuard>
  );
}