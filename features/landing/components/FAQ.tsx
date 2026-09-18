"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faq = [
  {
    q: "Apakah aplikasi ini gratis?",
    a: "Ya, sekolah dapat menggunakan versi dasar secara gratis.",
  },
  {
    q: "Apakah mendukung banyak sekolah?",
    a: "Ya, setiap sekolah memiliki dashboard dan data masing-masing.",
  },
  {
    q: "Apakah presensi menggunakan QR Code?",
    a: "Ya, presensi menggunakan QR Code dengan validasi yang aman.",
  },
  {
    q: "Bisakah export laporan?",
    a: "Bisa ke PDF maupun Excel.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mt-40">

      <div className="mx-auto max-w-4xl px-6">

        <div className="mb-14 text-center">

          <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            FAQ
          </span>

          <h2 className="mt-5 text-5xl font-black text-white">

            Pertanyaan Umum

          </h2>

        </div>

        <div className="space-y-5">

          {faq.map((item, i) => (

            <div
              key={item.q}
              className="rounded-3xl border border-white/10 bg-white/5"
            >

              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between p-7"
              >

                <span className="text-left text-lg font-semibold text-white">

                  {item.q}

                </span>

                <ChevronDown
                  className={`transition ${
                    open === i ? "rotate-180" : ""
                  }`}
                />

              </button>

              {open === i && (

                <div className="px-7 pb-7 text-slate-400">

                  {item.a}

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}