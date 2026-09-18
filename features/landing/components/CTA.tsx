import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="mt-40">

      <div className="mx-auto max-w-7xl px-6">

        <div
          className="
          overflow-hidden
          rounded-[40px]
          border
          border-blue-500/20
          bg-gradient-to-br
          from-blue-700
          via-blue-600
          to-cyan-500
          p-16
          text-center
          shadow-2xl
          "
        >

          <h2 className="text-5xl font-black text-white">

            Siap Membawa PMR
            <br />
            Menuju Era Digital?

          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-blue-100">

            Bergabung bersama GALANARAPATI dan kelola
            organisasi PMR lebih mudah, cepat, dan modern.

          </p>

          <button
            className="
            mt-10
            inline-flex
            items-center
            gap-3
            rounded-2xl
            bg-white
            px-8
            py-4
            font-semibold
            text-blue-700
            transition
            hover:scale-105
            "
          >

            Mulai Sekarang

            <ArrowRight size={20} />

          </button>

        </div>

      </div>

    </section>
  );
}