"use client";

import PermissionGuard from "@/features/auth/components/PermissionGuard";

import { getKasChart } from "@/lib/Kas/chart";

import KasChart from "@/components/dashboard/KasChart";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import Toolbar from "@/components/kas/Toolbar";
import DataTable from "@/components/ui/DataTable";
import KasModal from "@/components/kas/KasModal";
import { kasColumns } from "@/components/kas/columns";

import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Receipt,
} from "lucide-react";

import { Kas } from "@/lib/Kas/types";
import { getKas } from "@/lib/Kas/queries";
import {
  tambahKas,
  updateKas,
  hapusKas,
} from "@/lib/Kas/action";

export default function KasPage() {
  const [kas, setKas] = useState<Kas[]>([]);
  const [search, setSearch] = useState("");
  const [bulan, setBulan] = useState("Semua");
  const [tahun, setTahun] = useState("Semua");
  const [chartData, setChartData] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<Kas | null>(null);

  const loadKas = async () => {
  const { data } = await getKas();

      if (data) {
        setKas(data);
      }

      const chart = await getKasChart();

      setChartData(chart.data);
    };

      const simpanKas = async (data: Omit<Kas, "id"> | Kas) => {
      if (editData) {
        await updateKas(editData.id, data);
      } else {
        await tambahKas(data as Omit<Kas, "id">);
      }

      await loadKas();

      setOpenModal(false);
      setEditData(null);
    };

  const deleteKas = async (id: number) => {
    const { error } = await hapusKas(id);

    if (error) throw error;

    await loadKas();
  };

  const filteredData = kas.filter((item) =>
    item.keterangan.toLowerCase().includes(search.toLowerCase()) ||
    item.kategori.toLowerCase().includes(search.toLowerCase())
  );

  const daftarTahun = [
    "Semua",
    ...new Set(
      kas.map((item) =>
        new Date(item.tanggal).getFullYear().toString()
      )
    ),
  ];

  const columns = kasColumns({
    setEditData,
    setOpenModal,
    deleteKas,
  });

  const pemasukan = filteredData
  .filter((k) => k.jenis === "Masuk")
  .reduce((a, b) => a + b.nominal, 0);

  const pengeluaran = filteredData
  .filter((k) => k.jenis === "Keluar")
  .reduce((a, b) => a + b.nominal, 0);

  const saldo = pemasukan - pengeluaran;

    return (
    <PermissionGuard permission="finance.view">
      <DashboardLayout>
        <div className="space-y-6">

          <div>
            <h1 className="text-3xl font-bold text-white">
              Kas PMR
            </h1>

            <p className="mt-2 text-slate-400">
              Kelola seluruh transaksi kas organisasi.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Saldo"
              value={`Rp ${saldo.toLocaleString("id-ID")}`}
              icon={<Wallet size={24} />}
            />

            <StatCard
              title="Pemasukan"
              value={`Rp ${pemasukan.toLocaleString("id-ID")}`}
              icon={<ArrowDownCircle size={24} />}
              color="from-green-500 to-emerald-500"
            />

            <StatCard
              title="Pengeluaran"
              value={`Rp ${pengeluaran.toLocaleString("id-ID")}`}
              icon={<ArrowUpCircle size={24} />}
              color="from-red-500 to-pink-500"
            />

            <StatCard
              title="Transaksi"
              value={kas.length}
              icon={<Receipt size={24} />}
              color="from-violet-500 to-indigo-500"
            />

          </div>

          <KasChart
            data={chartData}
          />

          <Toolbar
            search={search}
            setSearch={setSearch}
            onTambah={() => {
              setEditData(null);
              setOpenModal(true);
            }}
          />

          <div className="flex flex-wrap gap-3">

            <select
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"
            >
              <option value="Semua">
                Semua Bulan
              </option>

              <option value="1">Januari</option>
              <option value="2">Februari</option>
              <option value="3">Maret</option>
              <option value="4">April</option>
              <option value="5">Mei</option>
              <option value="6">Juni</option>
              <option value="7">Juli</option>
              <option value="8">Agustus</option>
              <option value="9">September</option>
              <option value="10">Oktober</option>
              <option value="11">November</option>
              <option value="12">Desember</option>
            </select>

            <select
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"
            >
              {daftarTahun.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

          </div>

          <DataTable
            data={filteredData}
            columns={columns}
          />

          <KasModal
            open={openModal}
            editData={editData}
            onClose={() => {
              setOpenModal(false);
              setEditData(null);
            }}
            onSave={simpanKas}
          />

        </div>
      </DashboardLayout>
    </PermissionGuard>
  );
}