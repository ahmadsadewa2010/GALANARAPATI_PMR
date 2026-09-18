const data = [
  "Anggota baru ditambahkan",
  "Kas bulan Juni diperbarui",
  "Event donor darah dibuat",
  "Presensi sekolah masuk",
];

export default function ActivityFeed() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-lg font-semibold text-white">
        Aktivitas Terbaru
      </h3>

      <div className="mt-4 space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="border-b border-slate-800 pb-3"
          >
            <p className="text-slate-300">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}