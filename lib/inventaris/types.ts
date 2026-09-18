export interface Inventaris {
  id: number;

  nama: string;
  kategori: string;

  jumlah: number;
  harga: number;

  kondisi: "Baik" | "Perawatan" | "Rusak" | "Hilang";

  lokasi: string;

  tanggal_masuk: string;

  foto?: string;

  keterangan?: string;
}