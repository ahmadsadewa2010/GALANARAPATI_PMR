"use client";

import { Bell, Search } from "lucide-react";
import { useState } from "react";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";

export default function Topbar() {

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header
      className="
      sticky
      top-0
      z-40
      flex
      items-center
      justify-between
      border-b
      border-slate-800
      bg-slate-950/70
      backdrop-blur-xl
      px-8
      py-5
      "
    >

      {/* Search */}

      <div className="relative w-[420px]">

        <Search
          size={18}
          className="absolute left-4 top-3 text-slate-500"
        />

        <input
          placeholder="Cari anggota, sekolah, event..."
          className="
          w-full
          rounded-xl
          bg-slate-900
          border
          border-slate-800
          pl-11
          pr-4
          py-3
          outline-none
          focus:border-blue-500
          "
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <div className="relative">

          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="
            relative
            rounded-xl
            bg-slate-900
            p-3
            hover:bg-slate-800
            "
          >

            <Bell />

            <span
              className="
              absolute
              -top-1
              -right-1
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              text-xs
              "
            >
              4
            </span>

          </button>

          {notifOpen && <NotificationDropdown />}

        </div>

        <div className="relative">

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="
            flex
            items-center
            gap-3
            rounded-xl
            bg-slate-900
            px-3
            py-2
            hover:bg-slate-800
            "
          >

            <img
              src="https://ui-avatars.com/api/?name=Admin"
              className="h-10 w-10 rounded-full"
            />

            <div className="text-left">
              <p className="font-semibold">
                Admin PMR
              </p>

              <p className="text-xs text-slate-400">
                Super Admin
              </p>
            </div>

          </button>

          {profileOpen && <ProfileDropdown />}

        </div>

      </div>

    </header>
  );
}