import { supabase } from "@/lib/supabase";

export async function getPresensi(sekolahId: string) {
  const { data, error } = await supabase
    .from("presensi")
    .select(`
      id,
      sekolah_id,
      anggota_id,
      tanggal,
      status,
      created_at,
      anggota:anggota_id (
        id,
        nama
      )
    `)
    .eq("sekolah_id", sekolahId)
    .order("tanggal", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getAnggotaPresensi(sekolahId: string) {
  const { data, error } = await supabase
    .from("anggota")
    .select("*")
    .eq("sekolah_id", sekolahId)
    .order("nama", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function simpanPresensi(payload: {
  sekolah_id: string;
  anggota_id: string;
  tanggal: string;
  status: string;
}) {
  const { data, error } = await supabase
    .from("presensi")
    .upsert(payload, {
      onConflict: "anggota_id,tanggal",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function hapusPresensi(id: string) {
  const { error } = await supabase
    .from("presensi")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}