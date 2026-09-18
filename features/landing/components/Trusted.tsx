export default function Trusted() {
  const schools = [
    "SMAN 1",
    "SMAN 2",
    "SMKN 1",
    "MAN 1",
    "SMPN 1",
    "PMI",
  ];

  return (
    <section className="mt-28">
      <div className="mx-auto max-w-7xl px-6">

        <p className="mb-8 text-center text-sm uppercase tracking-[0.35em] text-slate-500">
          Dipercaya oleh Sekolah & Organisasi
        </p>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {schools.map((school) => (
            <div
              key={school}
              className="
              flex
              h-20
              items-center
              justify-center
              rounded-2xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              transition
              duration-300
              hover:-translate-y-1
              hover:border-blue-500/40
              hover:bg-blue-500/10
              "
            >
              <span className="font-semibold text-slate-300">
                {school}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}