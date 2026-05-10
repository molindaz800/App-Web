"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginConsole } from "@/components/login-console";
import { HolographicBackdrop } from "@/components/holographic-backdrop";
import { useNOVAIXStore } from "@/store/novaix-store";

export default function LoginPage() {
  const router = useRouter();
  const hydrateSession = useNOVAIXStore((state) => state.hydrateSession);
  const authenticated = useNOVAIXStore((state) => state.authenticated);

  useEffect(() => {
    hydrateSession();
  }, [hydrateSession]);

  useEffect(() => {
    if (authenticated) {
      router.push("/os");
    }
  }, [router, authenticated]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-void">
      <HolographicBackdrop mode="login" />
      <LoginConsole />
    </main>
  );
}
