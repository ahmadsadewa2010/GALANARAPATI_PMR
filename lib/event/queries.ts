import { supabase } from "@/lib/supabase";

export async function getEvent() {
  return await supabase
    .from("event")
    .select("*")
    .order("tanggal", {
      ascending: true,
    });
}