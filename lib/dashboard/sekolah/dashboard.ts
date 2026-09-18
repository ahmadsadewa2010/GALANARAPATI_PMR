import { supabase } from "@/lib/supabase";

export async function getSekolahDashboard(
  sekolahId: number | string
) {
  try {
    // ================================
    // ANGGOTA
    // ================================

    const {
      count: totalAnggota,
      error: anggotaError,
    } = await supabase
      .from("anggota")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("sekolah_id", sekolahId);

    if (anggotaError) {
      throw anggotaError;
    }

    // ================================
    // EVENT
    // ================================

    const {
      count: totalEvent,
      error: eventError,
    } = await supabase
      .from("events")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("sekolah_id", sekolahId);

    if (eventError) {
      throw eventError;
    }

    // ================================
    // PRESENSI
    // ================================

    const {
      data: presensi,
      error: presensiError,
    } = await supabase
      .from("presensi")
      .select(`
        status,
        anggota!inner(sekolah_id)
      `)
      .eq("anggota.sekolah_id", sekolahId);

    if (presensiError) {
      throw presensiError;
    }

    const totalPresensi = presensi?.length ?? 0;

    const hadir =
      presensi?.filter(
        (item) => item.status === "Hadir"
      ).length ?? 0;

    const persentaseKehadiran =
      totalPresensi > 0
        ? Math.round(
            (hadir / totalPresensi) * 100
          )
        : 0;

    // ================================
    // KAS
    // ================================

    const {
      data: kas,
      error: kasError,
    } = await supabase
      .from("kas")
      .select("jenis, nominal")
      .eq("sekolah_id", sekolahId);

    if (kasError) {
      throw kasError;
    }

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

    const saldo = pemasukan - pengeluaran;

    return {
      data: {
        totalAnggota: totalAnggota ?? 0,
        totalEvent: totalEvent ?? 0,
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