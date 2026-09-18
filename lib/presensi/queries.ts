import { supabase } from "@/lib/supabase";

export async function getPresensi(
  sekolahId: number | string
) {
  const { data, error } = await supabase
    .from("presensi")
    .select(`
      id,
      anggota_id,
      status,
      tanggal,
      created_at,
      anggota!inner(
        id,
        nama,
        sekolah_id
      )
    `)
    .eq(
      "anggota.sekolah_id",
      sekolahId
    )
    .order("tanggal", {
      ascending: false,
    });

  return {
    data,
    error,
  };
}