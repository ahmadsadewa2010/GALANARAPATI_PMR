"use client";

import Swal from "sweetalert2";

import Image from "next/image";

import {
  Pencil,
  Trash2,
  Package,
} from "lucide-react";

import {
  Inventaris,
} from "@/lib/inventaris/types";

import {
  getFotoUrl,
} from "@/lib/inventaris/storage";

interface Props {
  setEditData: (
    data: Inventaris
  ) => void;

  setOpenModal: (
    open: boolean
  ) => void;

  deleteInventaris: (
    id: number
  ) => Promise<void>;

  canManage: boolean;
}

export function inventarisColumns({
  setEditData,
  setOpenModal,
  deleteInventaris,
  canManage,
}: Props) {
  const columns = [
    {
      key: "foto",
      title: "Foto",

      render: (item: Inventaris) =>
        item.foto ? (
          <Image
            src={getFotoUrl(item.foto)}
            alt={item.nama}
            width={80}
            height={60}
            className="h-16 w-20 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-16 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600">
            <Package
              size={24}
              className="text-white"
            />
          </div>
        ),
    },

    {
      key: "nama",
      title: "Nama Barang",

      render: (item: Inventaris) => (
        <div>
          <h3 className="font-semibold text-white">
            {item.nama}
          </h3>

          <p className="text-xs text-slate-400">
            {item.lokasi}
          </p>
        </div>
      ),
    },

    {
      key: "kepemilikan",
      title: "Kepemilikan",

      render: (item: Inventaris) =>
        item.kepemilikan ===
        "induk" ? (
          <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-300">
            Milik Induk
          </span>
        ) : (
          <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-300">
            Milik Sekolah
          </span>
        ),
    },

    {
      key: "sekolah_id",
      title: "Sekolah",

      render: (item: Inventaris) => (
        <span className="text-sm text-slate-300">
          {item.kepemilikan ===
          "induk"
            ? "—"
            : item.sekolah?.nama ??
              `Sekolah #${item.sekolah_id}`}
        </span>
      ),
    },

    {
      key: "kategori",
      title: "Kategori",

      render: (item: Inventaris) => {
        const color =
          item.kategori === "Medis"
            ? "bg-blue-500/20 text-blue-300"
            : item.kategori ===
              "Peralatan"
            ? "bg-green-500/20 text-green-300"
            : item.kategori ===
              "Administrasi"
            ? "bg-violet-500/20 text-violet-300"
            : item.kategori ===
              "Furniture"
            ? "bg-orange-500/20 text-orange-300"
            : "bg-slate-700 text-slate-300";

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}
          >
            {item.kategori}
          </span>
        );
      },
    },

    {
      key: "jumlah",
      title: "Stok",

      render: (item: Inventaris) => (
        <span className="font-semibold text-white">
          {item.jumlah}
        </span>
      ),
    },

    {
      key: "harga",
      title: "Harga",

      render: (item: Inventaris) => (
        <span className="font-semibold text-emerald-400">
          Rp{" "}
          {item.harga.toLocaleString(
            "id-ID"
          )}
        </span>
      ),
    },

    {
      key: "kondisi",
      title: "Kondisi",

      render: (item: Inventaris) => {
        const color =
          item.kondisi === "Baik"
            ? "bg-green-500/20 text-green-300"
            : item.kondisi ===
              "Perawatan"
            ? "bg-yellow-500/20 text-yellow-300"
            : item.kondisi ===
              "Rusak"
            ? "bg-red-500/20 text-red-300"
            : "bg-slate-600/20 text-slate-300";

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}
          >
            {item.kondisi}
          </span>
        );
      },
    },
  ];

  /*
   * Hanya admin/super admin
   * yang mendapatkan tombol aksi.
   */
  if (canManage) {
    columns.push({
      key: "aksi",

      title: "Aksi",

      render: (item: Inventaris) => (
        <div className="flex gap-2">

          <button
            onClick={() => {
              setEditData(item);
              setOpenModal(true);
            }}
            className="rounded-xl bg-blue-600 p-2 transition hover:bg-blue-700"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => {
              Swal.fire({
                title: "Hapus Barang?",
                text: `${item.nama} akan dihapus permanen.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Hapus",
                cancelButtonText: "Batal",
                confirmButtonColor:
                  "#2563eb",
                cancelButtonColor:
                  "#ef4444",
                background: "#0f172a",
                color: "#fff",
              }).then(
                async (result) => {
                  if (
                    !result.isConfirmed
                  ) {
                    return;
                  }

                  try {
                    await deleteInventaris(
                      item.id
                    );

                    await Swal.fire({
                      icon: "success",
                      title: "Berhasil",
                      text: "Barang berhasil dihapus.",
                      timer: 1500,
                      showConfirmButton:
                        false,
                      background:
                        "#0f172a",
                      color: "#fff",
                    });
                  } catch (error) {
                    await Swal.fire({
                      icon: "error",
                      title: "Gagal",
                      text:
                        error instanceof
                        Error
                          ? error.message
                          : "Barang gagal dihapus.",
                      background:
                        "#0f172a",
                      color: "#fff",
                    });
                  }
                }
              );
            }}
            className="rounded-xl bg-red-600 p-2 transition hover:bg-red-700"
          >
            <Trash2 size={16} />
          </button>

        </div>
      ),
    });
  }

  return columns;
}