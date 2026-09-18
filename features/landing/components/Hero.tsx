"use client";

import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36">

      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[140px]" />

      <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[150px]" />

      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2">

        <div>

          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">

            Sistem Digital PMR

          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight text-white lg:text-7xl">

            Kelola
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">

              {" "}PMR{" "}

            </span>

            Lebih Modern.

          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">

            GALANARAPATI membantu sekolah
            mengelola anggota, event,
            inventaris,
            kas,
            presensi QR,
            hingga sertifikat
            dalam satu aplikasi.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-4 font-semibold text-white shadow-xl transition hover:scale-105">

              Mulai Sekarang

              <ArrowRight size={18} />

            </button>

            <button className="rounded-2xl border border-white/10 px-7 py-4 text-white transition hover:bg-white/10">

              Lihat Demo

            </button>

          </div>

        </div>

        <div className="relative">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl">

            <img
              src="/images/dashboard-preview.png"
              alt="Dashboard"
              className="rounded-2xl"
            />

          </div>

          <div className="absolute -left-6 top-12 rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-xl">

            👥

            <p className="mt-2 text-sm text-slate-400">

              Anggota

            </p>

            <h3 className="text-2xl font-bold text-white">

              1.245

            </h3>

          </div>

          <div className="absolute -right-6 bottom-10 rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-xl">

            📅

            <p className="mt-2 text-sm text-slate-400">

              Event

            </p>

            <h3 className="text-2xl font-bold text-white">

              98

            </h3>

          </div>

        </div>

      </div>

    </section>
  );
}