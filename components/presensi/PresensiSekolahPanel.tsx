"use client";

import { useEffect, useMemo, useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Search,
  UserCheck,
  Users,
  XCircle,
  AlertCircle,
} from "lucide-react";

import {
  getAnggotaAdminSekolah,
  getPresensiAdminSekolah,
  simpanPresensiAdminSekolah,
  updatePresensiAdminSekolah,
  PresensiStatus,
} from "@/lib/presensi";

type Anggota = {
  id: string;
  nama?: string | null;
  sekolah_id?: string | null;
};

type Presensi = {
  id: number;
  sekolah_id: string;
  anggota_id: string;
  tanggal: string;
  status: string;
  created_at?: string;
};

type Props = {
  sekolahId: string;
};

export default function PresensiSekolahPanel({
  sekolahId,
}: Props) {
  const [anggota, setAnggota] = useState<Anggota[]>([]);
  const [presensi, setPresensi] = useState<Presensi[]>(
    []
  );

  const [tanggal, setTanggal] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(
    null
  );

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | LOAD DATA
  |--------------------------------------------------------------------------
  */

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [
        anggotaData,
        presensiData,
      ] = await Promise.all([
        getAnggotaAdminSekolah(sekolahId),
        getPresensiAdminSekolah(sekolahId),
      ]);

      setAnggota(anggotaData);
      setPresensi(presensiData);
    } catch (err) {
      console.error(
        "PRESENSI ADMIN SEKOLAH ERROR:",
        err
      );

      setError(
        "Gagal mengambil data presensi sekolah."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!sekolahId) return;

    loadData();
  }, [sekolahId]);

  /*
  |--------------------------------------------------------------------------
  | FILTER ANGGOTA
  |--------------------------------------------------------------------------
  */

  const filteredAnggota = useMemo(() => {
    return anggota.filter((item) =>
      String(item.nama ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [anggota, search]);

  /*
  |--------------------------------------------------------------------------
  | PRESENSI TANGGAL AKTIF
  |--------------------------------------------------------------------------
  */

  const presensiHariIni = useMemo(() => {
    return presensi.filter(
      (item) => item.tanggal === tanggal
    );
  }, [presensi, tanggal]);

  /*
  |--------------------------------------------------------------------------
  | GET STATUS ANGGOTA
  |--------------------------------------------------------------------------
  */

  function getStatus(anggotaId: string) {
    return (
      presensiHariIni.find(
        (item) => item.anggota_id === anggotaId
      )?.status ?? null
    );
  }

  /*
  |--------------------------------------------------------------------------
  | SIMPAN STATUS
  |--------------------------------------------------------------------------
  */

  async function handleStatus(
    anggotaId: string,
    status: PresensiStatus
  ) {
    try {
      setSaving(anggotaId);
      setError("");

      const existing =
        presensiHariIni.find(
          (item) =>
            item.anggota_id === anggotaId
        );

      if (existing) {
        await updatePresensiAdminSekolah({
          id: existing.id,
          status,
        });
      } else {
        await simpanPresensiAdminSekolah({
          sekolahId,
          anggotaId,
          tanggal,
          status,
        });
      }

      await loadData();
    } catch (err) {
      console.error(
        "SAVE PRESENSI ERROR:",
        err
      );

      setError(
        "Gagal menyimpan presensi."
      );
    } finally {
      setSaving(null);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | REKAP
  |--------------------------------------------------------------------------
  */

  const total = anggota.length;

  const hadir = presensiHariIni.filter(
    (item) =>
      item.status === PresensiStatus.HADIR
  ).length;

  const izin = presensiHariIni.filter(
    (item) =>
      item.status === PresensiStatus.IZIN
  ).length;

  const sakit = presensiHariIni.filter(
    (item) =>
      item.status === PresensiStatus.SAKIT
  ).length;

  const alpa = presensiHariIni.filter(
    (item) =>
      item.status === PresensiStatus.ALPA
  ).length;

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="space-y-6">

      {/* ERROR */}

      {error && (
        <div className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-red-500/20
          bg-red-500/10
          px-5
          py-4
          text-sm
          text-red-300
        ">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* HEADER */}

      <div>
        <p className="text-sm font-medium text-blue-400">
          PANEL SEKOLAH
        </p>

        <h1 className="mt-1 text-3xl font-bold text-white">
          Presensi Anggota
        </h1>

        <p className="mt-2 text-slate-400">
          Kelola kehadiran anggota PMR sekolah.
        </p>
      </div>

      {/* FILTER */}

      <div className="
        flex
        flex-col
        gap-4
        rounded-3xl
        border
        border-slate-800
        bg-slate-950/60
        p-5
        backdrop-blur-xl
        md:flex-row
        md:items-center
        md:justify-between
      ">

        {/* TANGGAL */}

        <div className="flex items-center gap-3">
          <div className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-blue-500/10
            text-blue-400
          ">
            <CalendarDays size={20} />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Tanggal Presensi
            </p>

            <input
              type="date"
              value={tanggal}
              onChange={(e) =>
                setTanggal(e.target.value)
              }
              className="
                mt-1
                bg-transparent
                text-sm
                font-medium
                text-white
                outline-none
              "
            />
          </div>
        </div>

        {/* SEARCH */}

        <div className="
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          border
          border-slate-800
          bg-slate-900/60
          px-4
          md:max-w-xs
        ">
          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            type="text"
            placeholder="Cari anggota..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              bg-transparent
              py-3
              text-sm
              text-white
              outline-none
              placeholder:text-slate-600
            "
          />
        </div>
      </div>

      {/* REKAP */}

      <div className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-5
      ">

        <RekapCard
          label="Total Anggota"
          value={total}
          icon={<Users size={20} />}
        />

        <RekapCard
          label="Hadir"
          value={hadir}
          icon={<CheckCircle2 size={20} />}
        />

        <RekapCard
          label="Izin"
          value={izin}
          icon={<Clock size={20} />}
        />

        <RekapCard
          label="Sakit"
          value={sakit}
          icon={<AlertCircle size={20} />}
        />

        <RekapCard
          label="Alpa"
          value={alpa}
          icon={<XCircle size={20} />}
        />

      </div>

      {/* TABLE */}

      <section className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-slate-950/60
        backdrop-blur-xl
      ">

        <div className="
          border-b
          border-slate-800
          px-6
          py-5
        ">
          <div className="flex items-center gap-3">

            <UserCheck
              size={21}
              className="text-blue-400"
            />

            <div>
              <h2 className="font-semibold text-white">
                Daftar Kehadiran
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Tandai status kehadiran anggota.
              </p>
            </div>

          </div>
        </div>

        {loading ? (
          <div className="
            flex
            min-h-[300px]
            items-center
            justify-center
            text-sm
            text-slate-500
          ">
            Memuat data presensi...
          </div>
        ) : filteredAnggota.length === 0 ? (
          <div className="
            flex
            min-h-[300px]
            flex-col
            items-center
            justify-center
            px-6
            text-center
          ">
            <Users
              size={35}
              className="text-slate-700"
            />

            <p className="mt-4 text-sm text-slate-400">
              Belum ada anggota.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="
                  border-b
                  border-slate-800
                  text-left
                  text-xs
                  uppercase
                  tracking-wider
                  text-slate-500
                ">
                  <th className="px-6 py-4">
                    Anggota
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredAnggota.map(
                  (item) => {
                    const status =
                      getStatus(item.id);

                    const isSaving =
                      saving === item.id;

                    return (
                      <tr
                        key={item.id}
                        className="
                          border-b
                          border-slate-900
                          transition
                          hover:bg-slate-900/40
                        "
                      >

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-xl
                              bg-blue-500/10
                              text-sm
                              font-semibold
                              text-blue-400
                            ">
                              {String(
                                item.nama ?? "?"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <p className="font-medium text-white">
                                {item.nama ??
                                  "Tanpa Nama"}
                              </p>

                              <p className="text-xs text-slate-600">
                                Anggota PMR
                              </p>
                            </div>

                          </div>

                        </td>

                        <td className="px-6 py-4">

                          <StatusBadge
                            status={status}
                          />

                        </td>

                        <td className="px-6 py-4">

                          <div className="flex flex-wrap gap-2">

                            <StatusButton
                              label="Hadir"
                              active={
                                status ===
                                PresensiStatus.HADIR
                              }
                              disabled={isSaving}
                              onClick={() =>
                                handleStatus(
                                  item.id,
                                  PresensiStatus.HADIR
                                )
                              }
                            />

                            <StatusButton
                              label="Izin"
                              active={
                                status ===
                                PresensiStatus.IZIN
                              }
                              disabled={isSaving}
                              onClick={() =>
                                handleStatus(
                                  item.id,
                                  PresensiStatus.IZIN
                                )
                              }
                            />

                            <StatusButton
                              label="Sakit"
                              active={
                                status ===
                                PresensiStatus.SAKIT
                              }
                              disabled={isSaving}
                              onClick={() =>
                                handleStatus(
                                  item.id,
                                  PresensiStatus.SAKIT
                                )
                              }
                            />

                            <StatusButton
                              label="Alpa"
                              active={
                                status ===
                                PresensiStatus.ALPA
                              }
                              disabled={isSaving}
                              onClick={() =>
                                handleStatus(
                                  item.id,
                                  PresensiStatus.ALPA
                                )
                              }
                            />

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>
        )}

      </section>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| REKAP CARD
|--------------------------------------------------------------------------
*/

function RekapCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="
      rounded-2xl
      border
      border-slate-800
      bg-slate-950/60
      p-5
    ">
      <div className="
        flex
        items-center
        justify-between
      ">
        <div className="text-slate-500">
          {icon}
        </div>

        <span className="
          text-2xl
          font-bold
          text-white
        ">
          {value}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {label}
      </p>
    </div>
  );
}


/*
|--------------------------------------------------------------------------
| STATUS BUTTON
|--------------------------------------------------------------------------
*/

function StatusButton({
  label,
  active,
  disabled,
  onClick,
}: {
  label: string;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        rounded-lg
        px-3
        py-2
        text-xs
        font-medium
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${
          active
            ? "bg-blue-500 text-white"
            : "bg-slate-900 text-slate-500 hover:bg-slate-800 hover:text-white"
        }
      `}
    >
      {label}
    </button>
  );
}


/*
|--------------------------------------------------------------------------
| STATUS BADGE
|--------------------------------------------------------------------------
*/

function StatusBadge({
  status,
}: {
  status: string | null;
}) {
  if (!status) {
    return (
      <span className="
        inline-flex
        items-center
        rounded-full
        bg-slate-800
        px-3
        py-1
        text-xs
        text-slate-500
      ">
        Belum Diisi
      </span>
    );
  }

  const classes =
    status === "Hadir"
      ? "bg-green-500/10 text-green-400"
      : status === "Izin"
      ? "bg-yellow-500/10 text-yellow-400"
      : status === "Sakit"
      ? "bg-blue-500/10 text-blue-400"
      : "bg-red-500/10 text-red-400";

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${classes}
      `}
    >
      {status}
    </span>
  );
}