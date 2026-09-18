"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import AuthLogo from "../components/AuthLogo";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import RememberMe from "../components/RememberMe";
import AuthButton from "../components/AuthButton";
import Divider from "../components/Divider";
import SocialLogin from "../components/SocialLogin";

import { useLogin } from "../hooks/useLogin";
import { getAuthError } from "@/features/auth/error";

interface LoginViewProps {
  goRegister: () => void;
  goForgot: () => void;
}

export default function LoginView({
  goRegister,
  goForgot,
}: LoginViewProps) {
  const router = useRouter();

  const { signIn, loading } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleLogin() {
    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!email.trim()) {
      setEmailError("Email wajib diisi");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password wajib diisi");
      valid = false;
    }

    if (!valid) return;

   try {
      console.log("LOGIN START");

      const result = await signIn(email, password);

      console.log("LOGIN RESULT:", result);

      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Supabase berhasil menerima login.",
        timer: 1500,
        showConfirmButton: false,
      });

      router.replace("/dashboard");

    } catch (error: unknown) {
      console.error("LOGIN ERROR:", error);

      const message =
        error instanceof Error
          ? getAuthError(error.message)
          : "Terjadi kesalahan.";

      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: message,
      });
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

  return (
    <div>

      <AuthLogo />

      <div className="mb-8 text-center">

        <h2 className="text-3xl font-bold text-white">
          Selamat Datang 👋
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Login untuk mengakses dashboard GALANARAPATI
        </p>

      </div>

      <div className="space-y-5">

        <AuthInput
          label="Email"
          type="email"
          placeholder="nama@email.com"
          icon={<Mail size={18} />}
          value={email}
          error={emailError}
          autoFocus
          onKeyDown={handleKeyDown}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          label="Password"
          placeholder="Masukkan password"
          icon={<Lock size={18} />}
          value={password}
          error={passwordError}
          onKeyDown={handleKeyDown}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between">

          <RememberMe
            checked={remember}
            onChange={setRemember}
          />

          <button
            type="button"
            onClick={goForgot}
            className="
              text-sm
              text-blue-400
              transition
              hover:text-blue-300
            "
          >
            Lupa Password?
          </button>

        </div>

        <AuthButton
          loading={loading}
          onClick={handleLogin}
        >
          Masuk ke Dashboard
        </AuthButton>

        <Divider />

        <SocialLogin />

        <div className="text-center text-sm text-slate-400">

          Belum punya akun?{" "}

          <button
            onClick={goRegister}
            className="
              font-semibold
              text-blue-400
              hover:text-blue-300
            "
          >
            Daftar
          </button>

        </div>

      </div>

    </div>
  );
}