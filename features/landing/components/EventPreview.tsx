"use client";

import Image from "next/image";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";

const events = [
  {
    id: 1,
    nama: "Latihan Rutin PMR",
    tanggal: "12 Juli 2026",
    lokasi: "SMAN 1 Enrekang",
    image: "/images/events/event-1.jpg",
  },
  {
    id: 2,
    nama: "Donor Darah",
    tanggal: "20 Juli 2026",
    lokasi: "PMI Enrekang",
    image: "/images/events/event-2.jpg",
  },
  {
    id: 3,
    nama: "Jumbara Kabupaten",
    tanggal: "28 Juli 2026",
    lokasi: "Lapangan Batili",
    image: "/images/events/event-3.jpg",
  },
];

export default function EventPreview() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 flex items-center justify-between">

          <div>

            <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              EVENT
            </span>

            <h2 className="mt-5 text-5xl font-black text-white">
              Event Terbaru
            </h2>

            <p className="mt-4 max-w-xl text-slate-400">
              Ikuti berbagai kegiatan PMR yang akan datang.
            </p>

          </div>

          <button className="hidden items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-white transition hover:bg-white/10 md:flex">
            Semua Event
            <ArrowRight size={18} />
          </button>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {events.map((event) => (

            <div
              key={event.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-blue-500/40"
            >

              <div className="relative h-56">

                <Image
                  src={event.image}
                  alt={event.nama}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold text-white">
                  {event.nama}
                </h3>

                <div className="mt-5 flex items-center gap-2 text-slate-400">

                  <CalendarDays size={18} />

                  {event.tanggal}

                </div>

                <div className="mt-3 flex items-center gap-2 text-slate-400">

                  <MapPin size={18} />

                  {event.lokasi}

                </div>

                <button className="mt-7 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition hover:scale-[1.02]">

                  Detail Event

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}