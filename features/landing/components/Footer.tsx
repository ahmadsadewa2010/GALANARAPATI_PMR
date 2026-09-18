import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-40 border-t border-white/10">

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">

        <div>

          <h2 className="text-2xl font-black text-white">

            GALANARAPATI

          </h2>

          <p className="mt-5 text-slate-400 leading-7">

            Platform Digital Manajemen PMR
            untuk sekolah di Indonesia.

          </p>

        </div>

        <div>

          <h3 className="mb-5 font-bold text-white">

            Navigasi

          </h3>

          <div className="space-y-3">

            <Link href="/">Beranda</Link>

            <br />

            <Link href="/">Fitur</Link>

            <br />

            <Link href="/">Event</Link>

            <br />

            <Link href="/">FAQ</Link>

          </div>

        </div>

        <div>

          <h3 className="mb-5 font-bold text-white">

            Kontak

          </h3>

          <p className="text-slate-400">

            info@galanarapati.id

          </p>

          <p className="text-slate-400">

            Kabupaten Enrekang

          </p>

        </div>

        <div>

          <h3 className="mb-5 font-bold text-white">

            Versi

          </h3>

          <p className="text-slate-400">

            GALANARAPATI v1.0

          </p>

        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-slate-500">

        © 2026 GALANARAPATI. All Rights Reserved.

      </div>

    </footer>
  );
}