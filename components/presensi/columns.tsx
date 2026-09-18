"use client";

import type { Column } from "@/components/ui/DataTable";

export type Presensi = {
  id: string;
  anggota_id: string;
  tanggal: string;
  status: string;

  anggota?: {
    id?: string;
    nama?: string | null;
    sekolah_id?: number | string | null;
  } | null;
};

export const presensiColumns: Column<Presensi>[] = [
  {
    key: "tanggal",
    label: "Tanggal",
    render: (row) =>
      row.tanggal
        ? new Date(
            row.tanggal
          ).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "-",
  },

  {
    key: "anggota",
    label: "Anggota",
    render: (row) =>
      row.anggota?.nama ?? "-",
  },

  {
    key: "status",
    label: "Status",
    render: (row) => {
      const status =
        row.status?.toLowerCase();

      let style =
        "bg-slate-500/10 text-slate-400";

      if (status === "hadir") {
        style =
          "bg-emerald-500/10 text-emerald-400";
      }

      if (status === "izin") {
        style =
          "bg-blue-500/10 text-blue-400";
      }

      if (status === "sakit") {
        style =
          "bg-amber-500/10 text-amber-400";
      }

      if (
        status === "alpa" ||
        status === "alpha"
      ) {
        style =
          "bg-red-500/10 text-red-400";
      }

      return (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}
        >
          {row.status || "-"}
        </span>
      );
    },
  },
];