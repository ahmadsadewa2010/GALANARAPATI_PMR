"use client";

import Swal from "sweetalert2";
import { Pencil, Trash2 } from "lucide-react";
import { Kas } from "@/lib/Kas/types";

interface Props {
  setEditData: (data: Kas) => void;
  setOpenModal: (open: boolean) => void;
  deleteKas: (id: number) => Promise<void>;
}

export function kasColumns({
  setEditData,
  setOpenModal,
  deleteKas,
}: Props) {
  return [
    {
      key: "tanggal",
      title: "Tanggal",
      render: (item: Kas) =>
        new Date(item.tanggal).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },

    {
      key: "jenis",
      title: "Jenis",
      render: (item: Kas) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            item.jenis === "Masuk"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {item.jenis}
        </span>
      ),
    },

    {
      key: "kategori",
      title: "Kategori",
    },

    {
      key: "keterangan",
      title: "Keterangan",
    },

   {
        key: "nominal",
        title: "Nominal",
        render: (item: Kas) => (
          <div className="text-right">

            <span
              className={`font-bold text-lg ${
                item.jenis === "Masuk"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {item.jenis === "Masuk" ? "+" : "-"} Rp{" "}
              {item.nominal.toLocaleString("id-ID")}
            </span>

          </div>
        ),
      },
    {
      key: "aksi",
      title: "Aksi",
      render: (item: Kas) => (
        <div className="flex gap-2">

          <button
            onClick={() => {
              setEditData(item);
              setOpenModal(true);
            }}
            className="rounded-lg bg-blue-600 p-2 transition hover:bg-blue-700"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => {
              Swal.fire({
                title: "Hapus transaksi?",
                text: "Data kas akan dihapus permanen.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, Hapus",
                cancelButtonText: "Batal",
                confirmButtonColor: "#2563eb",
                cancelButtonColor: "#ef4444",
                background: "#0f172a",
                color: "#fff",
              }).then(async (result) => {
                if (!result.isConfirmed) return;

                try {
                  await deleteKas(item.id);

                  Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Transaksi berhasil dihapus.",
                    timer: 800,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    background: "#0f172a",
                    color: "#fff",
                  });
                } catch (err) {
                  console.error(err);

                  Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: "Transaksi gagal dihapus.",
                    background: "#0f172a",
                    color: "#fff",
                  });
                }
              });
            }}
            className="rounded-lg bg-red-600 p-2 transition hover:bg-red-700"
          >
            <Trash2 size={16} />
          </button>

        </div>
      ),
    },
  ];
}