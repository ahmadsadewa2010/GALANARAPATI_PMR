export interface Kas {
  id: number;
  tanggal: string;
  jenis: "Masuk" | "Keluar";
  kategori: string;
  keterangan: string;
  nominal: number;
}