"use client";

import {
  Users,
  School,
  Wallet,
  CalendarDays,
  ClipboardCheck,
  FileText,
  Package,
  ArrowUpRight,
  Plus,
  UserPlus,
  CalendarPlus,
  Receipt,
  ShieldCheck,
  UserRound,
  Clock,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "@/features/auth/AuthProvider";
import { usePermission } from "@/features/auth/hooks/usePermission";

import { useRouter } from "next/navigation";


// =====================================================
// TYPES
// =====================================================

type Role = "super_admin" | "admin_sekolah" | "anggota";


// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  href,
}: {
  title: string;
  value: string;
  description: string;
  icon: any;
  href?: string;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => href && router.push(href)}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900"
    >
      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl transition-all group-hover:bg-cyan-400/20" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <Icon size={22} className="text-cyan-300" />
          </div>

          {href && (
            <ArrowUpRight
              size={18}
              className="text-slate-500 transition group-hover:text-cyan-300"
            />
          )}
        </div>

        <p className="text-sm font-medium text-slate-400">
          {title}
        </p>

        <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">
          {value}
        </h3>

        <p className="mt-2 text-xs text-emerald-400">
          {description}
        </p>
      </div>
    </button>
  );
}


// =====================================================
// WELCOME CARD
// =====================================================

function WelcomeCard({
  name,
  role,
}: {
  name: string;
  role: Role;
}) {
  const roleName = {
    super_admin: "Super Admin",
    admin_sekolah: "Admin Sekolah",
    anggota: "Anggota",
  }[role];

  return (
    <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-600 via-cyan-500 to-sky-400 p-8 shadow-2xl shadow-cyan-900/20">
      {/* Background decoration */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

      <div className="absolute -bottom-32 left-1/2 h-72 w-72 rounded-full bg-blue-900/20 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck
            size={18}
            className="text-white/90"
          />

          <span className="text-sm font-medium text-white/80">
            {roleName}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Selamat Datang, {name} 👋
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-white/80 md:text-base">
          Selamat datang di PMR Management System.
          Kelola aktivitas, anggota, kegiatan, dan
          administrasi PMR dari satu dashboard.
        </p>
      </div>
    </section>
  );
}


// =====================================================
// QUICK ACTION
// =====================================================

function QuickAction({
  title,
  description,
  icon: Icon,
  href,
}: {
  title: string;
  description: string;
  icon: any;
  href: string;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left transition-all hover:border-cyan-400/30 hover:bg-slate-800/80"
    >
      <div className="rounded-xl bg-cyan-400/10 p-3">
        <Icon
          size={20}
          className="text-cyan-300"
        />
      </div>

      <div className="flex-1">
        <p className="font-semibold text-white">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>

      <ChevronRight
        size={18}
        className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-300"
      />
    </button>
  );
}


// =====================================================
// ACTIVITY
// =====================================================

function ActivityItem({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex gap-4 border-b border-white/5 py-4 last:border-0">
      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/40" />

      <div className="flex-1">
        <p className="text-sm font-medium text-white">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>

        <p className="mt-2 flex items-center gap-1 text-[11px] text-slate-600">
          <Clock size={11} />
          {time}
        </p>
      </div>
    </div>
  );
}


// =====================================================
// SUPER ADMIN DASHBOARD
// =====================================================

function SuperAdminDashboard() {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Anggota"
          value="248"
          description="↑ 18 bulan ini"
          icon={Users}
          href="/dashboard/anggota"
        />

        <StatCard
          title="Sekolah Mitra"
          value="18"
          description="↑ 2 sekolah baru"
          icon={School}
          href="/dashboard/sekolah"
        />

        <StatCard
          title="Saldo Kas"
          value="Rp 12 Jt"
          description="↑ 12% bulan ini"
          icon={Wallet}
          href="/dashboard/kas"
        />

        <StatCard
          title="Event Aktif"
          value="6"
          description="↑ 1 event baru"
          icon={CalendarDays}
          href="/dashboard/event"
        />

      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">
                Aktivitas Terbaru
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Aktivitas sistem terbaru
              </p>
            </div>

            <FileText
              size={20}
              className="text-slate-500"
            />
          </div>

          <ActivityItem
            title="Anggota baru ditambahkan"
            description="Data anggota baru berhasil masuk."
            time="10 menit lalu"
          />

          <ActivityItem
            title="Presensi kegiatan diperbarui"
            description="Data presensi kegiatan berhasil diperbarui."
            time="35 menit lalu"
          />

          <ActivityItem
            title="Event baru dibuat"
            description="Agenda kegiatan baru telah dibuat."
            time="1 jam lalu"
          />

          <ActivityItem
            title="Transaksi kas dicatat"
            description="Transaksi keuangan baru ditambahkan."
            time="2 jam lalu"
          />
        </div>


        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="font-semibold text-white">
            Quick Actions
          </h2>

          <p className="mt-1 mb-5 text-xs text-slate-500">
            Aksi cepat administrator
          </p>

          <div className="space-y-3">

            <QuickAction
              title="Tambah Anggota"
              description="Daftarkan anggota baru"
              icon={UserPlus}
              href="/dashboard/anggota"
            />

            <QuickAction
              title="Buat Event"
              description="Tambahkan kegiatan baru"
              icon={CalendarPlus}
              href="/dashboard/event"
            />

            <QuickAction
              title="Catat Transaksi"
              description="Kelola transaksi kas"
              icon={Receipt}
              href="/dashboard/kas"
            />

          </div>
        </div>

      </div>
    </>
  );
}


// =====================================================
// ADMIN SEKOLAH DASHBOARD
// =====================================================

function AdminSekolahDashboard() {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Anggota Sekolah"
          value="86"
          description="↑ 7 bulan ini"
          icon={Users}
          href="/dashboard/anggota"
        />

        <StatCard
          title="Kegiatan"
          value="12"
          description="3 kegiatan mendatang"
          icon={CalendarDays}
          href="/dashboard/event"
        />

        <StatCard
          title="Presensi"
          value="94%"
          description="Kehadiran bulan ini"
          icon={ClipboardCheck}
          href="/dashboard/presensi"
        />

        <StatCard
          title="Saldo Kas"
          value="Rp 4,8 Jt"
          description="↑ 8% bulan ini"
          icon={Wallet}
          href="/dashboard/kas"
        />

      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">

          <h2 className="font-semibold text-white">
            Kegiatan Mendatang
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Agenda sekolah
          </p>

          <ActivityItem
            title="Latihan Gabungan"
            description="Kegiatan PMR sekolah"
            time="Besok • 15:00"
          />

          <ActivityItem
            title="Evaluasi Anggota"
            description="Evaluasi kegiatan bulanan"
            time="Sabtu • 09:00"
          />

          <ActivityItem
            title="Rapat Pengurus"
            description="Rapat koordinasi"
            time="Senin • 13:00"
          />

        </div>


        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">

          <h2 className="font-semibold text-white">
            Aksi Cepat
          </h2>

          <p className="mt-1 mb-5 text-xs text-slate-500">
            Kelola aktivitas sekolah
          </p>

          <div className="space-y-3">

            <QuickAction
              title="Tambah Anggota"
              description="Tambah anggota sekolah"
              icon={UserPlus}
              href="/dashboard/anggota"
            />

            <QuickAction
              title="Buat Event"
              description="Buat kegiatan sekolah"
              icon={CalendarPlus}
              href="/dashboard/event"
            />

            <QuickAction
              title="Presensi"
              description="Kelola kehadiran anggota"
              icon={ClipboardCheck}
              href="/dashboard/presensi"
            />

          </div>

        </div>

      </div>
    </>
  );
}


// =====================================================
// ANGGOTA DASHBOARD
// =====================================================

function AnggotaDashboard() {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        <StatCard
          title="Event Mendatang"
          value="3"
          description="Ada kegiatan minggu ini"
          icon={CalendarDays}
          href="/dashboard/event"
        />

        <StatCard
          title="Presensi"
          value="92%"
          description="Kehadiran kamu"
          icon={ClipboardCheck}
          href="/dashboard/presensi"
        />

        <StatCard
          title="Profil"
          value="Aktif"
          description="Profil kamu aktif"
          icon={UserRound}
          href="/dashboard/profil"
        />

      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">

          <h2 className="font-semibold text-white">
            Event Terdekat
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Jangan sampai terlewat
          </p>

          <ActivityItem
            title="Latihan Rutin PMR"
            description="Latihan pertolongan pertama"
            time="Besok • 15:00"
          />

          <ActivityItem
            title="Latihan Gabungan"
            description="Kegiatan PMR Wira"
            time="Sabtu • 08:00"
          />

          <ActivityItem
            title="Rapat Anggota"
            description="Pertemuan anggota"
            time="Minggu • 09:00"
          />

        </div>


        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">

          <h2 className="font-semibold text-white">
            Menu Saya
          </h2>

          <p className="mt-1 mb-5 text-xs text-slate-500">
            Akses cepat anggota
          </p>

          <div className="space-y-3">

            <QuickAction
              title="Lihat Event"
              description="Lihat semua kegiatan"
              icon={CalendarDays}
              href="/dashboard/event"
            />

            <QuickAction
              title="Presensi"
              description="Lihat riwayat kehadiran"
              icon={ClipboardCheck}
              href="/dashboard/presensi"
            />

            <QuickAction
              title="Profil Saya"
              description="Lihat dan kelola profil"
              icon={UserRound}
              href="/dashboard/profil"
            />

          </div>

        </div>

      </div>
    </>
  );
}


// =====================================================
// MAIN DASHBOARD
// =====================================================

export default function DashboardPage() {

  const { profile, user, loading } = useAuth();

  const { can } = usePermission();


  // ---------------------------------------------------
  // Loading
  // ---------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400" />

          <p className="text-sm text-slate-500">
            Memuat dashboard...
          </p>

        </div>
      </div>
    );
  }


  // ---------------------------------------------------
  // No User
  // ---------------------------------------------------

  if (!user || !profile) {
    return null;
  }


  // ---------------------------------------------------
  // Role
  // ---------------------------------------------------

  const role = profile.role as Role;


  // ---------------------------------------------------
  // User Name
  // ---------------------------------------------------

  const name =
    profile.name ||
    profile.full_name ||
    user.email?.split("@")[0] ||
    "User";


  // ---------------------------------------------------
  // Dashboard Permission
  // ---------------------------------------------------

  if (!can("dashboard.view")) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center p-8">

        <div className="max-w-md text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
            <ShieldCheck
              size={30}
              className="text-red-400"
            />
          </div>

          <h1 className="text-2xl font-bold text-white">
            Akses Ditolak
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Akun kamu tidak memiliki izin untuk
            mengakses dashboard.
          </p>

        </div>

      </main>
    );
  }


  return (
    <main className="min-h-screen">

      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}

      <WelcomeCard
        name={name}
        role={role}
      />


      {/* ============================================ */}
      {/* ROLE DASHBOARD */}
      {/* ============================================ */}

      {role === "super_admin" && (
        <SuperAdminDashboard />
      )}

      {role === "admin_sekolah" && (
        <AdminSekolahDashboard />
      )}

      {role === "anggota" && (
        <AnggotaDashboard />
      )}


      {/* ============================================ */}
      {/* UNKNOWN ROLE */}
      {/* ============================================ */}

      {![
        "super_admin",
        "admin_sekolah",
        "anggota",
      ].includes(role) && (

        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center">

          <ShieldCheck
            size={32}
            className="mx-auto mb-4 text-red-400"
          />

          <h2 className="text-xl font-bold text-white">
            Role Tidak Dikenali
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Role akun belum dikonfigurasi dalam sistem.
          </p>

        </div>

      )}

    </main>
  );
}