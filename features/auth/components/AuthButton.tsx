"use client";

import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface AuthButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function AuthButton({
  children,
  loading = false,
  disabled,
  className = "",
  ...props
}: AuthButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`
        group
        relative
        flex
        w-full
        items-center
        justify-center
        overflow-hidden
        rounded-2xl

        bg-gradient-to-r
        from-blue-600
        via-cyan-500
        to-blue-500

        px-5
        py-3.5

        font-semibold
        text-white

        shadow-lg
        shadow-blue-500/20

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:shadow-xl
        hover:shadow-blue-500/30

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-70
        disabled:hover:translate-y-0
        disabled:hover:shadow-lg

        ${className}
      `}
    >
      <span
        className="
          absolute
          inset-0
          bg-white/10
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {loading ? (
        <span className="relative flex items-center gap-2">
          <Loader2
            size={18}
            className="animate-spin"
          />
          Memproses...
        </span>
      ) : (
        <span className="relative">
          {children}
        </span>
      )}
    </button>
  );
}