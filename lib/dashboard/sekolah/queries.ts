import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function getSekolahDashboard(
  sekolahId?: number | string | null
) {
  try {
    /*
     * ============================
     * ANGGOTA
     * ============================
     */

    let anggotaQuery = supabase
      .from("anggota")
      .select("*", { count: "exact", head: true });

    if (sekolahId !== null && sekolahId !== undefined) {
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
     * ============================
     * EVENTS
     * ============================
     */

    let eventQuery = supabase
      .from("events")
      .select("*", { count: "exact", head: true });

    if (sekolahId !== null && sekolahId !== undefined) {
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
     * ============================
     * KAS
     * ============================
     */

    let kasQuery = supabase
      .from("kas")
      .select("jenis, nominal");

    if (sekolahId !== null && sekolahId !== undefined) {
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
     * ============================
     * HITUNG KAS
     * ============================
     */

    const pemasukan =
      kas
        ?.filter(
          (item) => item.jenis === "Masuk"
        )
        .reduce(
          (total, item) =>
            total + Number(item.nominal || 0),
          0
        ) ?? 0;

    const pengeluaran =
      kas
        ?.filter(
          (item) => item.jenis === "Keluar"
        )
        .reduce(
          (total, item) =>
            total + Number(item.nominal || 0),
          0
        ) ?? 0;

    const saldo =
      pemasukan - pengeluaran;

    /*
     * ============================
     * RETURN
     * ============================
     */

    return {
      data: {
        totalAnggota:
          totalAnggota ?? 0,

        totalEvent:
          totalEvent ?? 0,

        pemasukan,

        pengeluaran,

        saldo,

        kehadiran: 0,
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