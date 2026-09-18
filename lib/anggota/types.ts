export interface Anggota {
  id: number;

  user_id?: string | null;

  nama: string;

  nisn: string;

  nama_ibu_kandung: string;

  sekolah_id: number;

  sekolah?: string | null;

  jabatan: string;

  status: string;

  foto?: string | File | null;

  created_at?: string;
}