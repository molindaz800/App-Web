"use client";

import { motion } from "framer-motion";
import { Settings2, SlidersHorizontal } from "lucide-react";
import { businessTypes, systems } from "@/lib/systems";
import { useNOVAIXStore } from "@/store/novaix-store";

export function CommandDeck() {
  const activeSystem = useNOVAIXStore((state) => state.activeSystem);
  const setActiveSystem = useNOVAIXStore((state) => state.setActiveSystem);
  const config = useNOVAIXStore((state) => state.config);
  const updateConfig = useNOVAIXStore((state) => state.updateConfig);

  return (
    <aside className="hud-panel thin-scrollbar h-full max-h-[calc(100vh-6rem)] overflow-y-auto border p-4">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ion/70">Systems</p>
          <h2 className="text-xl font-black tracking-[0.12em] text-white">COMMAND DECK</h2>
        </div>
        <SlidersHorizontal className="h-5 w-5 text-ambercore" />
      </div>
      <div className="space-y-2">
        {systems.map((system, index) => {
          const Icon = system.icon;
          const active = system.id === activeSystem;
          return (
            <button onClick={() => setActiveSystem(system.id)} className={`relative flex w-full items-center gap-3 border px-3 py-3 text-left transition ${active ? "border-plasma/60 bg-plasma/15 shadow-hud" : "border-white/10 bg-white/[0.035] hover:border-plasma/35 hover:bg-plasma/10"}`} key={system.id}>
              {active ? <motion.span layoutId="active-system" className="absolute left-0 top-0 h-full w-1 bg-plasma shadow-hud" /> : null}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-plasma/25 bg-black/35 text-ion"><Icon className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-mono text-[11px] uppercase tracking-[0.2em] text-slate-100">{String(index + 1).padStart(2, "0")} {system.name}</span>
                <span className="mt-1 block truncate text-xs text-slate-400">{system.tagline}</span>
              </span>
              <span className={`h-2 w-2 shrink-0 ${system.palette === "amber" ? "bg-ambercore" : system.palette === "red" ? "bg-danger" : "bg-plasma"}`} />
            </button>
          );
        })}
      </div>
      <div className="mt-5 border border-ambercore/25 bg-ambercore/5 p-4">
        <div className="mb-4 flex items-center gap-2"><Settings2 className="h-4 w-4 text-ambercore" /><p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ambercore">Live Demo Config</p></div>
        <div className="space-y-3">
          <label className="block"><span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Negocio</span><input value={config.businessName} onChange={(event) => updateConfig({ businessName: event.target.value })} className="w-full border border-white/10 bg-black/35 px-3 py-2 text-sm outline-none focus:border-plasma" /></label>
          <label className="block"><span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Sector</span><select value={config.businessType} onChange={(event) => updateConfig({ businessType: event.target.value })} className="w-full border border-white/10 bg-black/35 px-3 py-2 text-sm outline-none focus:border-plasma">{businessTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="block"><span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">CRM</span><input value={config.crm} onChange={(event) => updateConfig({ crm: event.target.value })} className="w-full border border-white/10 bg-black/35 px-3 py-2 text-sm outline-none focus:border-plasma" /></label>
          <label className="block"><span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Volumen leads: {config.leadVolume}</span><input type="range" min="50" max="1600" value={config.leadVolume} onChange={(event) => updateConfig({ leadVolume: Number(event.target.value) })} className="w-full accent-cyan-300" /></label>
          <label className="block"><span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Automatización: {config.automationLevel}%</span><input type="range" min="0" max="100" value={config.automationLevel} onChange={(event) => updateConfig({ automationLevel: Number(event.target.value) })} className="w-full accent-orange-400" /></label>
        </div>
      </div>
    </aside>
  );
}
