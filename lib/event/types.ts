export interface Event {
  id: number;

  nama: string;
  deskripsi: string;

  tanggal: string;

  waktu_mulai: string;
  waktu_selesai: string;

  lokasi: string;

  penanggung_jawab: string;

  jenis: string;

  status: string;

  banner?: string;
}