"use client";

interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function RememberMe({
  checked,
  onChange,
}: RememberMeProps) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 select-none">

      <div className="relative">

        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />

        <div
          className="
            h-5
            w-5
            rounded-md
            border
            border-white/20
            bg-slate-900
            transition-all
            duration-200

            peer-checked:border-blue-500
            peer-checked:bg-blue-600

            peer-focus:ring-4
            peer-focus:ring-blue-500/20
          "
        />

        <svg
          viewBox="0 0 24 24"
          className="
            pointer-events-none
            absolute
            left-1
            top-1
            h-3
            w-3
            scale-0
            text-white
            transition-all
            duration-200
            peer-checked:scale-100
          "
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>

      </div>

      <span className="text-sm text-slate-400 transition group-hover:text-white">
        Ingat Saya
      </span>

    </label>
  );
}