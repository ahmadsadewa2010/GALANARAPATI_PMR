import { supabase } from "@/lib/supabase";

export async function tambahPresensi(
  payload: {
    anggota_id: number;
    status: string;
    tanggal: string;
  }
) {
  const { data, error } = await supabase
    .from("presensi")
    .insert(payload)
    .select()
    .single();

  return {
    data,
    error,
  };
}

export async function updatePresensi(
  id: number,
  payload: {
    anggota_id: number;
    status: string;
    tanggal: string;
  }
) {
  const { data, error } = await supabase
    .from("presensi")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  return {
    data,
    error,
  };
}

export async function hapusPresensi(
  id: number
) {
  const { error } = await supabase
    .from("presensi")
    .delete()
    .eq("id", id);

  return {
    error,
  };
}