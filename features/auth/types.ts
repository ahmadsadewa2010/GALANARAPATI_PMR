import type {
  Session,
  User,
} from "@supabase/supabase-js";

import type { UserRole } from "./permissions";

export interface Profile {
  id: string;
  sekolah_id: number | null;
  role: UserRole;
  full_name: string | null;
  photo_url: string | null;
  phone: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  logout: () => Promise<void>;
}