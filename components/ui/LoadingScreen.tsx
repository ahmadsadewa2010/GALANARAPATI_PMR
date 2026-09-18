"use client";

export default function LoadingScreen() {
  return (
    <div
      className="
      fixed inset-0
      flex items-center justify-center
      bg-slate-950
      "
    >
      <div className="text-center">

        <div
          className="
          mx-auto
          h-12
          w-12
          animate-spin
          rounded-full
          border-4
          border-blue-500
          border-t-transparent
          "
        />

        <p className="mt-4 text-slate-400">
          Memuat...
        </p>

      </div>
    </div>
  );
}