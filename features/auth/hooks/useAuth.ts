"use client";

import { useEffect, useState } from "react";

type User = {
  email?: string | null;
};

type Profile = {
  full_name?: string;
  role?: string;
  school_id?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuth() {
      try {
        const storedUser: User | null = null;
        const storedProfile: Profile | null = null;

        setUser(storedUser);
        setProfile(storedProfile);
      } finally {
        setLoading(false);
      }
    }

    fetchAuth();
  }, []);

  return {
    user,
    profile,
    loading,
  };
}