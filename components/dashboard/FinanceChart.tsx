"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", kas: 2500000 },
  { month: "Feb", kas: 3200000 },
  { month: "Mar", kas: 4500000 },
  { month: "Apr", kas: 5200000 },
  { month: "Mei", kas: 7600000 },
  { month: "Jun", kas: 12000000 },
];

export default function FinanceChart() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">
          Grafik Kas
        </h3>

        <p className="text-sm text-slate-400">
          Perkembangan saldo kas organisasi
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="kas"
              stroke="#3b82f6"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}