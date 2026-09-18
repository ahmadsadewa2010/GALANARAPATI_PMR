export type Role =
  | "super_admin"
  | "admin"
  | "anggota";

export interface Profile {
  id: string;

  nama: string;

  role: Role;

  sekolah_id: number | null;

  foto?: string;

  aktif: boolean;
}