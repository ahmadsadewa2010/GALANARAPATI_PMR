import {
  CalendarDays,
  ClipboardCheck,
  Boxes,
  Wallet,
  Users,
  Award,
} from "lucide-react";

const features = [
  {
    title: "Manajemen Anggota",
    desc: "Kelola seluruh anggota PMR secara digital.",
    icon: Users,
  },
  {
    title: "Presensi QR",
    desc: "Absensi cepat menggunakan QR Code.",
    icon: ClipboardCheck,
  },
  {
    title: "Manajemen Event",
    desc: "Kelola kegiatan dan kepanitiaan.",
    icon: CalendarDays,
  },
  {
    title: "Inventaris",
    desc: "Pantau seluruh aset PMR.",
    icon: Boxes,
  },
  {
    title: "Kas Digital",
    desc: "Laporan keuangan transparan.",
    icon: Wallet,
  },
  {
    title: "Sertifikat",
    desc: "Generate sertifikat otomatis.",
    icon: Award,
  },
];

export default function Features() {
  return (
    <section className="mt-36">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            FITUR
          </span>

          <h2 className="mt-6 text-5xl font-black text-white">

            Semua Yang Dibutuhkan PMR

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">

            Satu platform untuk mengelola organisasi PMR secara modern.

          </p>

        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-8
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-3
                hover:border-blue-500/40
                "
              >
                <div
                  className="
                  absolute
                  right-0
                  top-0
                  h-32
                  w-32
                  rounded-full
                  bg-blue-500/10
                  blur-3xl
                  transition
                  group-hover:scale-150
                  "
                />

                <div className="relative">

                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg">

                    <Icon size={30} className="text-white" />

                  </div>

                  <h3 className="text-2xl font-bold text-white">

                    {feature.title}

                  </h3>

                  <p className="mt-4 leading-7 text-slate-400">

                    {feature.desc}

                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}