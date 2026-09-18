"use client";

import Image from "next/image";

const images = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/4.jpg",
  "/images/gallery/5.jpg",
  "/images/gallery/6.jpg",
];

export default function Gallery() {
  return (
    <section className="mt-40">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">

          <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            GALERI
          </span>

          <h2 className="mt-5 text-5xl font-black text-white">

            Momen Bersama PMR

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">

            Dokumentasi kegiatan, pelatihan, donor darah,
            hingga Jumbara.

          </p>

        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {images.map((img) => (

            <div
              key={img}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >

              <Image
                src={img}
                alt=""
                width={800}
                height={600}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
              />

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}