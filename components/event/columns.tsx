"use client";

import Swal from "sweetalert2";
import { Pencil, Trash2, CalendarDays } from "lucide-react";

import { Event } from "@/lib/event/types";
import { getBannerUrl } from "@/lib/event/storage";

interface Props {
  setEditData: (data: Event) => void;
  setOpenModal: (open: boolean) => void;
  deleteEvent: (id: number) => Promise<void>;
}

export function eventColumns({
  setEditData,
  setOpenModal,
  deleteEvent,
}: Props) {
  return [
    {
      key: "banner",
      title: "Banner",

      render: (item: Event) => (
        item.banner ? (
          <img
            src={getBannerUrl(item.banner)}
            alt={item.nama}
            className="h-14 w-24 rounded-xl object-cover"
          />
        ) : (
          <div
            className="
              flex h-14 w-24
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-blue-600
              via-cyan-500
              to-indigo-600
            "
          >
            <CalendarDays
              size={22}
              className="text-white"
            />
          </div>
        )
      ),
    },

    {
      key: "nama",
      title: "Nama Event",

      render: (item: Event) => (
        <div>
          <h3 className="font-semibold text-white">
            {item.nama}
          </h3>

          <p className="text-xs text-slate-400">
            {item.penanggung_jawab}
          </p>
        </div>
      ),
    },

    {
      key: "tanggal",
      title: "Tanggal",

      render: (item: Event) => (
        <div>
          <div className="text-white">
            {new Date(item.tanggal).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </div>

          <div className="text-xs text-slate-400">
            {item.waktu_mulai}
            {item.waktu_selesai &&
              ` - ${item.waktu_selesai}`}
          </div>
        </div>
      ),
    },

    {
      key: "lokasi",
      title: "Lokasi",
    },

    {
      key: "jenis",
      title: "Jenis",

      render: (item: Event) => (
        <span
          className="
            rounded-full
            bg-blue-500/20
            px-3
            py-1
            text-xs
            font-medium
            text-blue-300
          "
        >
          {item.jenis}
        </span>
      ),
    },

    {
      key: "status",
      title: "Status",

      render: (item: Event) => {

        const color =
          item.status === "Akan Datang"
            ? "bg-blue-500/20 text-blue-300"
            : item.status === "Berlangsung"
            ? "bg-green-500/20 text-green-300"
            : "bg-slate-600/20 text-slate-300";

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}
          >
            {item.status}
          </span>
        );
      },
    },

    {
      key: "aksi",
      title: "Aksi",

      render: (item: Event) => (
        <div className="flex gap-2">

          <button
            onClick={() => {
              setEditData(item);
              setOpenModal(true);
            }}
            className="
              rounded-xl
              bg-blue-600
              p-2
              transition
              hover:bg-blue-700
            "
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => {

              Swal.fire({
                title: "Hapus Event?",
                text: `${item.nama} akan dihapus permanen.`,
                icon: "warning",

                showCancelButton: true,

                confirmButtonText: "Hapus",
                cancelButtonText: "Batal",

                confirmButtonColor: "#2563eb",
                cancelButtonColor: "#ef4444",

                background: "#0f172a",
                color: "#fff",

              }).then(async (result) => {

                if (!result.isConfirmed) return;

                try {

                  await deleteEvent(item.id);

                  Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Event berhasil dihapus.",
                    timer: 1500,
                    showConfirmButton: false,
                    background: "#0f172a",
                    color: "#fff",
                  });

                } catch {

                  Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: "Event gagal dihapus.",
                    background: "#0f172a",
                    color: "#fff",
                  });

                }

              });

            }}
            className="
              rounded-xl
              bg-red-600
              p-2
              transition
              hover:bg-red-700
            "
          >
            <Trash2 size={16} />
          </button>

        </div>
      ),
    },
  ];
}