export type PresensiStatus =
  | "Hadir"
  | "Izin"
  | "Sakit"
  | "Alpa";

export interface Presensi {
  id: number;
  anggota_id: number;
  status: PresensiStatus;
  tanggal: string;
  created_at?: string;

  anggota?: {
    id: number;
    nama: string;
    sekolah_id: number;
  };
}

export interface PresensiInput {
  anggota_id: number;
  status: PresensiStatus;
  tanggal: string;
}