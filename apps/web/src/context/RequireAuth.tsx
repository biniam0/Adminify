"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !session && pathname !== "/signin") {
      router.push("/signin");
    }
  }, [isLoading, session, pathname, router]);

  if (isLoading || (!session && pathname !== "/signin")) {
    return null; // or a loader
  }

  return <>{children}</>;
}
