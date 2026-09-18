export default function WelcomeCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white">
          Selamat Datang 👋
        </h2>

        <p className="mt-2 text-blue-100">
          PMR Management System
        </p>

        <div className="mt-6 flex gap-4">
          <button className="rounded-xl bg-white px-5 py-3 text-blue-700 font-semibold">
            Tambah Anggota
          </button>

          <button className="rounded-xl border border-white/40 px-5 py-3 text-white">
            Lihat Event
          </button>
        </div>
      </div>

      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
      <div className="absolute right-20 bottom-0 h-28 w-28 rounded-full bg-white/10"></div>
    </div>
  );
}