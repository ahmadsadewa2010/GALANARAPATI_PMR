"use client";

import Link from "next/link";
import { useState } from "react";
import AuthModal from "@/features/auth/AuthModal";

// Komponen UI kamu
import PremiumBackground from "@/components/PremiumBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Trusted from "@/components/Trusted";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Process from "@/components/Process";
import EventSection from "@/components/EventSection";
import CommunityPreview from "@/components/CommunityPreview";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function LandingPage() {
  // =====================================================
  // AUTH LOGIC ASLI — JANGAN DIUBAH
  // =====================================================

  const [showAuth, setShowAuth] = useState(false);

  const [authView, setAuthView] =
    useState<"login" | "register">("login");

  function openLogin() {
    setAuthView("login");
    setShowAuth(true);
  }

  function openRegister() {
    setAuthView("register");
    setShowAuth(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080604] text-white">

      {/* BACKGROUND / UI BEBAS DIUBAH */}
      <PremiumBackground />

      {/* NAVBAR */}
      <Navbar
        onLogin={openLogin}
        onRegister={openRegister}
      />

      {/* HERO */}
      <Hero
        onRegister={openRegister}
      />

      {/* SECTION LAIN */}
      <Trusted />
      <Stats />
      <Features />
      <Process />
      <EventSection />
      <CommunityPreview />
      <FAQ />

      <CTA
        onRegister={openRegister}
      />

      <Footer />

      {/* =====================================================
          AUTH ASLI
          JANGAN DIGANTI DENGAN MODAL BARU
      ====================================================== */}

      <AuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
        defaultView={authView}
      />

    </main>
  );
}