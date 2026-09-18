import { supabase } from "@/lib/supabase";

export async function getAnggota(
  sekolahId?: number | null
) {
  let query = supabase
    .from("anggota")
    .select(`
      id,
      user_id,
      nama,
      nisn,
      nama_ibu_kandung,
      sekolah_id,
      sekolah,
      jabatan,
      status,
      foto,
      created_at
    `)
    .order("id", {
      ascending: true,
    });

  if (
    sekolahId !== null &&
    sekolahId !== undefined
  ) {
    query = query.eq(
      "sekolah_id",
      sekolahId
    );
  }

  return await query;
}