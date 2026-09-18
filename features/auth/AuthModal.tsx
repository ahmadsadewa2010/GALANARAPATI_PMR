"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import LoginView from "./view/LoginView";
import RegisterView from "./view/RegisterView";
import ForgotView from "./view/ForgotView";

export type AuthView =
  | "login"
  | "register"
  | "forgot";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultView?: AuthView;
}

export default function AuthModal({
  open,
  onClose,
  defaultView = "login",
}: AuthModalProps) {
  const [view, setView] =
    useState<AuthView>(defaultView);

  useEffect(() => {
    if (open) {
      setView(defaultView);
    }
  }, [defaultView, open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleEsc
      );
    };
  }, [open, onClose]);

  function renderView(): ReactNode {
    switch (view) {
      case "register":
        return (
          <RegisterView
            goLogin={() => setView("login")}
          />
        );

      case "forgot":
        return (
          <ForgotView
            goLogin={() => setView("login")}
          />
        );

      default:
        return (
          <LoginView
            goRegister={() =>
              setView("register")
            }
            goForgot={() =>
              setView("forgot")
            }
          />
        );
    }
  }

  return (
    <AnimatePresence>

      {open && (

        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={onClose}
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-slate-900/90
              shadow-2xl
              backdrop-blur-2xl
            "
          >

            {/* Glow */}

            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="absolute -bottom-24 -right-24 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl" />

            {/* Close */}

            <button
              onClick={onClose}
              className="
                absolute
                right-5
                top-5
                z-50
                rounded-xl
                p-2
                text-slate-400
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              <X size={18} />
            </button>

            {/* Content */}

            <div className="relative z-10 p-8">

              <AnimatePresence
                mode="wait"
              >

                <motion.div
                  key={view}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  {renderView()}
                </motion.div>

              </AnimatePresence>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}