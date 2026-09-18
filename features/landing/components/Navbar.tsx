"use client";

import AuthModal from "@/features/auth/AuthModal";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menus = [
    "Beranda",
    "Fitur",
    "Event",
    "FAQ",
  ];

  return (
    <header
      className={`
      fixed
      left-0
      right-0
      top-0
      z-50
      transition-all
      duration-300

      ${
        scrolled
          ? "border-b border-white/10 bg-slate-950/70 backdrop-blur-xl"
          : "bg-transparent"
      }
      `}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 font-bold text-white shadow-xl">
            G
          </div>

          <div>
            <h1 className="font-bold text-white">
              GALANARAPATI
            </h1>

            <p className="text-xs text-slate-400">
              PMR Digital Platform
            </p>
          </div>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {menus.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden gap-3 md:flex">
          <button
  onClick={() => setOpenAuth(true)}
  className="rounded-xl border border-white/10 px-5 py-2 text-white transition hover:bg-white/10"
>
  Masuk
</button>
<button
  onClick={() => setOpenAuth(true)}
  className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 font-medium text-white shadow-lg transition hover:scale-105"
>
  Daftar
</button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-900 p-6 md:hidden">
          {menus.map((item) => (
            <a
              key={item}
              href="#"
              className="mb-4 block text-slate-300"
            >
              {item}
            </a>
          ))}
        </div>
      )}
      <AuthModal
  open={openAuth}
  onClose={() => setOpenAuth(false)}
/>
    </header>
  );
}