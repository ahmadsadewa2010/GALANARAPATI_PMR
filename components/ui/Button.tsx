import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-xl px-5 py-3 font-medium transition-all duration-300",
        {
          "bg-blue-600 hover:bg-blue-700 text-white":
            variant === "primary",

          "bg-slate-800 hover:bg-slate-700 text-white":
            variant === "secondary",

          "bg-red-600 hover:bg-red-700 text-white":
            variant === "danger",
        },
        className
      )}
    >
      {children}
    </button>
  );
}