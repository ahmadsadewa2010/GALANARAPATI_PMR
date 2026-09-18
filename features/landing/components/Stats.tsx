"use client";

import { Users, CalendarDays, School, Boxes } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "1.245",
    label: "Anggota Aktif",
  },
  {
    icon: School,
    value: "42",
    label: "Sekolah",
  },
  {
    icon: CalendarDays,
    value: "98",
    label: "Event",
  },
  {
    icon: Boxes,
    value: "540",
    label: "Inventaris",
  },
];

export default function Stats() {
  return (
    <section className="mt-32">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="
                group
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-8
                backdrop-blur-xl
                transition
                duration-300
                hover:-translate-y-2
                hover:border-blue-500/40
                hover:bg-blue-500/10
                "
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg">

                  <Icon className="text-white" />

                </div>

                <h2 className="text-5xl font-black text-white">

                  {item.value}

                </h2>

                <p className="mt-3 text-slate-400">

                  {item.label}

                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}