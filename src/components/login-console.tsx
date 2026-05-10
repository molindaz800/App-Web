"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Eye, LockKeyhole, LogIn, UserRound } from "lucide-react";
import { useNOVAIXStore } from "@/store/novaix-store";

export function LoginConsole() {
  const router = useRouter();
  const setToken = useNOVAIXStore((state) => state.setToken);
  const panelRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState("prime");
  const [password, setPassword] = useState("novaix");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!panelRef.current) {
      return;
    }
    gsap.fromTo(panelRef.current, { opacity: 0, y: 40, filter: "blur(16px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" });
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const payload = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(payload.message ?? "Acceso denegado");
      return;
    }

    setToken(payload.token);
    router.push("/os");
  }

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
      <div ref={panelRef} className="hud-panel relative w-full max-w-[980px] overflow-hidden border p-5 sm:p-8">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-plasma to-transparent" />
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex min-h-[520px] flex-col justify-between">
            <div>
              <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center border border-plasma/40 bg-plasma/10 shadow-hud">
                  <Eye className="h-6 w-6 text-ion" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.4em] text-ion/70">Prime access node</p>
                  <h1 className="text-3xl font-black tracking-[0.18em] text-white text-glow sm:text-5xl">NOVAIX OS</h1>
                </div>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="max-w-2xl text-2xl font-semibold leading-tight text-slate-100 sm:text-4xl">
                Bienvenido a la infraestructura cognitiva
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Plataforma operacional para auditar empresas, simular automatizaciones, visualizar presión, memoria, predicción y convertir procesos en arquitectura cognitiva vendible.
              </motion.p>
            </div>
            <div className="grid grid-cols-3 gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ion/75">
              {["Mirror online", "Ghost armed", "Prime awake"].map((item) => (
                <div className="border border-plasma/20 bg-plasma/5 p-3" key={item}>
                  <span className="mb-2 block h-1 w-8 bg-ambercore shadow-amber" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={onSubmit} className="amber-panel border bg-black/30 p-5 shadow-amber">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-ambercore">Operator login</p>
            <div className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-slate-400"><UserRound className="h-4 w-4" /> Usuario</span>
                <input value={username} onChange={(event) => setUsername(event.target.value)} className="w-full border border-plasma/25 bg-black/45 px-4 py-3 text-slate-100 outline-none transition focus:border-plasma focus:shadow-hud" autoComplete="username" />
              </label>
              <label className="block">
                <span className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-slate-400"><LockKeyhole className="h-4 w-4" /> Contraseña</span>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full border border-plasma/25 bg-black/45 px-4 py-3 text-slate-100 outline-none transition focus:border-plasma focus:shadow-hud" autoComplete="current-password" />
              </label>
              {error ? <p className="font-mono text-xs uppercase tracking-[0.2em] text-danger">{error}</p> : null}
              <button type="submit" disabled={loading} className="group flex w-full items-center justify-center gap-3 border border-ambercore/50 bg-ambercore/15 px-4 py-4 font-mono text-xs uppercase tracking-[0.28em] text-ambercore shadow-amber transition hover:bg-ambercore hover:text-black disabled:opacity-60">
                <LogIn className="h-4 w-4 transition group-hover:translate-x-1" />
                {loading ? "Autenticando" : "Entrar al sistema"}
              </button>
            </div>
            <div className="mt-8 border border-plasma/15 bg-plasma/5 p-4 font-mono text-[11px] leading-6 text-slate-400">
              PRIME visual layer: activo<br />Cognitive shell: sincronizada<br />Demo credentials: prime / novaix
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
