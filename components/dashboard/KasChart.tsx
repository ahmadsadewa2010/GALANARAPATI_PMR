"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  data: {
    bulan: string;
    pemasukan: number;
    pengeluaran: number;
  }[];
}

function formatRupiah(value: number) {
  return "Rp " + value.toLocaleString("id-ID");
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl">

      <p className="mb-3 font-semibold text-white">
        {label}
      </p>

      <div className="space-y-2">

        <div className="flex items-center justify-between gap-8">

          <span className="text-green-400">
            🟢 Pemasukan
          </span>

          <span className="font-bold text-white">
            {formatRupiah(payload[0].value)}
          </span>

        </div>

        <div className="flex items-center justify-between gap-8">

          <span className="text-red-400">
            🔴 Pengeluaran
          </span>

          <span className="font-bold text-white">
            {formatRupiah(payload[1].value)}
          </span>

        </div>

      </div>

    </div>
  );
}

export default function KasChart({
  data,
}: Props) {
  return (
    <div className="rounded-[30px] border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl shadow-cyan-500/5">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Cash Flow Analytics
          </h2>

          <p className="mt-1 text-slate-400">
            Grafik pemasukan dan pengeluaran bulanan
          </p>

        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300">
          2026
        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={380}
      >

        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="incomeGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="#22c55e"
                stopOpacity={0.45}
              />

              <stop
                offset="100%"
                stopColor="#22c55e"
                stopOpacity={0}
              />

            </linearGradient>

            <linearGradient
              id="expenseGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="#ef4444"
                stopOpacity={0.35}
              />

              <stop
                offset="100%"
                stopColor="#ef4444"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            stroke="#334155"
            strokeDasharray="5 5"
            opacity={0.25}
          />

          <XAxis
            dataKey="bulan"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 13 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 13 }}
            tickFormatter={(value) =>
              `${value / 1000}K`
            }
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="pemasukan"
            stroke="#22c55e"
            strokeWidth={4}
            fill="url(#incomeGradient)"
            animationDuration={1200}
            dot={false}
            activeDot={{
              r: 7,
              strokeWidth: 3,
            }}
          />

          <Area
            type="monotone"
            dataKey="pengeluaran"
            stroke="#ef4444"
            strokeWidth={4}
            fill="url(#expenseGradient)"
            animationDuration={1200}
            dot={false}
            activeDot={{
              r: 7,
              strokeWidth: 3,
            }}
          />

        </AreaChart>

      </ResponsiveContainer>

      {/* Footer */}

      <div className="mt-8 flex flex-wrap gap-8">

        <div className="flex items-center gap-3">

          <div className="h-3 w-3 rounded-full bg-green-500" />

          <span className="text-slate-300">
            Pemasukan
          </span>

        </div>

        <div className="flex items-center gap-3">

          <div className="h-3 w-3 rounded-full bg-red-500" />

          <span className="text-slate-300">
            Pengeluaran
          </span>

        </div>

      </div>

    </div>
  );
}