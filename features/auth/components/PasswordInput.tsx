"use client";

import { useState, InputHTMLAttributes, ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
}

export default function PasswordInput({
  label,
  icon,
  error,
  className = "",
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

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
          type={showPassword ? "text" : "password"}
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
            ${icon ? "pl-12" : "pl-4"}
            pr-12
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

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            rounded-lg
            p-1
            text-slate-500
            transition-all
            duration-200
            hover:bg-white/5
            hover:text-blue-400
          "
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}