import { supabase } from "@/lib/supabase";
import { Event } from "./types";

export async function tambahEvent(
  data: Omit<Event, "id">
) {
  return await supabase
    .from("event")
    .insert(data)
    .select();
}

export async function updateEvent(
  id: number,
  data: Partial<Event>
) {
  return await supabase
    .from("event")
    .update(data)
    .eq("id", id);
}

export async function hapusEvent(id: number) {
  return await supabase
    .from("event")
    .delete()
    .eq("id", id);
}