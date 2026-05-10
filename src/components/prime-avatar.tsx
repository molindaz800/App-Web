"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Mic2, Sparkles } from "lucide-react";
import { systems } from "@/lib/systems";
import { useNOVAIXStore } from "@/store/novaix-store";

export function PrimeAvatar() {
  const activeSystem = useNOVAIXStore((state) => state.activeSystem);
  const mood = useNOVAIXStore((state) => state.primeMood);
  const config = useNOVAIXStore((state) => state.config);
  const system = systems.find((item) => item.id === activeSystem) ?? systems[0];
  const alert = mood === "alert";

  return (
    <aside className="hud-panel amber-panel h-full max-h-[calc(100vh-6rem)] overflow-hidden border p-4">
      <div className="flex items-center justify-between">
        <div><p className="font-mono text-[10px] uppercase tracking-[0.35em] text-ambercore">Avatar físico</p><h2 className="text-3xl font-black tracking-[0.18em] text-white orange-glow">PRIME</h2></div>
        <Sparkles className="h-5 w-5 text-ambercore" />
      </div>
      <div className="relative my-7 flex h-80 items-center justify-center overflow-hidden border border-ambercore/20 bg-black/30">
        <div className="absolute h-56 w-56 rounded-full border border-plasma/20" style={{ animation: "orbital 16s linear infinite" }} />
        <div className="absolute h-72 w-72 rounded-full border border-ambercore/15" style={{ animation: "orbital 24s linear infinite reverse" }} />
        <motion.div className={`absolute h-44 w-44 rounded-full ${alert ? "bg-danger/10" : "bg-plasma/10"}`} animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.42, 0.75, 0.42] }} transition={{ duration: 2.8, repeat: Infinity }} />
        <motion.div className="relative flex h-44 w-32 flex-col items-center justify-center border border-plasma/35 bg-gradient-to-b from-plasma/20 to-black/70 shadow-hud" animate={{ y: [-8, 8, -8] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
          <div className="mb-5 flex gap-5"><motion.span className="h-4 w-4 rounded-full bg-ion shadow-hud" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.6, repeat: Infinity }} /><motion.span className="h-4 w-4 rounded-full bg-ambercore shadow-amber" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.6, repeat: Infinity }} /></div>
          <div className="h-1 w-20 bg-plasma/50" />
          <div className="mt-5 grid grid-cols-3 gap-1">{Array.from({ length: 9 }).map((_, index) => <span className="h-1.5 w-1.5 bg-ion/70" key={index} />)}</div>
        </motion.div>
      </div>
      <div className="space-y-3">
        <div className="border border-plasma/20 bg-plasma/5 p-4"><div className="mb-2 flex items-center gap-2"><Brain className="h-4 w-4 text-ion" /><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ion">Contexto</p></div><p className="text-sm leading-6 text-slate-300">{config.businessName} opera como {config.businessType}. Estoy leyendo {system.name} con presión {system.pressure}% y señal {system.signal}%.</p></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-white/10 bg-white/[0.035] p-3"><Cpu className="mb-2 h-4 w-4 text-ambercore" /><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Modo</p><p className="mt-1 font-mono text-xs uppercase text-white">{mood}</p></div>
          <div className="border border-white/10 bg-white/[0.035] p-3"><Mic2 className="mb-2 h-4 w-4 text-ion" /><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Voz visual</p><p className="mt-1 font-mono text-xs uppercase text-white">Activa</p></div>
        </div>
        <div className="border border-ambercore/25 bg-ambercore/10 p-4 font-mono text-[11px] uppercase leading-6 tracking-[0.16em] text-ambercore">Siguiente acción: convertir esta lectura en una demo de impacto para dirección.</div>
      </div>
    </aside>
  );
}
