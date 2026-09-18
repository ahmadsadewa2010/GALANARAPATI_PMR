"use client";

import { useState } from "react";
import * as authService from "@/features/auth/service/auth.service";

export function useLogin() {
  const [loading, setLoading] = useState(false);

  async function signIn(
    email: string,
    password: string
  ) {
    setLoading(true);

    try {
      return await authService.login(
        email,
        password
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    signIn,
    loading,
  };
}