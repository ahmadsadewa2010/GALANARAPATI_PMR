import { supabase } from "@/lib/supabase";

export async function getInventaris() {
  return await supabase
    .from("inventaris")
    .select("*")
    .order("created_at", {
      ascending: false,
    });
}