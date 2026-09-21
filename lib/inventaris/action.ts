import { supabase } from "@/lib/supabase";
import type {
  InventarisFormData,
} from "./types";

type UserRole =
  | "super_admin"
  | "admin_sekolah"
  | "anggota";

interface ProfileScope {
  role: UserRole;
  sekolah_id: number | null;
}

async function getProfileScope(): Promise<ProfileScope> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("User belum login.");
  }

  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select("role, sekolah_id")
    .eq("id", user.id)
    .single();

  if (profileError) {
    throw profileError;
  }

  return {
    role: profile.role as UserRole,
    sekolah_id: profile.sekolah_id ?? null,
  };
}

function buildPayload(
  data: InventarisFormData,
  profile: ProfileScope
) {
  /*
   * ANGGOTA
   * Tidak boleh CRUD.
   */
  if (profile.role === "anggota") {
    throw new Error(
      "Kamu tidak memiliki izin untuk mengubah inventaris."
    );
  }

  /*
   * ADMIN SEKOLAH
   * Sekolah selalu otomatis milik profile.
   */
  if (profile.role === "admin_sekolah") {
    if (!profile.sekolah_id) {
      throw new Error(
        "Admin belum memiliki sekolah."
      );
    }

    return {
      ...data,
      kepemilikan: "sekolah" as const,
      sekolah_id: profile.sekolah_id,
    };
  }

  /*
   * SUPER ADMIN
   */
  if (data.kepemilikan === "induk") {
    return {
      ...data,
      kepemilikan: "induk" as const,
      sekolah_id: null,
    };
  }

  if (!data.sekolah_id) {
    throw new Error(
      "Sekolah harus dipilih untuk inventaris sekolah."
    );
  }

  return {
    ...data,
    kepemilikan: "sekolah" as const,
    sekolah_id: data.sekolah_id,
  };
}

export async function tambahInventaris(
  data: InventarisFormData
) {
  const profile = await getProfileScope();

  const payload = buildPayload(data, profile);

  return await supabase
    .from("inventaris")
    .insert(payload)
    .select()
    .single();
}

export async function updateInventaris(
  id: number,
  data: Partial<InventarisFormData>
) {
  const profile = await getProfileScope();

  if (profile.role === "anggota") {
    throw new Error(
      "Kamu tidak memiliki izin untuk mengubah inventaris."
    );
  }

  let payload = {
    ...data,
  };

  /*
   * ADMIN SEKOLAH
   * Tidak boleh mengubah kepemilikan menjadi induk
   * atau pindah ke sekolah lain.
   */
  if (profile.role === "admin_sekolah") {
    if (!profile.sekolah_id) {
      throw new Error(
        "Admin belum memiliki sekolah."
      );
    }

    payload = {
      ...payload,
      kepemilikan: "sekolah",
      sekolah_id: profile.sekolah_id,
    };
  }

  /*
   * SUPER ADMIN
   */
  if (
    profile.role === "super_admin" &&
    payload.kepemilikan === "induk"
  ) {
    payload.sekolah_id = null;
  }

  if (
    profile.role === "super_admin" &&
    payload.kepemilikan === "sekolah" &&
    !payload.sekolah_id
  ) {
    throw new Error(
      "Sekolah harus dipilih."
    );
  }

  let query = supabase
    .from("inventaris")
    .update(payload)
    .eq("id", id);

  /*
   * Admin hanya boleh edit barang sekolahnya sendiri.
   */
  if (profile.role === "admin_sekolah") {
    query = query.eq(
      "sekolah_id",
      profile.sekolah_id
    );
  }

  return await query;
}

export async function hapusInventaris(
  id: number
) {
  const profile = await getProfileScope();

  if (profile.role === "anggota") {
    throw new Error(
      "Kamu tidak memiliki izin untuk menghapus inventaris."
    );
  }

  let query = supabase
    .from("inventaris")
    .delete()
    .eq("id", id);

  /*
   * Admin sekolah hanya bisa hapus miliknya.
   */
  if (profile.role === "admin_sekolah") {
    if (!profile.sekolah_id) {
      throw new Error(
        "Admin belum memiliki sekolah."
      );
    }

    query = query.eq(
      "sekolah_id",
      profile.sekolah_id
    );
  }

  return await query;
}