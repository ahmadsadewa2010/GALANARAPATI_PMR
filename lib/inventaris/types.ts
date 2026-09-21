export type KepemilikanInventaris =
  | "induk"
  | "sekolah";

export type KondisiInventaris =
  | "Baik"
  | "Perawatan"
  | "Rusak"
  | "Hilang";

export interface InventarisSekolah {
  id: number;
  nama: string;
}

export interface Inventaris {
  id: number;

  nama: string;
  kategori: string;

  jumlah: number;
  harga: number;

  kondisi: KondisiInventaris;

  kepemilikan: KepemilikanInventaris;

  sekolah_id: number | null;

  sekolah?: InventarisSekolah | null;

  lokasi: string;

  tanggal_masuk: string;

  foto: string | null;

  keterangan: string | null;

  created_at?: string;
  updated_at?: string;
}

export type InventarisFormData = Omit<
  Inventaris,
  "id" | "created_at" | "updated_at" | "sekolah"
>;