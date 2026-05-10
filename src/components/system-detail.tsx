"use client";

import { motion } from "framer-motion";
import { Activity, ArrowRight, CalendarDays, DollarSign, MessageCircle, Zap } from "lucide-react";
import { integrations, systems } from "@/lib/systems";
import { useNOVAIXStore } from "@/store/novaix-store";

function FlowField({ nodes, palette }: { nodes: string[]; palette: "cyan" | "amber" | "red" }) {
  const color = palette === "amber" ? "bg-ambercore" : palette === "red" ? "bg-danger" : "bg-plasma";
  const border = palette === "amber" ? "border-ambercore/40" : palette === "red" ? "border-danger/40" : "border-plasma/40";

  return (
    <div className="relative min-h-[360px] overflow-hidden border border-white/10 bg-black/25 p-4">
      <div className="absolute inset-0 grid-floor opacity-40" />
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-plasma/25 shadow-hud" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ambercore/15" />
      {nodes.map((node, index) => {
        const angle = (index / nodes.length) * Math.PI * 2;
        const radius = 126 + (index % 2) * 34;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <motion.div className={`absolute left-1/2 top-1/2 flex min-h-12 min-w-24 items-center justify-center border ${border} bg-black/60 px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-slate-100 backdrop-blur`} style={{ x, y }} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.045 }} key={node}>
            <span className={`absolute -left-1 -top-1 h-2 w-2 ${color}`} />
            {node}
          </motion.div>
        );
      })}
      <motion.div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-plasma/40 bg-plasma/10 font-mono text-[10px] uppercase tracking-[0.18em] text-ion shadow-hud" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
        NOVAIX
      </motion.div>
    </div>
  );
}

function LiveDemoPhone() {
  const config = useNOVAIXStore((state) => state.config);

  return (
    <div className="border border-plasma/20 bg-black/40 p-3 shadow-hud">
      <div className="mx-auto max-w-[260px] border border-slate-500/30 bg-[#061018] p-3">
        <div className="mx-auto mb-3 h-1.5 w-16 bg-slate-500/40" />
        <div className="border border-plasma/20 bg-black/45 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ion">{config.businessName}</p>
          <div className="mt-4 space-y-3 text-xs">
            <div className="ml-auto max-w-[82%] bg-plasma/15 p-3 text-slate-100">Hola, quiero reservar una valoración esta semana.</div>
            <div className="max-w-[86%] border border-ambercore/25 bg-ambercore/10 p-3 text-ambercore">PRIME detecta intención alta. Propongo huecos con ticket medio {config.averageTicket}€.</div>
            <div className="ml-auto max-w-[78%] bg-plasma/15 p-3 text-slate-100">Jueves 18:30 me encaja.</div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 font-mono text-[9px] uppercase text-slate-400"><span className="border border-white/10 p-2 text-center">Agenda</span><span className="border border-white/10 p-2 text-center">CRM</span><span className="border border-white/10 p-2 text-center">Pago</span></div>
        </div>
      </div>
    </div>
  );
}

export function SystemDetail() {
  const activeSystem = useNOVAIXStore((state) => state.activeSystem);
  const config = useNOVAIXStore((state) => state.config);
  const system = systems.find((item) => item.id === activeSystem) ?? systems[0];
  const Icon = system.icon;

  return (
    <section className="space-y-4">
      <div className="hud-panel border p-5 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-ion/70">{system.codename}</p>
            <div className="mt-2 flex items-center gap-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center border border-plasma/35 bg-plasma/10 text-ion shadow-hud"><Icon className="h-7 w-7" /></div><div><h2 className="text-3xl font-black tracking-[0.08em] text-white text-glow lg:text-5xl">{system.name}</h2><p className="mt-1 text-sm uppercase tracking-[0.22em] text-ambercore orange-glow">{system.tagline}</p></div></div>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 lg:text-base">{system.description}</p>
          </div>
          <div className="grid min-w-[280px] grid-cols-3 gap-2 font-mono text-center text-[10px] uppercase tracking-[0.16em]"><div className="border border-plasma/25 bg-plasma/10 p-3"><span className="block text-2xl font-black text-ion">{system.signal}%</span>Señal</div><div className="border border-danger/25 bg-danger/10 p-3"><span className="block text-2xl font-black text-danger">{system.pressure}%</span>Presión</div><div className="border border-ambercore/25 bg-ambercore/10 p-3"><span className="block text-lg font-black text-ambercore">{system.impact}</span>Impacto</div></div>
        </div>
      </div>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
        <FlowField nodes={system.nodes} palette={system.palette} />
        <div className="space-y-4">
          <div className="hud-panel border p-4"><div className="mb-4 flex items-center gap-2"><Activity className="h-4 w-4 text-ion" /><p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ion">Live metrics</p></div><div className="space-y-3">{system.metrics.map((metric) => <div className="flex items-center justify-between border border-white/10 bg-white/[0.03] px-3 py-3" key={metric.label}><span className="text-sm text-slate-300">{metric.label}</span><span className="font-mono text-sm text-white">{metric.value}</span><span className="font-mono text-[10px] uppercase text-ambercore">{metric.delta}</span></div>)}</div></div>
          <div className="hud-panel border p-4"><div className="mb-4 flex items-center gap-2"><Zap className="h-4 w-4 text-ambercore" /><p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ambercore">Event stream</p></div><div className="space-y-3">{system.demoEvents.map((event, index) => <motion.div className="flex items-center gap-3 border border-plasma/15 bg-black/30 px-3 py-3 text-sm text-slate-300" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }} key={event}><span className="h-2 w-2 bg-plasma shadow-hud" />{event}</motion.div>)}</div></div>
        </div>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="hud-panel border p-4 xl:col-span-2">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-ion">Operational pipeline</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{integrations.slice(0, 5).map((item, index) => <div className="flex items-center justify-between border border-white/10 bg-white/[0.035] px-3 py-3" key={item}><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300">{item}</span>{index < 4 ? <ArrowRight className="h-4 w-4 text-plasma" /> : <Zap className="h-4 w-4 text-ambercore" />}</div>)}</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="border border-plasma/20 bg-plasma/5 p-4"><MessageCircle className="mb-3 h-5 w-5 text-ion" /><p className="font-mono text-xs uppercase tracking-[0.16em] text-white">Canales</p><p className="mt-2 text-sm text-slate-400">{config.channels.join(", ")}</p></div>
            <div className="border border-ambercore/20 bg-ambercore/5 p-4"><CalendarDays className="mb-3 h-5 w-5 text-ambercore" /><p className="font-mono text-xs uppercase tracking-[0.16em] text-white">Horario</p><p className="mt-2 text-sm text-slate-400">{config.schedule}</p></div>
            <div className="border border-plasma/20 bg-plasma/5 p-4"><DollarSign className="mb-3 h-5 w-5 text-ion" /><p className="font-mono text-xs uppercase tracking-[0.16em] text-white">Ticket medio</p><p className="mt-2 text-sm text-slate-400">{config.averageTicket}€</p></div>
          </div>
        </div>
        <LiveDemoPhone />
      </div>
    </section>
  );
}
