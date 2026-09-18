"use client";

import { useAuth } from "@/features/auth/AuthProvider";
import { usePermission } from "@/features/auth/hooks/usePermission";

import { getDashboardMenu } from "@/features/dahsboard/menus";

import { useState } from "react";
import { usePathname } from "next/navigation";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import SidebarItem from "@/components/layout/sidebaritem";
import SidebarHeader from "@/components/layout/sidebarheader";
import SidebarFooter from "@/components/layout/sidebarfooter";

export default function Sidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const { profile } = useAuth();
  const { can } = usePermission();

  /*
   * =====================================================
   * ROLE
   * =====================================================
   */

  const role = profile?.role;

  /*
   * =====================================================
   * MENU BERDASARKAN ROLE
   * =====================================================
   */

  const dashboardMenu = role
    ? getDashboardMenu(role)
    : [];

  /*
   * =====================================================
   * FILTER BERDASARKAN PERMISSION
   * =====================================================
   */

  const visibleMenus =
    dashboardMenu.filter((menus) =>
      can(menus.permission as never)
    );

  /*
   * DEBUG
   * Hapus nanti kalau sudah fix
   */

  console.log(
    "SIDEBAR PROFILE:",
    profile
  );

  console.log(
    "SIDEBAR ROLE:",
    role
  );

  console.log(
    "SIDEBAR MENU:",
    dashboardMenu
  );

  console.log(
    "SIDEBAR VISIBLE:",
    visibleMenus
  );

  /*
   * =====================================================
   * SIDEBAR CONTENT
   * =====================================================
   */

  const sidebarContent = (
    <motion.aside
      animate={{
        width: collapsed ? 92 : 290,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        flex
        h-screen
        flex-col
        border-r
        border-slate-800
        bg-slate-950/80
        backdrop-blur-xl
      "
    >

      {/* HEADER */}

      <SidebarHeader
        collapsed={collapsed}
      />

      {/* COLLAPSE */}

      <div className="px-4 py-4">

        <button
          type="button"
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="
            flex
            h-10
            w-full
            items-center
            justify-center
            rounded-xl
            border
            border-slate-800
            bg-slate-900
            text-slate-300
            transition
            hover:bg-slate-800
          "
          aria-label={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>

      </div>

      {/* MENU */}

      <nav className="
        flex-1
        space-y-2
        overflow-y-auto
        px-4
      ">

        {visibleMenus.map((menu) => (

          <SidebarItem
            key={menu.href}
            icon={menu.icon}
            title={menu.label}
            href={menu.href}
            collapsed={collapsed}
            active={
              pathname === menu.href ||
              (
                menu.href !== "/dashboard" &&
                pathname.startsWith(
                  `${menu.href}/`
                )
              )
            }
          />

        ))}

      </nav>

      {/* FOOTER */}

      <SidebarFooter
        collapsed={collapsed}
      />

    </motion.aside>
  );

  /*
   * =====================================================
   * RENDER
   * =====================================================
   */

  return (
    <>
      {/* DESKTOP */}

      <div className="hidden lg:block">
        {sidebarContent}
      </div>

      {/* MOBILE BUTTON */}

      <button
        type="button"
        onClick={() =>
          setMobileOpen(true)
        }
        className="
          fixed
          left-4
          top-4
          z-50
          rounded-xl
          bg-slate-900
          p-3
          text-white
          shadow-lg
          lg:hidden
        "
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {/* MOBILE SIDEBAR */}

      <AnimatePresence>

        {mobileOpen && (

          <>

            {/* BACKDROP */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                fixed
                inset-0
                z-40
                bg-black/60
              "
            />

            {/* DRAWER */}

            <motion.div
              initial={{
                x: -320,
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: -320,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                fixed
                left-0
                top-0
                z-50
              "
            >

              <div className="relative">

                {sidebarContent}

                <button
                  type="button"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    absolute
                    right-4
                    top-4
                    rounded-xl
                    bg-slate-800
                    p-2
                    text-white
                  "
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>

              </div>

            </motion.div>

          </>

        )}

      </AnimatePresence>
    </>
  );
}