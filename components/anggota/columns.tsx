"use client";

import { updateAnggota } from "@/lib/anggota/actions";

import Swal from "sweetalert2";
import { Pencil, Trash2 } from "lucide-react";
import Avatar from "./Avatar";
import { Anggota } from "@/lib/anggota/types";

interface Props {
  setEditData: (data: Anggota) => void;
  setOpenModal: (open: boolean) => void;
  deleteAnggota: (id: number) => Promise<void>;
  loadAnggota: () => Promise<void>;
}

export function anggotaColumns({
  setEditData,
  setOpenModal,
  deleteAnggota,
  loadAnggota,
}: Props) {
  return [
    {
      key: "nama",
      title: "Nama",
      render: (item: Anggota) => (
        <Avatar
          nama={item.nama}
          id={item.id}
          foto={item.foto}
        />
      ),
    },

    {
      key: "sekolah",
      title: "Sekolah",
    },

    {
      key: "jabatan",
      title: "Jabatan",
    },

    {
  key: "status",
  title: "Status",
  render: (item: Anggota) => (
    <button
      onClick={async () => {
        const statusBaru =
          item.status === "Aktif"
            ? "Nonaktif"
            : "Aktif";

        const result = await Swal.fire({
          title: "Ubah Status?",
          html: `
            <b>${item.nama}</b><br>
            ${item.status} ➜ ${statusBaru}
          `,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Ya",
          cancelButtonText: "Batal",
          confirmButtonColor: "#2563eb",
          cancelButtonColor: "#ef4444",
          background: "#0f172a",
          color: "#fff",
        });

        if (!result.isConfirmed) return;

        const { error } = await updateAnggota(item.id, {
          status: statusBaru,
        });

        if (error) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Status gagal diubah.",
            background: "#0f172a",
            color: "#fff",
          });
          return;
        }

        await loadAnggota();

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Status berhasil diubah.",
          timer: 1200,
          showConfirmButton: false,
          background: "#0f172a",
          color: "#fff",
        });
      }}
      className={`rounded-full px-3 py-1 text-xs font-medium transition hover:scale-105 ${
        item.status === "Aktif"
          ? "bg-green-500/20 text-green-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {item.status}
    </button>
  ),
},
    {
      key: "aksi",
      title: "Aksi",
      render: (item: Anggota) => (
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
                title: "Hapus anggota?",
                text: `${item.nama} akan dihapus permanen.`,
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
                  await deleteAnggota(item.id);

                  Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Data berhasil dihapus.",
                    timer: 1500,
                    showConfirmButton: false,
                    background: "#0f172a",
                    color: "#fff",
                  });
                } catch (error) {
                  console.error(error);

                  Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: "Data gagal dihapus.",
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