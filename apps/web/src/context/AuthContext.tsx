"use client";

import type { Session } from "@/lib/auth-client";
import { createContext } from "react";

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  error: unknown;
  refreshSession: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
