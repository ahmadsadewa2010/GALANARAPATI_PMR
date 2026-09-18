export default function QuickAction() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-lg font-semibold text-white">
        Quick Action
      </h3>

      <div className="mt-4 grid gap-3">
        <button className="rounded-xl bg-blue-600 py-3 text-white">
          Tambah Anggota
        </button>

        <button className="rounded-xl bg-slate-800 py-3 text-white">
          Tambah Event
        </button>

        <button className="rounded-xl bg-slate-800 py-3 text-white">
          Input Kas
        </button>
      </div>
    </div>
  );
}