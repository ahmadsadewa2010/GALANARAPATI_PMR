"use client";

export default function AuthLogo() {
  return (
    <div className="mb-10 flex flex-col items-center">

      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-3xl
          bg-gradient-to-br
          from-blue-600
          via-cyan-500
          to-indigo-600
          shadow-[0_20px_60px_rgba(37,99,235,.45)]
        "
      >
        <span className="text-3xl font-black text-white">
          G
        </span>
      </div>

      <h1 className="mt-6 text-3xl font-black tracking-tight text-white">
        GALANARAPATI
      </h1>

      <p className="mt-2 text-center text-sm text-slate-400">
        Platform Digital Manajemen PMR Indonesia
      </p>

    </div>
  );
}