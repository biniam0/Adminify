"use client";
import { Welcome } from "@/components/Welcome";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const { session } = useAuth();
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col justify-center gap-4 py-4 md:gap-6 md:py-6">
        <Welcome
          userName={session && session.user.name ? session.user.name : ""}
        />
      </div>
    </div>
  );
}
