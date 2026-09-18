import { supabase } from "@/lib/supabase";

export async function uploadFoto(file: File) {
  const ext = file.name.split(".").pop();

  const fileName = `${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("inventaris")
    .upload(fileName, file);

  if (error) throw error;

  return fileName;
}

export function getFotoUrl(path: string) {
  const { data } = supabase.storage
    .from("inventaris")
    .getPublicUrl(path);

  return data.publicUrl;
}