"use client";

import React from "react";
import Link from "next/link";


export default function Landing() {
  /*
   * =========================================================
   * LOGIN / REGISTER LOGIC
   * TIDAK DIUBAH
   * =========================================================
   */
  

  return (
    <main className="landing-page">

      {/* =====================================================
          ANIMATED AURORA BACKGROUND
      ===================================================== */}

      <div className="aurora-background">

        <div className="aurora aurora-1" />

        <div className="aurora aurora-2" />

        <div className="aurora aurora-3" />

        <div className="aurora aurora-4" />

      </div>

      {/* Moving light */}

      <div className="light-beam" />

      {/* Animated grid */}

      <div className="background-grid" />

      {/* Animated glow line */}

      <div className="glow-line" />

      {/* =====================================================
          PARTICLES
      ===================================================== */}

      <div className="particles">

        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="particle"
          />
        ))}

      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="site-header">

        <div className="logo">

          <div className="logo-mark">
            <div className="logo-cross" />
          </div>

          <div>

            <div className="logo-text">
              GALANARAPATI
            </div>

            <div className="logo-subtitle">
              KOMUNITAS PMR
            </div>

          </div>

        </div>

        <div className="header-btn">

          {/* REGISTER */}

          <Link
            href="/daftar"
            className="primary-btn"
          >
            Gabung Sekarang →
          </Link>

          <Link
            href="/login"
            className="login-btn"
          >
            Masuk
          </Link>

        </div>

      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">

            <span className="badge-dot" />

            PMR
            {" • "}
            RELAWAN MUDA
            {" • "}
            KEMANUSIAAN

          </div>

          <h1>

            Komunitas

            <span>
              GALANARAPATI
            </span>

          </h1>

          <p>
            Membangun karakter, kepemimpinan,
            dan keterampilan melalui kegiatan
            yang inspiratif. Bersama bergerak
            untuk kemanusiaan.
          </p>

          <div className="hero-action">

            {/* REGISTER */}

           <Link
            href="/daftar"
            className="primary-btn"
          >
            Gabung GALANARAPATI →
          </Link>

            <button className="outline-btn">
              Pelajari Lebih Lanjut
            </button>

          </div>

        </div>

        {/* =================================================
            HERO ORBIT
        ================================================= */}

        <div className="hero-orbit">

          <div className="hero-orbit-line" />

          <div className="hero-orbit-line" />

          <div className="hero-orbit-line" />

        </div>

      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="section">

        <div className="stats">

          <div className="stat-card glass-card">

            <h2>
              20+
            </h2>

            <p>
              Anggota Aktif
            </p>

          </div>

          <div className="stat-card glass-card">

            <h2>
              12
            </h2>

            <p>
              Event Tahunan
            </p>

          </div>

          <div className="stat-card glass-card">

            <h2>
              13
            </h2>

            <p>
              Sekolah Mitra
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          NEWS TICKER
      ===================================================== */}

      <section className="news">

        <div className="ticker">

          <div className="ticker-content">

            <span>●</span>{" "}
            Pendaftaran anggota baru dibuka JUNI 2026

            {"   •   "}

            <span>●</span>{" "}
            Diklat PMR Se-Jember Selatan

            {"   •   "}

            <span>●</span>{" "}
            Happy Camp 2026

            {"   •   "}

            <span>●</span>{" "}
            Volunteer Donor Darah

            {"   •   "}

            <span>●</span>{" "}
            Bersama Bergerak Untuk Kemanusiaan

          </div>

        </div>

      </section>

      {/* =====================================================
          EVENTS
      ===================================================== */}

      <section className="section">

        <div className="section-heading">

          <div className="section-kicker">
            Kegiatan Kami
          </div>

          <h2>
            Bergerak Bersama,
            <br />
            Berdampak Nyata.
          </h2>

          <p>
            Berbagai kegiatan untuk meningkatkan
            keterampilan, kepemimpinan, solidaritas,
            dan semangat kemanusiaan anggota PMR.
          </p>

        </div>

        <div className="events-grid">

          {/* EVENT 1 */}

          <div className="event-card glass-card">

            <div>

              <div className="event-number">
                01 / LATGAB
              </div>

              <div className="event-icon">

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                </svg>

              </div>

              <h3>
                LATGAB 2026
              </h3>

              <p>
                Pembekalan dan peningkatan
                kompetensi PMR melalui
                latihan gabungan.
              </p>

            </div>

          </div>

          {/* EVENT 2 */}

          <div className="event-card glass-card">

            <div>

              <div className="event-number">
                02 / DONOR
              </div>

              <div className="event-icon">

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3s7 6.5 7 11a7 7 0 1 1-14 0c0-4.5 7-11 7-11Z" />
                </svg>

              </div>

              <h3>
                Donor Darah
              </h3>

              <p>
                Mengajak generasi muda
                mengenal pentingnya kepedulian
                dan aksi kemanusiaan.
              </p>

            </div>

          </div>

          {/* EVENT 3 */}

          <div className="event-card glass-card">

            <div>

              <div className="event-number">
                03 / DIKLAT
              </div>

              <div className="event-icon">

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 19.5V5.5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2" />
                  <path d="M6 19.5h13" />
                </svg>

              </div>

              <h3>
                DIKLAT GABUNGAN
              </h3>

              <p>
                Diklat Gabungan PMR WIRA
                dan MADYA Se-Jember Selatan.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          VALUES / FEATURES
      ===================================================== */}

      <section className="section">

        <div className="section-heading">

          <div className="section-kicker">
            Nilai Kami
          </div>

          <h2>
            Tumbuh Dengan
            <br />
            Nilai Kemanusiaan.
          </h2>

          <p>
            GALANARAPATI hadir sebagai ruang bagi
            generasi muda untuk berkembang sekaligus
            memberikan dampak positif.
          </p>

        </div>

        <div className="feature-layout">

          {/* LEFT */}

          <div className="feature-card glass-card left">

            <div className="feature-card-icon">

              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>

            </div>

            <h3>
              Komunitas Solid
            </h3>

            <p>
              Membangun hubungan positif,
              persahabatan, dan kolaborasi
              antar anggota.
            </p>

          </div>

          {/* RIGHT */}

          <div className="feature-card glass-card right">

            <div className="feature-card-icon">

              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 3v18" />
                <path d="M3 12h18" />
              </svg>

            </div>

            <h3>
              Aksi Kemanusiaan
            </h3>

            <p>
              Mengembangkan kepedulian
              melalui aksi nyata yang
              bermanfaat bagi sesama.
            </p>

          </div>

          {/* CENTER */}

          <div className="feature-center">

            <div className="center-cross" />

          </div>

          {/* BOTTOM */}

          <div className="feature-card glass-card bottom">

            <div className="feature-card-icon">

              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="m12 3 1.9 5.8H20l-4.9 3.6 1.9 5.8-5-3.6-5 3.6 1.9-5.8L4 8.8h6.1Z" />
              </svg>

            </div>

            <h3>
              Karakter & Kepemimpinan
            </h3>

            <p>
              Membentuk generasi muda
              yang disiplin, tangguh,
              bertanggung jawab, dan peduli.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          COMMUNITY
      ===================================================== */}

      <section className="section">

        <div className="section-heading">

          <div className="section-kicker">
            Komunitas Kita
          </div>

          <h2>
            Satu Komunitas,
            <br />
            Satu Semangat.
          </h2>

          <p>
            Terhubung dengan anggota
            GALANARAPATI dan bersama-sama
            menciptakan lingkungan PMR
            yang aktif dan inspiratif.
          </p>

        </div>

        <div className="community-orbit">

          <div className="community-ring community-ring-1" />

          <div className="community-ring community-ring-2" />

          <div className="community-ring community-ring-3" />

          <div className="orbit-node node-one">
            PMR WIRA
          </div>

          <div className="orbit-node node-two">
            PMR MADYA
          </div>

          <div className="orbit-node node-three">
            RELAWAN MUDA
          </div>

          <div className="community-core">

            <div>

              <strong>
                GALANARAPATI
              </strong>

              <span>
                PMR COMMUNITY
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="section">

        <div className="cta-card glass-card">

          <div className="section-kicker">
            Join The Movement
          </div>

          <h2
            style={{
              margin: 0,
              fontSize:
                "clamp(32px, 5vw, 55px)",
              lineHeight: 1.02,
              letterSpacing: "-0.055em",
            }}
          >
            Siap Bergerak
            <br />
            Bersama Kami?
          </h2>

          <p
            style={{
              maxWidth: "520px",
              margin:
                "18px auto 28px",
              color: "#777e8e",
              lineHeight: 1.8,
              fontSize: "12px",
            }}
          >
            Jadilah bagian dari generasi muda
            yang peduli, aktif, dan siap memberikan
            dampak positif untuk lingkungan sekitar.
          </p>

          {/* REGISTER */}

          <Link
           href="/daftar"
            className="primary-btn"
          >
            Gabung GALANARAPATI →
          </Link>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="site-footer">

        <div className="footer-grid">

          <div className="footer-brand">

            <div className="logo">

              <div className="logo-mark">
                <div className="logo-cross" />
              </div>

              <div>

                <div className="logo-text">
                  GALANARAPATI
                </div>

                <div className="logo-subtitle">
                  KOMUNITAS PMR
                </div>

              </div>

            </div>

            <p>
              Komunitas generasi muda yang tumbuh
              melalui semangat kepalangmerahan,
              kepemimpinan, persahabatan,
              dan kemanusiaan.
            </p>

          </div>

          <div className="footer-column">

            <h4>
              COMMUNITY
            </h4>

            <a href="#">
              Tentang Kami
            </a>

            <a href="#">
              Kegiatan
            </a>

            <a href="#">
              Anggota
            </a>

          </div>

          <div className="footer-column">

            <h4>
              PROGRAM
            </h4>

            <a href="#">
              LATGAB
            </a>

            <a href="#">
              DIKLAT
            </a>

            <a href="#">
              Donor Darah
            </a>

          </div>

          <div className="footer-column">

            <h4>
              CONNECT
            </h4>

            <a href="#">
              Instagram
            </a>

            <a href="#">
              Facebook
            </a>

            <a href="#">
              WhatsApp
            </a>

          </div>

        </div>

        <div className="footer-bottom">

          <span>
            © 2026 GALANARAPATI. All rights reserved.
          </span>

          <span>
            PMR • HUMANITY • LEADERSHIP
          </span>

        </div>

      </footer>

    </main>
  );
}