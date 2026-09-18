import { supabase } from "@/lib/supabase";
import { Anggota } from "./types";

export async function tambahAnggota(
  data: Omit<Anggota, "id">
) {
  return await supabase
    .from("anggota")
    .insert({
      user_id:
        data.user_id ?? null,

      nama:
        data.nama,

      nisn:
        data.nisn,

      nama_ibu_kandung:
        data.nama_ibu_kandung,

      sekolah_id:
        data.sekolah_id,

      sekolah:
        data.sekolah ?? null,

      jabatan:
        data.jabatan,

      status:
        data.status,

      foto:
        typeof data.foto === "string"
          ? data.foto
          : null,
    })
    .select()
    .single();
}


export async function updateAnggota(
  id: number,
  data: Partial<Anggota>
) {
  const payload: Record<
    string,
    unknown
  > = {};

  if (data.nama !== undefined) {
    payload.nama = data.nama;
  }

  if (data.nisn !== undefined) {
    payload.nisn = data.nisn;
  }

  if (
    data.nama_ibu_kandung !== undefined
  ) {
    payload.nama_ibu_kandung =
      data.nama_ibu_kandung;
  }

  if (
    data.sekolah_id !== undefined
  ) {
    payload.sekolah_id =
      data.sekolah_id;
  }

  if (data.sekolah !== undefined) {
    payload.sekolah =
      data.sekolah;
  }

  if (data.jabatan !== undefined) {
    payload.jabatan =
      data.jabatan;
  }

  if (data.status !== undefined) {
    payload.status =
      data.status;
  }

  if (data.user_id !== undefined) {
    payload.user_id =
      data.user_id;
  }

  if (
    typeof data.foto === "string"
  ) {
    payload.foto =
      data.foto;
  }

  return await supabase
    .from("anggota")
    .update(payload)
    .eq("id", id);
}


export async function hapusAnggota(
  id: number
) {
  return await supabase
    .from("anggota")
    .delete()
    .eq("id", id);
}