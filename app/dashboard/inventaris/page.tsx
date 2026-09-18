"use client";

import { useEffect, useMemo, useState } from "react";

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

import { Inventaris } from "@/lib/inventaris/types";

import { getInventaris } from "@/lib/inventaris/queris";

import {
  tambahInventaris,
  updateInventaris,
  hapusInventaris,
} from "@/lib/inventaris/action";

export default function InventarisPage() {
  const [barang, setBarang] = useState<Inventaris[]>([]);

  const [search, setSearch] = useState("");

  const [kategori, setKategori] = useState("Semua");

  const [kondisi, setKondisi] = useState("Semua");

  const [openModal, setOpenModal] = useState(false);

  const [editData, setEditData] =
    useState<Inventaris | null>(null);

  async function loadData() {
    const { data } = await getInventaris();

    if (data) {
      setBarang(data);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function simpan(data: Inventaris) {
    if (editData) {
      await updateInventaris(editData.id, data);
    } else {
      await tambahInventaris(data);
    }

    await loadData();

    setEditData(null);
    setOpenModal(false);
  }

  async function hapus(id: number) {
    await hapusInventaris(id);
    await loadData();
  }

  const filtered = useMemo(() => {
    return barang.filter((item) => {
      const cocokNama =
        item.nama
          .toLowerCase()
          .includes(search.toLowerCase());

      const cocokKategori =
        kategori === "Semua"
          ? true
          : item.kategori === kategori;

      const cocokKondisi =
        kondisi === "Semua"
          ? true
          : item.kondisi === kondisi;

      return (
        cocokNama &&
        cocokKategori &&
        cocokKondisi
      );
    });
  }, [barang, search, kategori, kondisi]);

  const totalBarang = filtered.reduce(
    (a, b) => a + b.jumlah,
    0
  );

  const totalNilai = filtered.reduce(
    (a, b) => a + b.harga * b.jumlah,
    0
  );

  const barangRusak = filtered.filter(
    (i) => i.kondisi === "Rusak"
  ).length;

  const totalLokasi = new Set(
    filtered.map((i) => i.lokasi)
  ).size;

  const columns = inventarisColumns({
    setEditData,
    setOpenModal,
    deleteInventaris: hapus,
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Inventaris PMR
          </h1>

          <p className="mt-2 text-slate-400">
            Kelola aset dan perlengkapan organisasi.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Barang"
            value={totalBarang}
            icon={<Package size={24} />}
          />

          <StatCard
            title="Nilai Aset"
            value={`Rp ${totalNilai.toLocaleString("id-ID")}`}
            icon={<Boxes size={24} />}
            color="from-green-500 to-emerald-500"
          />

          <StatCard
            title="Barang Rusak"
            value={barangRusak}
            icon={<Wrench size={24} />}
            color="from-red-500 to-pink-500"
          />

          <StatCard
            title="Lokasi"
            value={totalLokasi}
            icon={<MapPin size={24} />}
            color="from-violet-500 to-indigo-500"
          />

        </div>

        <Toolbar
          search={search}
          setSearch={setSearch}
          kategori={kategori}
          setKategori={setKategori}
          kondisi={kondisi}
          setKondisi={setKondisi}
          onTambah={() => {
            setEditData(null);
            setOpenModal(true);
          }}
        />

        <DataTable
          data={filtered}
          columns={columns}
        />

        <InventarisModal
          open={openModal}
          editData={editData}
          onClose={() => {
            setOpenModal(false);
            setEditData(null);
          }}
          onSave={simpan}
        />

      </div>
    </DashboardLayout>
  );
}