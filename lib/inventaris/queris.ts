import { supabase } from "@/lib/supabase";

export async function getInventaris() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("User belum login.");
  }

  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select("role, sekolah_id")
    .eq("id", user.id)
    .single();

  if (profileError) {
    throw profileError;
  }

  let query = supabase
    .from("inventaris")
    .select(`
      *,
      sekolah:sekolah_id (
        id,
        nama
      )
    `)
    .order("created_at", {
      ascending: false,
    });

  /*
   * SUPER ADMIN
   * Bisa melihat semua inventaris.
   */
  if (profile.role === "super_admin") {
    return await query;
  }

  /*
   * ADMIN SEKOLAH + ANGGOTA
   * Hanya:
   * - inventaris induk
   * - inventaris sekolah sendiri
   */
  if (!profile.sekolah_id) {
    return {
      data: [],
      error: null,
    };
  }

  query = query.or(
    `kepemilikan.eq.induk,sekolah_id.eq.${profile.sekolah_id}`
  );

  return await query;
}