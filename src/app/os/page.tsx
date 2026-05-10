"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CommandDeck } from "@/components/command-deck";
import { HolographicBackdrop } from "@/components/holographic-backdrop";
import { PrimeAvatar } from "@/components/prime-avatar";
import { SystemDetail } from "@/components/system-detail";
import { TopStatusBar } from "@/components/top-status-bar";
import { useNOVAIXStore } from "@/store/novaix-store";

export default function OperatingSystemPage() {
  const router = useRouter();
  const hydrateSession = useNOVAIXStore((state) => state.hydrateSession);
  const authenticated = useNOVAIXStore((state) => state.authenticated);
  const activeSystem = useNOVAIXStore((state) => state.activeSystem);

  useEffect(() => {
    hydrateSession();
  }, [hydrateSession]);

  useEffect(() => {
    if (authenticated === false) {
      router.push("/");
    }
  }, [router, authenticated]);

  if (!authenticated) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-void text-slate-100">
      <HolographicBackdrop mode="core" />
      <div className="pointer-events-none absolute inset-0 grid-floor opacity-30" />
      <TopStatusBar />
      <section className="relative z-10 grid min-h-screen grid-cols-1 gap-4 px-4 pb-4 pt-20 lg:grid-cols-[320px_minmax(0,1fr)_360px] lg:px-6">
        <CommandDeck />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSystem}
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="min-h-[680px]"
          >
            <SystemDetail />
          </motion.div>
        </AnimatePresence>
        <PrimeAvatar />
      </section>
    </main>
  );
}
