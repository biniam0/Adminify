// context/AuthProvider.tsx
"use client";

import { getSession, revokeSession } from "@/lib/auth-client";
import React, { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const refreshSession = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await getSession();
      if (error) throw error;
      setSession(data ?? null);
    } catch (err) {
      setSession(null);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const signOut = useCallback(async () => {
    try {
      await revokeSession({ token: session?.session?.id });
      setSession(null);
    } catch (err) {
      console.error("Error signing out", err);
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        error,
        refreshSession,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
