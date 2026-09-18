import { supabase } from "@/lib/supabase";

export async function uploadFoto(file: File) {
  const ext = file.name.split(".").pop();

  // Nama file unik
  const fileName = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("anggota")
    .upload(fileName, file);

  if (error) throw error;

  return fileName;
}

export function getFotoUrl(path: string) {
  return supabase.storage
    .from("anggota")
    .getPublicUrl(path).data.publicUrl;
}