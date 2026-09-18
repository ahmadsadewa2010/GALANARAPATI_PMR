import { supabase } from "@/lib/supabase";
import { Inventaris } from "./types";

export async function tambahInventaris(
  data: Omit<Inventaris, "id">
) {
  return await supabase
    .from("inventaris")
    .insert(data)
    .select();
}

export async function updateInventaris(
  id: number,
  data: Partial<Inventaris>
) {
  return await supabase
    .from("inventaris")
    .update(data)
    .eq("id", id);
}

export async function hapusInventaris(id: number) {
  return await supabase
    .from("inventaris")
    .delete()
    .eq("id", id);
}