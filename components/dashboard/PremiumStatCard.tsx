"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";

interface Props {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  percent: number;
  increase: string;
}

export default function PremiumStatCard({
  title,
  value,
  icon,
  color,
  percent,
  increase,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-800
      bg-slate-900/80
      backdrop-blur-xl
      p-6
      shadow-xl
      transition
      "
    >
      <div
        className={`absolute top-0 left-0 h-1 w-full ${color}`}
      />

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold">

            <CountUp
              end={value}
              duration={2}
            />

          </h2>

          <p className="mt-2 text-green-400 text-sm">
            ↑ {increase}
          </p>

        </div>

        <div
          className="
          rounded-2xl
          bg-slate-800
          p-4
          "
        >
          {icon}
        </div>

      </div>

      <div className="mt-6">

        <div className="h-2 rounded-full bg-slate-800">

          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${percent}%`,
            }}
            transition={{
              duration: 1.4,
            }}
            className={`h-2 rounded-full ${color}`}
          />

        </div>

      </div>
    </motion.div>
  );
}