import { supabase } from "@/lib/supabase";

export async function getSekolahDashboard(
  sekolahId?: number | string | null
) {
  try {
    /*
     * ==========================================
     * FILTER SEKOLAH
     * ==========================================
     *
     * Jika sekolahId ada:
     * hanya ambil data sekolah tersebut.
     *
     * Jika null:
     * SUPER ADMIN → ambil seluruh sekolah.
     */

    const hasSchoolFilter =
      sekolahId !== null &&
      sekolahId !== undefined &&
      sekolahId !== "";

    /*
     * ==========================================
     * ANGGOTA
     * ==========================================
     */

    let anggotaQuery = supabase
      .from("anggota")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (hasSchoolFilter) {
      anggotaQuery = anggotaQuery.eq(
        "sekolah_id",
        sekolahId
      );
    }

    const {
      count: totalAnggota,
      error: anggotaError,
    } = await anggotaQuery;

    if (anggotaError) {
      throw anggotaError;
    }

    /*
     * ==========================================
     * EVENTS
     * ==========================================
     */

    let eventQuery = supabase
      .from("events")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (hasSchoolFilter) {
      eventQuery = eventQuery.eq(
        "sekolah_id",
        sekolahId
      );
    }

    const {
      count: totalEvent,
      error: eventError,
    } = await eventQuery;

    if (eventError) {
      throw eventError;
    }

    /*
     * ==========================================
     * KAS
     * ==========================================
     */

    let kasQuery = supabase
      .from("kas")
      .select("jenis, nominal");

    if (hasSchoolFilter) {
      kasQuery = kasQuery.eq(
        "sekolah_id",
        sekolahId
      );
    }

    const {
      data: kas,
      error: kasError,
    } = await kasQuery;

    if (kasError) {
      throw kasError;
    }

    /*
     * ==========================================
     * HITUNG PEMASUKAN
     * ==========================================
     */

    const pemasukan =
      kas
        ?.filter(
          (item) =>
            item.jenis === "Masuk"
        )
        .reduce(
          (total, item) =>
            total +
            Number(item.nominal || 0),
          0
        ) ?? 0;

    /*
     * ==========================================
     * HITUNG PENGELUARAN
     * ==========================================
     */

    const pengeluaran =
      kas
        ?.filter(
          (item) =>
            item.jenis === "Keluar"
        )
        .reduce(
          (total, item) =>
            total +
            Number(item.nominal || 0),
          0
        ) ?? 0;

    /*
     * ==========================================
     * SALDO
     * ==========================================
     */

    const saldo =
      pemasukan - pengeluaran;

    /*
     * ==========================================
     * PRESENSI
     * ==========================================
     *
     * TABEL PRESENSI BELUM TERSEDIA.
     *
     * Untuk sementara dashboard tidak
     * melakukan query ke tabel presensi
     * agar tidak menyebabkan PGRST205.
     *
     * Nanti setelah tabel presensi dibuat,
     * bagian ini tinggal disambungkan.
     */

    const persentaseKehadiran = 0;

    /*
     * ==========================================
     * RETURN
     * ==========================================
     */

    return {
      data: {
        totalAnggota:
          totalAnggota ?? 0,

        totalEvent:
          totalEvent ?? 0,

        persentaseKehadiran,

        pemasukan,

        pengeluaran,

        saldo,
      },

      error: null,
    };

  } catch (error) {

    console.error(
      "GET SEKOLAH DASHBOARD ERROR:",
      error
    );

    return {
      data: null,
      error,
    };
  }
}