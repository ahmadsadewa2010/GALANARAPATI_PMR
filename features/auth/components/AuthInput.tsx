"use client";

import { InputHTMLAttributes, ReactNode } from "react";

interface AuthInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
}

export default function AuthInput({
  label,
  icon,
  error,
  className = "",
  ...props
}: AuthInputProps) {
  return (
    <div className="space-y-2">

      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      <div className="relative group">

        {icon && (
          <div
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-500
              transition-colors
              duration-200
              group-focus-within:text-blue-400
            "
          >
            {icon}
          </div>
        )}

        <input
          {...props}
          className={`
            w-full
            rounded-2xl
            border
            ${
              error
                ? "border-red-500"
                : "border-white/10"
            }
            bg-slate-900/70
            ${
              icon ? "pl-12" : "pl-4"
            }
            pr-4
            py-3.5
            text-white
            placeholder:text-slate-500
            outline-none

            transition-all
            duration-300

            hover:border-blue-400/40

            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-500/20
            focus:bg-slate-900

            ${className}
          `}
        />

      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}

    </div>
  );
}