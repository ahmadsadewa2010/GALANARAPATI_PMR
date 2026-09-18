"use client";

import Image from "next/image";
import { ArrowUpRight, Users, CalendarDays, Wallet } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="relative mt-40 overflow-hidden">

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* Left */}

        <div>

          <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            DASHBOARD
          </span>

          <h2 className="mt-6 text-5xl font-black text-white leading-tight">

            Semua Data
            <br />

            Dalam Satu Dashboard

          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-400">

            Kelola anggota, kas, inventaris,
            presensi QR, event,
            hingga laporan hanya dari
            satu dashboard modern.

          </p>

          <div className="mt-10 space-y-5">

            {[
              {
                icon: Users,
                title: "Data Anggota",
              },

              {
                icon: CalendarDays,
                title: "Event Management",
              },

              {
                icon: Wallet,
                title: "Kas Digital",
              },

            ].map((item) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.title}
                  className="flex items-center gap-4"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500">

                    <Icon className="text-white" />

                  </div>

                  <div>

                    <h3 className="font-semibold text-white">

                      {item.title}

                    </h3>

                    <p className="text-sm text-slate-400">

                      Cepat • Aman • Modern

                    </p>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

        {/* Right */}

        <div className="relative">

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl">

            <Image
              src="/images/dashboard-preview.png"
              alt="Dashboard"
              width={1400}
              height={900}
              className="rounded-3xl"
            />

          </div>

          {/* Floating */}

          <div className="absolute -top-6 -left-6 rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 backdrop-blur-xl">

            <p className="text-xs text-slate-400">

              Anggota Aktif

            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">

              1.245

            </h3>

          </div>

          <div className="absolute -bottom-6 right-0 rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 backdrop-blur-xl">

            <div className="flex items-center gap-2">

              <ArrowUpRight className="text-green-400" />

              <span className="text-green-400">

                +18%

              </span>

            </div>

            <p className="mt-2 text-sm text-slate-400">

              Aktivitas Bulan Ini

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}