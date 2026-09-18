import { supabase } from "@/lib/supabase";

export async function uploadBanner(file: File) {
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from("event")
    .upload(fileName, file);

  console.log("UPLOAD DATA:", data);
  console.log("UPLOAD ERROR:", error);

  if (error) throw error;

  return fileName;
}

export function getBannerUrl(path: string) {
  const { data } = supabase.storage
    .from("event")
    .getPublicUrl(path);

  return data.publicUrl;
}