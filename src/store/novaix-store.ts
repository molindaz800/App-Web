"use client";

import { create } from "zustand";
import { systems } from "@/lib/systems";

export type BusinessConfig = {
  businessName: string;
  businessType: string;
  crm: string;
  leadVolume: number;
  employees: number;
  channels: string[];
  automationLevel: number;
  schedule: string;
  averageTicket: number;
  brandColor: string;
  logoUrl: string;
};

type NOVAIXState = {
  authenticated: boolean | undefined;
  activeSystem: string;
  config: BusinessConfig;
  primeMood: "idle" | "alert" | "focused" | "orchestrating";
  hydrateSession: () => Promise<void>;
  setAuthenticated: (authenticated: boolean) => void;
  setActiveSystem: (id: string) => void;
  updateConfig: (patch: Partial<BusinessConfig>) => void;
};

const defaultConfig: BusinessConfig = {
  businessName: "Astra Clinic",
  businessType: "Clínica estética",
  crm: "HubSpot",
  leadVolume: 420,
  employees: 14,
  channels: ["WhatsApp", "Gmail", "Calendar"],
  automationLevel: 62,
  schedule: "09:00-20:00",
  averageTicket: 180,
  brandColor: "#00d8ff",
  logoUrl: ""
};

export const useNOVAIXStore = create<NOVAIXState>((set, get) => ({
  authenticated: undefined,
  activeSystem: systems[0].id,
  config: defaultConfig,
  primeMood: "idle",
  hydrateSession: async () => {
    if (typeof window === "undefined") {
      return;
    }

    const rawConfig = window.localStorage.getItem("novaix-config");
    let authenticated = false;

    try {
      const response = await fetch("/api/auth/session", { cache: "no-store" });
      authenticated = response.ok;
    } catch {
      authenticated = false;
    }

    set({
      authenticated,
      config: rawConfig ? { ...defaultConfig, ...JSON.parse(rawConfig) } : defaultConfig
    });
  },
  setAuthenticated: (authenticated) => set({ authenticated }),
  setActiveSystem: (id) => {
    const system = systems.find((item) => item.id === id);
    const pressure = system?.pressure ?? 0;
    set({
      activeSystem: id,
      primeMood: pressure > 75 ? "alert" : id === "orchestrator" || id === "demo" ? "orchestrating" : "focused"
    });
  },
  updateConfig: (patch) => {
    const config = { ...get().config, ...patch };
    if (typeof window !== "undefined") {
      window.localStorage.setItem("novaix-config", JSON.stringify(config));
    }
    set({ config });
  }
}));
