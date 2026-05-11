export type MiniverseAgentId = 'prime' | 'iris' | 'vega' | 'atlas' | 'orion' | 'nexus' | 'pulse';

export type MiniverseAgent = {
  id: MiniverseAgentId;
  name: string;
  role: string;
  department: string;
  x: number;
  y: number;
  color: string;
  handledEventTypes: string[];
  tools: string[];
  goals: string[];
};

export type MiniverseWorldEvent = {
  id: string;
  tick: number;
  timestamp: string;
  type: string;
  agentId: MiniverseAgentId;
  summary: string;
  severity: 'info' | 'warning' | 'critical';
  payload?: Record<string, unknown>;
};

export type MiniverseWorldState = {
  tick: number;
  agents: MiniverseAgent[];
  events: MiniverseWorldEvent[];
  selectedAgentId: MiniverseAgentId;
  running: boolean;
};

export type AgentViewState = {
  status: 'idle' | 'active' | 'warning' | 'critical';
  recentEvents: MiniverseWorldEvent[];
  load: number;
};
