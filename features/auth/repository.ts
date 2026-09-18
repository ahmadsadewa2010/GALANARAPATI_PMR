import { supabase } from "@/lib/supabase";

export async function loginRepository(
  email: string,
  password: string
) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) throw error;

  return data;
}

export async function logoutRepository() {
  const { error } =
    await supabase.auth.signOut();

  if (error) throw error;
}

export async function sessionRepository() {
  const { data, error } =
    await supabase.auth.getSession();

  if (error) throw error;

  return data.session;
}