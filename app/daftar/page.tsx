"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function DaftarPage() {
  const [nama, setNama] = useState("");
  const [nisn, setNisn] = useState("");
  const [namaIbuKandung, setNamaIbuKandung] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sekolahId, setSekolahId] = useState("");

  const [sekolahList, setSekolahList] = useState<
    { id: number; nama: string }[]
  >([]);

  const [loadingSekolah, setLoadingSekolah] = useState(true);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // AMBIL DAFTAR SEKOLAH
  // =====================================================

  useEffect(() => {
    loadSekolah();
  }, []);

  const router = useRouter();
  
  const loadSekolah = async () => {
    setLoadingSekolah(true);

    const { data, error } = await supabase
      .from("sekolah")
      .select("id, nama")
      .eq("aktif", true)
      .order("nama", { ascending: true });

    if (error) {
      console.error(
        "LOAD SEKOLAH ERROR:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Daftar sekolah gagal dimuat.",
        background: "#0f172a",
        color: "#fff",
      });
    } else {
      setSekolahList(data ?? []);
    }

    setLoadingSekolah(false);
  };

  // =====================================================
  // DAFTAR
  // =====================================================

  const handleDaftar = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    // ---------------------------------------------
    // VALIDASI
    // ---------------------------------------------

    if (
      !nama.trim() ||
      !nisn.trim() ||
      !namaIbuKandung.trim() ||
      !email.trim() ||
      !password ||
      !sekolahId
    ) {
      Swal.fire({
        icon: "warning",
        title: "Data belum lengkap",
        text: "Semua field wajib diisi.",
        background: "#0f172a",
        color: "#fff",
      });

      return;
    }

    if (nisn.trim().length < 10) {
      Swal.fire({
        icon: "warning",
        title: "NISN tidak valid",
        text: "Silakan periksa kembali NISN.",
        background: "#0f172a",
        color: "#fff",
      });

      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Password terlalu pendek",
        text: "Password minimal 6 karakter.",
        background: "#0f172a",
        color: "#fff",
      });

      return;
    }

    setLoading(true);

    try {
      // ---------------------------------------------
      // PASTIKAN SEKOLAH VALID
      // ---------------------------------------------

      const selectedSchool =
        sekolahList.find(
          (item) =>
            item.id === Number(sekolahId)
        );

      if (!selectedSchool) {
        throw new Error(
          "Sekolah yang dipilih tidak valid."
        );
      }

      // ---------------------------------------------
      // CREATE AUTH ACCOUNT
      // ---------------------------------------------

      async function kirimUlangVerifikasi() {
          if (!email.trim()) {
            await Swal.fire({
              icon: "warning",
              title: "Email Belum Diisi",
              text: "Masukkan email terlebih dahulu.",
            });

            return;
          }

          const { error } = await supabase.auth.resend({
            type: "signup",
            email: email.trim(),
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
          });

          if (error) {
            await Swal.fire({
              icon: "error",
              title: "Gagal Mengirim",
              text: error.message,
            });

            return;
          }

          await Swal.fire({
            icon: "success",
            title: "Email Dikirim",
            text: "Silakan cek inbox atau folder spam email Anda.",
          });
        }

      const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback`,
              data: {
                full_name: nama.trim(),
                nisn: nisn.trim(),
                nama_ibu_kandung: namaIbuKandung.trim(),
                sekolah_id: Number(sekolahId),
              },
            },
          });
          
      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          const result = await Swal.fire({
            icon: "warning",
            title: "Email Belum Diverifikasi",
            text: "Silakan verifikasi email terlebih dahulu.",
            showCancelButton: true,
            confirmButtonText: "Kirim Ulang",
            cancelButtonText: "Tutup",
          });

          if (result.isConfirmed) {
            await kirimUlangVerifikasi();
          }

          return;
        }

        throw error;
      }

      await Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil",
        text: "Silakan cek inbox email Anda dan klik tautan verifikasi sebelum login.",
        confirmButtonText: "Mengerti",
      });

      router.push("/login");


      if (!data.user) {
        throw new Error(
          "Akun gagal dibuat."
        );
      }

      // ---------------------------------------------
      // BERHASIL
      // ---------------------------------------------

      await Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil",
        text:
          "Akun dan data anggota berhasil dibuat.",
        confirmButtonText: "Masuk",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#2563eb",
      });

      // ---------------------------------------------
      // REDIRECT LOGIN
      // ---------------------------------------------

      window.location.href = "/login";

    } catch (error: any) {
      console.error(
        "DAFTAR ERROR:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Pendaftaran Gagal",
        text:
          error?.message ??
          "Terjadi kesalahan saat mendaftar.",
        background: "#0f172a",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">

      <div className="mx-auto flex min-h-[90vh] max-w-6xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-xl md:grid-cols-2">

          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 p-10 md:flex">

            <div>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold backdrop-blur">
                PM
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                Bergabung dengan
                <br />
                Sistem PMR
              </h1>

              <p className="mt-5 max-w-md text-blue-100">
                Daftarkan akun anggota kamu
                dan lengkapi data pendataan
                PMR dalam satu langkah.
              </p>
            </div>

            <div className="space-y-3 text-sm text-blue-100">
              <p>✓ Data anggota otomatis tersimpan</p>
              <p>✓ Akun langsung terhubung dengan anggota</p>
              <p>✓ Sekolah berasal dari data resmi sistem</p>
            </div>

          </div>

          {/* ================================================= */}
          {/* RIGHT / FORM */}
          {/* ================================================= */}

          <div className="p-6 sm:p-10">

            <div className="mb-8">

              <p className="text-sm font-medium text-blue-400">
                PENDAFTARAN ANGGOTA
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Buat Akun
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Lengkapi data diri untuk
                mendaftarkan akun anggota.
              </p>

            </div>

            <form
              onSubmit={handleDaftar}
              className="space-y-5"
            >

              {/* NAMA */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Nama Lengkap
                </label>

                <input
                  type="text"
                  value={nama}
                  onChange={(e) =>
                    setNama(e.target.value)
                  }
                  placeholder="Masukkan nama lengkap"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* NISN */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  NISN
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  value={nisn}
                  onChange={(e) =>
                    setNisn(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder="Masukkan NISN"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* NAMA IBU */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Nama Ibu Kandung
                </label>

                <input
                  type="text"
                  value={namaIbuKandung}
                  onChange={(e) =>
                    setNamaIbuKandung(
                      e.target.value
                    )
                  }
                  placeholder="Masukkan nama ibu kandung"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* SEKOLAH */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Asal Sekolah
                </label>

                <select
                  value={sekolahId}
                  onChange={(e) =>
                    setSekolahId(
                      e.target.value
                    )
                  }
                  disabled={loadingSekolah}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">
                    {loadingSekolah
                      ? "Memuat sekolah..."
                      : "Pilih asal sekolah"}
                  </option>

                  {sekolahList.map(
                    (sekolah) => (
                      <option
                        key={sekolah.id}
                        value={sekolah.id}
                      >
                        {sekolah.nama}
                      </option>
                    )
                  )}
                </select>

                <p className="mt-2 text-xs text-slate-500">
                  Pilih sekolah yang terdaftar
                  pada sistem.
                </p>
              </div>

              {/* EMAIL */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="contoh@email.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* PASSWORD */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Minimal 6 karakter"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Mendaftarkan..."
                  : "Daftar Sekarang"}
              </button>

            </form>

            {/* LOGIN */}

            <p className="mt-6 text-center text-sm text-slate-400">
              Sudah punya akun?{" "}
              <a
                href="/login"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Masuk
              </a>
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}