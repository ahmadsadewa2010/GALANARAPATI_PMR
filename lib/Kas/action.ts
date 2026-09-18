import { supabase } from "@/lib/supabase";
import { Kas } from "@/lib/Kas/types";

export async function tambahKas(data: Omit<Kas, "id">) {
  return await supabase
    .from("kas")
    .insert(data)
    .select();
}

export async function updateKas(
  id: number,
  data: Partial<Kas>
) {
  return await supabase
    .from("kas")
    .update(data)
    .eq("id", id);
}

export async function hapusKas(id: number) {
  return await supabase
    .from("kas")
    .delete()
    .eq("id", id);
}