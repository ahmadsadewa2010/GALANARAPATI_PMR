import { supabase } from "@/lib/supabase";

export async function getKas() {
  return await supabase
    .from("kas")
    .select("*")
    .order("tanggal", { ascending: false });
}