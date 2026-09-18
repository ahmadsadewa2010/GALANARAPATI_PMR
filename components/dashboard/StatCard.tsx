import { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color = "from-blue-500 to-cyan-500",
}: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/40">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition group-hover:opacity-10`}
      />

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div className="rounded-xl bg-blue-500/20 p-4 text-cyan-400">
          {icon}
        </div>
      </div>
    </div>
  );
}