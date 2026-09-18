import { supabase } from "@/lib/supabase";

const bulan = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export async function getKasChart() {
  const { data, error } = await supabase
    .from("kas")
    .select("tanggal, jenis, nominal");

  if (error) {
    console.error(error);

    return {
      data: [],
    };
  }

  const chart = bulan.map((b) => ({
    bulan: b,
    pemasukan: 0,
    pengeluaran: 0,
  }));

  data.forEach((item) => {
    const index = new Date(item.tanggal).getMonth();

    if (item.jenis === "Masuk") {
      chart[index].pemasukan += item.nominal;
    } else {
      chart[index].pengeluaran += item.nominal;
    }
  });

  return {
    data: chart,
  };
}