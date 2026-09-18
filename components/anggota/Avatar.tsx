"use client";

import { getFotoUrl } from "@/lib/storage/anggota";

interface Props {
  nama: string;
  id: number;
  foto?: string | null;
}

export default function Avatar({
  nama,
  id,
  foto,
}: Props) {
  return (
    <div className="flex items-center gap-3">

      {foto ? (
        <img
          src={getFotoUrl(foto)}
          alt={nama}
          className="
            h-11
            w-11
            rounded-full
            object-cover
            ring-2
            ring-blue-500
            shadow-lg
            shadow-blue-500/20
          "
        />
      ) : (
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-blue-500
            via-cyan-500
            to-indigo-600
            font-bold
            text-white
            shadow-lg
            shadow-blue-500/20
          "
        >
          {nama.charAt(0).toUpperCase()}
        </div>
      )}

      <div>
        <h4 className="font-semibold text-white">
          {nama}
        </h4>

        <p className="text-xs text-slate-400">
          ID #{String(id).padStart(4, "0")}
        </p>
      </div>

    </div>
  );
}