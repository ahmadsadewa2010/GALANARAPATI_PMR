"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Memverifikasi email Anda...");

  useEffect(() => {
    async function verifyEmail() {
      try {
        const tokenHash = searchParams.get("token_hash");
        const type = searchParams.get("type");
        const code = searchParams.get("code");

        // Format verifikasi menggunakan token_hash
        if (tokenHash && type) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as "email",
          });

          if (error) {
            throw error;
          }
        }

        // Format callback menggunakan PKCE code
        else if (code) {
          const { error } =
            await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            throw error;
          }
        }

        // Tidak ada token atau code
        else {
          throw new Error("Tautan verifikasi tidak valid atau sudah kedaluwarsa.");
        }

        setMessage("Email berhasil diverifikasi.");

        await Swal.fire({
          icon: "success",
          title: "Email Terverifikasi",
          text: "Email Anda berhasil diverifikasi. Sekarang Anda bisa login.",
          confirmButtonText: "Ke Halaman Login",
        });

        router.replace("/login");
      } catch (error: any) {
        console.error("VERIFY EMAIL ERROR:", error);

        setMessage("Verifikasi email gagal.");

        await Swal.fire({
          icon: "error",
          title: "Verifikasi Gagal",
          text:
            error?.message ||
            "Tautan verifikasi tidak valid atau sudah kedaluwarsa.",
          confirmButtonText: "Ke Halaman Login",
        });

        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    verifyEmail();
  }, [router, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl">
        <div className="mb-5 text-5xl">
          {loading ? "⏳" : "✉️"}
        </div>

        <h1 className="mb-3 text-2xl font-bold">
          Verifikasi Email
        </h1>

        <p className="text-slate-300">{message}</p>
      </div>
    </main>
  );
}