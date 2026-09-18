"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type SekolahData = {
  id?: number;
  nama: string;
  npsn?: string | null;
  alamat: string | null;
  email: string | null;
  kontak: string | null;
  pembina: string | null;
  logo: string | null;
};

type Props = {
  open: boolean;
  editData: SekolahData | null;
  onClose: () => void;
  onSave: (data: {
    nama: string;
    npsn: string;
    alamat: string;
    email: string;
    telepon: string;
    pembina: string;
    logo: string;
  }) => Promise<void>;
};

export default function SekolahModal({
  open,
  editData,
  onClose,
  onSave,
}: Props) {
  const [nama, setNama] = useState("");
  const [npsn, setNpsn] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [kontak, setKontak] = useState("");
  const [pembina, setPembina] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    if (editData) {
      setNama(editData.nama ?? "");
      setNpsn(editData.npsn ?? "");
      setAlamat(editData.alamat ?? "");
      setEmail(editData.email ?? "");
      setKontak(editData.kontak ?? "");
      setPembina(editData.pembina ?? "");
      setLogo(editData.logo ?? "");
    } else {
      setNama("");
      setNpsn("");
      setAlamat("");
      setEmail("");
      setKontak("");
      setPembina("");
      setLogo("");
    }
  }, [editData, open]);

  if (!open) {
    return null;
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim()) {
      return;
    }

    await onSave({
      nama: nama.trim(),
      npsn: npsn.trim(),
      alamat: alamat.trim(),
      email: email.trim(),
      kontak: kontak.trim(),
      pembina: pembina.trim(),
      logo: logo.trim(),
    });
  };

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/70 p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          rounded-3xl
          border border-slate-800
          bg-slate-950
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div
          className="
            sticky top-0 z-10
            flex items-center
            justify-between
            border-b border-slate-800
            bg-slate-950
            px-6 py-5
          "
        >
          <div>
            <h2 className="text-xl font-bold text-white">
              {editData
                ? "Edit Sekolah"
                : "Tambah Sekolah"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Kelola informasi sekolah PMR.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={submit}
          className="space-y-5 p-6"
        >
          {/* NAMA */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Nama Sekolah
            </label>

            <input
              value={nama}
              onChange={(e) =>
                setNama(e.target.value)
              }
              placeholder="Contoh: SMA Pancasila Ambulu"
              className="
                w-full rounded-xl
                border border-slate-800
                bg-slate-900
                px-4 py-3
                text-white
                outline-none
                transition
                focus:border-blue-500
              "
              required
            />
          </div>

          {/* NPSN */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              NPSN
            </label>

            <input
              value={npsn}
              onChange={(e) =>
                setNpsn(e.target.value)
              }
              placeholder="Contoh: 205238XX"
              className="
                w-full rounded-xl
                border border-slate-800
                bg-slate-900
                px-4 py-3
                text-white
                outline-none
                transition
                focus:border-blue-500
              "
            />
          </div>

          {/* ALAMAT */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Alamat
            </label>

            <textarea
              value={alamat}
              onChange={(e) =>
                setAlamat(e.target.value)
              }
              rows={3}
              placeholder="Alamat sekolah"
              className="
                w-full rounded-xl
                border border-slate-800
                bg-slate-900
                px-4 py-3
                text-white
                outline-none
                transition
                focus:border-blue-500
              "
            />
          </div>

          {/* EMAIL + TELEPON */}

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email Sekolah
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="sekolah@email.com"
                className="
                  w-full rounded-xl
                  border border-slate-800
                  bg-slate-900
                  px-4 py-3
                  text-white
                  outline-none
                  transition
                  focus:border-blue-500
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                kontak
              </label>

              <input
                type="tel"
                value={kontak}
                onChange={(e) =>
                  setKontak(e.target.value)
                }
                placeholder="08xxxxxxxxxx"
                className="
                  w-full rounded-xl
                  border border-slate-800
                  bg-slate-900
                  px-4 py-3
                  text-white
                  outline-none
                  transition
                  focus:border-blue-500
                "
              />
            </div>

          </div>

          {/* PEMBINA */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Pembina PMR
            </label>

            <input
              value={pembina}
              onChange={(e) =>
                setPembina(e.target.value)
              }
              placeholder="Nama pembina PMR"
              className="
                w-full rounded-xl
                border border-slate-800
                bg-slate-900
                px-4 py-3
                text-white
                outline-none
                transition
                focus:border-blue-500
              "
            />
          </div>

          {/* LOGO */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              URL Logo
            </label>

            <input
              value={logo}
              onChange={(e) =>
                setLogo(e.target.value)
              }
              placeholder="https://..."
              className="
                w-full rounded-xl
                border border-slate-800
                bg-slate-900
                px-4 py-3
                text-white
                outline-none
                focus:border-blue-500
              "
            />
          </div>

          {/* BUTTON */}

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                border border-slate-800
                px-5 py-3
                text-sm font-medium
                text-slate-300
                hover:bg-slate-900
              "
            >
              Batal
            </button>

            <button
              type="submit"
              className="
                rounded-xl
                bg-blue-600
                px-6 py-3
                text-sm font-semibold
                text-white
                transition
                hover:bg-blue-500
              "
            >
              {editData
                ? "Simpan Perubahan"
                : "Simpan Sekolah"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}