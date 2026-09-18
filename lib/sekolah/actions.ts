import { supabase } from "@/lib/supabase";

type SekolahPayload = {
  nama: string;
  alamat?: string | null;
  kontak?: string | null;
  pembina?: string | null;
  logo?: string | null;
};

export async function tambahSekolah(
  payload: SekolahPayload
) {
  const {
    data,
    error,
  } = await supabase
    .from("sekolah")
    .insert(payload)
    .select()
    .single();

  return {
    data,
    error,
  };
}

export async function updateSekolah(
  id: number,
  payload: SekolahPayload
) {
  const {
    data,
    error,
  } = await supabase
    .from("sekolah")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  return {
    data,
    error,
  };
}

export async function hapusSekolah(
  id: number
) {
  const {
    error,
  } = await supabase
    .from("sekolah")
    .delete()
    .eq("id", id);

  return {
    error,
  };
}