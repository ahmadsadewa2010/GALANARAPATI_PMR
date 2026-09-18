import { createClient } from "@/lib/supabase/client";

export async function logout() {
  const supabase = createClient();

  return await supabase.auth.signOut();
}