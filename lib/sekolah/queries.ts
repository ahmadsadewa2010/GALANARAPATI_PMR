import { supabase } from "@/lib/supabase";
import { Sekolah } from "./types";

export async function getSekolah(
  sekolahId?: number | string | null
) {
  let query = supabase
    .from("sekolah")
    .select("*")
    .order("nama", {
      ascending: true,
    });

  if (
    sekolahId !== null &&
    sekolahId !== undefined &&
    sekolahId !== ""
  ) {
    query = query.eq(
      "id",
      sekolahId
    );
  }

  const {
    data,
    error,
  } = await query;

  return {
    data: (data ?? []) as Sekolah[],
    error,
  };
}

export async function getSekolahById(
  id: number | string
) {
  const {
    data,
    error,
  } = await supabase
    .from("sekolah")
    .select("*")
    .eq("id", id)
    .single();

  return {
    data: data as Sekolah | null,
    error,
  };
}