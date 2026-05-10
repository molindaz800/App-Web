"use client";

import { LogOut, Radio, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { systems } from "@/lib/systems";
import { useNOVAIXStore } from "@/store/novaix-store";

export function TopStatusBar() {
  const router = useRouter();
  const setAuthenticated = useNOVAIXStore((state) => state.setAuthenticated);
  const activeSystem = useNOVAIXStore((state) => state.activeSystem);
  const config = useNOVAIXStore((state) => state.config);
  const system = systems.find((item) => item.id === activeSystem) ?? systems[0];

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
    router.push("/");
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-plasma/20 bg-black/45 px-4 py-3 backdrop-blur-xl lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-ion/70">NOVAIX Operating System</p>
          <div className="flex min-w-0 items-center gap-3">
            <h1 className="truncate text-lg font-black tracking-[0.16em] text-white text-glow sm:text-2xl">CORE</h1>
            <span className="hidden h-5 w-px bg-plasma/30 sm:block" />
            <p className="truncate font-mono text-xs uppercase tracking-[0.18em] text-slate-300">{system.name}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 border border-plasma/20 bg-plasma/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ion sm:flex">
            <Radio className="h-3.5 w-3.5" />
            {config.businessName}
          </div>
          <div className="hidden items-center gap-2 border border-ambercore/25 bg-ambercore/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ambercore md:flex">
            <ShieldCheck className="h-3.5 w-3.5" />
            Systems {systems.length}/12
          </div>
          <button
            aria-label="Cerrar sesión"
            onClick={logout}
            className="flex h-10 w-10 items-center justify-center border border-slate-500/30 bg-white/5 text-slate-200 transition hover:border-danger hover:text-danger"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
