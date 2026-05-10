"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginConsole } from "@/components/login-console";
import { HolographicBackdrop } from "@/components/holographic-backdrop";
import { useNOVAIXStore } from "@/store/novaix-store";

export default function LoginPage() {
  const router = useRouter();
  const hydrateSession = useNOVAIXStore((state) => state.hydrateSession);
  const token = useNOVAIXStore((state) => state.token);

  useEffect(() => {
    hydrateSession();
  }, [hydrateSession]);

  useEffect(() => {
    if (token) {
      router.push("/os");
    }
  }, [router, token]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-void">
      <HolographicBackdrop mode="login" />
      <LoginConsole />
    </main>
  );
}
