import {
  Aperture,
  Binary,
  BrainCircuit,
  CalendarClock,
  CircuitBoard,
  Eye,
  Flame,
  GitBranch,
  MessageSquare,
  Orbit,
  Radar,
  ScanHeart
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NOVAIXSystem = {
  id: string;
  name: string;
  codename: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  signal: number;
  pressure: number;
  impact: string;
  palette: "cyan" | "amber" | "red";
  nodes: string[];
  demoEvents: string[];
  metrics: Array<{ label: string; value: string; delta: string }>;
};

export const systems: NOVAIXSystem[] = [
  {
    id: "mirror",
    name: "NOVAIX MIRROR",
    codename: "Digital Twin",
    tagline: "Gemelo digital del negocio",
    description:
      "Mapea WhatsApp, CRM, agenda, empleados, leads, embudos, tiempos, cancelaciones y reviews para localizar pérdidas, saturación y horas críticas.",
    icon: Orbit,
    signal: 94,
    pressure: 68,
    impact: "32h recuperables/semana",
    palette: "cyan",
    nodes: ["WhatsApp", "CRM", "Agenda", "Equipo", "Leads", "Reviews", "Cancelaciones"],
    demoEvents: ["Lead sin respuesta detectado", "Agenda al 91% de carga", "Cuello de botella en recepción"],
    metrics: [
      { label: "Pérdida visible", value: "18.420€", delta: "+14%" },
      { label: "Horas críticas", value: "11:00-13:00", delta: "Alta" },
      { label: "Saturación", value: "76%", delta: "+9%" }
    ]
  },
  {
    id: "ghost",
    name: "NOVAIX GHOST",
    codename: "Synthetic Client",
    tagline: "Cliente fantasma IA",
    description:
      "Simula clientes, objeciones, llamadas y conversaciones para medir tiempos de respuesta, calidad comercial, errores y oportunidades perdidas.",
    icon: MessageSquare,
    signal: 88,
    pressure: 54,
    impact: "27 fallos ocultos",
    palette: "amber",
    nodes: ["WhatsApp demo", "Llamada", "Objeciones", "Ventas", "QA", "Scoring"],
    demoEvents: ["Cliente fantasma pregunta precio", "Objeción no resuelta", "Respuesta tardía penalizada"],
    metrics: [
      { label: "Tiempo respuesta", value: "19m 42s", delta: "-41%" },
      { label: "Calidad venta", value: "64/100", delta: "Riesgo" },
      { label: "Errores", value: "12", delta: "+3" }
    ]
  },
  {
    id: "memory",
    name: "MEMORY ENGINE",
    codename: "Enterprise Memory",
    tagline: "Memoria empresarial operativa",
    description:
      "Recuerda clientes, patrones, histórico, incidencias y comportamiento para que cada automatización opere con contexto acumulado.",
    icon: BrainCircuit,
    signal: 91,
    pressure: 37,
    impact: "12.8k recuerdos vivos",
    palette: "cyan",
    nodes: ["Clientes", "Patrones", "Historial", "Incidencias", "Preferencias", "Riesgo"],
    demoEvents: ["Cliente recurrente reconocido", "Patrón de abandono conectado", "Incidencia vinculada al CRM"],
    metrics: [
      { label: "Memorias", value: "12.814", delta: "+286" },
      { label: "Relaciones", value: "4.2k", delta: "+18%" },
      { label: "Confianza", value: "92%", delta: "Estable" }
    ]
  },
  {
    id: "pressure",
    name: "PRESSURE MAP",
    codename: "Operational Stress",
    tagline: "Mapa de estrés operacional",
    description:
      "Visualiza empleados saturados, leads esperando, retrasos y puntos de colapso mediante radar, pulsos y alertas vivas.",
    icon: Radar,
    signal: 83,
    pressure: 86,
    impact: "3 zonas en colapso",
    palette: "red",
    nodes: ["Recepción", "Ventas", "Soporte", "Agenda", "Backoffice", "Gerencia"],
    demoEvents: ["Soporte supera SLA", "Ventas acumula 43 leads", "Agenda entra en presión naranja"],
    metrics: [
      { label: "Presión", value: "86%", delta: "+22%" },
      { label: "SLA roto", value: "17", delta: "Crítico" },
      { label: "Lead wait", value: "42m", delta: "+12m" }
    ]
  },
  {
    id: "decision",
    name: "DECISION ENGINE",
    codename: "Autonomous Routing",
    tagline: "Decisiones automáticas IA",
    description:
      "Representa rutas probabilísticas para recuperar leads, derivar a humanos, lanzar promociones, insistir o abandonar con trazabilidad.",
    icon: GitBranch,
    signal: 89,
    pressure: 49,
    impact: "74% rutas óptimas",
    palette: "cyan",
    nodes: ["Recuperar", "Derivar", "Promo", "Insistir", "Abandonar", "Escalar"],
    demoEvents: ["Lead caliente derivado a humano", "Promo activada por intención", "Ruta de insistencia bloqueada"],
    metrics: [
      { label: "Precisión", value: "89%", delta: "+6%" },
      { label: "Rutas activas", value: "148", delta: "+21" },
      { label: "Recuperación", value: "31%", delta: "+8%" }
    ]
  },
  {
    id: "heatmap",
    name: "HEATMAP",
    codename: "Revenue Loss Field",
    tagline: "Mapa económico de oportunidad",
    description:
      "Muestra dinero perdido, franjas críticas, coste de demora y proyección temporal para convertir caos operativo en impacto económico.",
    icon: Flame,
    signal: 81,
    pressure: 73,
    impact: "24.900€ proyectados",
    palette: "amber",
    nodes: ["Dinero perdido", "Horas", "Servicios", "Campañas", "Capacidad", "Proyección"],
    demoEvents: ["Franja 18:00 dispara pérdidas", "Servicio premium sin follow-up", "Campaña pierde conversión"],
    metrics: [
      { label: "Pérdida mensual", value: "24.900€", delta: "+11%" },
      { label: "Oportunidad", value: "41.300€", delta: "+23%" },
      { label: "Franja roja", value: "18:00", delta: "Alta" }
    ]
  },
  {
    id: "orchestrator",
    name: "ORCHESTRATOR",
    codename: "Nervous System",
    tagline: "Todos los sistemas conectados",
    description:
      "Conecta WhatsApp, Telegram, Gmail, Calendar, Make, N8N, CRM, APIs, reservas y ERPs como un sistema nervioso operativo.",
    icon: CircuitBoard,
    signal: 96,
    pressure: 61,
    impact: "39 pipelines activos",
    palette: "cyan",
    nodes: ["WhatsApp", "Telegram", "Gmail", "Calendar", "Make", "N8N", "CRM", "ERP", "APIs"],
    demoEvents: ["Pipeline de reserva ejecutado", "Gmail sincroniza memoria", "ERP emite señal financiera"],
    metrics: [
      { label: "Pipelines", value: "39", delta: "+4" },
      { label: "Latencia", value: "184ms", delta: "-22ms" },
      { label: "Uptime", value: "99.98%", delta: "OK" }
    ]
  },
  {
    id: "blackbox",
    name: "BLACKBOX",
    codename: "Trace Recorder",
    tagline: "Caja negra de eventos",
    description:
      "Registra errores, eventos, trazas y decisiones para explicar cada automatización con logs cinematográficos y timeline de fallos.",
    icon: Binary,
    signal: 87,
    pressure: 58,
    impact: "1.4M eventos trazados",
    palette: "amber",
    nodes: ["Logs", "Errores", "Eventos", "Trazas", "Auditoría", "Replay"],
    demoEvents: ["Webhook fallido registrado", "Replay de decisión disponible", "Error humano aislado"],
    metrics: [
      { label: "Eventos", value: "1.4M", delta: "+12k" },
      { label: "Fallos", value: "23", delta: "-8" },
      { label: "Trazabilidad", value: "100%", delta: "Completa" }
    ]
  },
  {
    id: "predict",
    name: "PREDICT",
    codename: "Future Simulator",
    tagline: "Predicción operacional",
    description:
      "Predice cancelaciones, leads fríos, abandono y saturación antes de que el negocio lo sienta en caja o reputación.",
    icon: Aperture,
    signal: 92,
    pressure: 44,
    impact: "18 cancelaciones evitables",
    palette: "cyan",
    nodes: ["Cancelaciones", "Leads fríos", "Abandono", "Saturación", "Demanda", "Forecast"],
    demoEvents: ["Cancelación probable en 48h", "Lead se enfría por demora", "Demanda sube el jueves"],
    metrics: [
      { label: "Precisión", value: "92%", delta: "+5%" },
      { label: "Riesgos", value: "18", delta: "-4" },
      { label: "Ventana", value: "14 días", delta: "Activa" }
    ]
  },
  {
    id: "biosignal",
    name: "BIOSIGNAL",
    codename: "Conversational Biometrics",
    tagline: "Señales emocionales",
    description:
      "Detecta urgencia, frustración, agresividad e intención comercial dentro de conversaciones y llamadas.",
    icon: ScanHeart,
    signal: 79,
    pressure: 67,
    impact: "412 señales detectadas",
    palette: "red",
    nodes: ["Urgencia", "Frustración", "Agresividad", "Intención", "Tono", "Riesgo"],
    demoEvents: ["Urgencia alta detectada", "Frustración escala a humano", "Intención de compra confirmada"],
    metrics: [
      { label: "Señales", value: "412", delta: "+51" },
      { label: "Intención", value: "78%", delta: "+7%" },
      { label: "Riesgo tono", value: "21%", delta: "Medio" }
    ]
  },
  {
    id: "demo",
    name: "LIVE DEMO ENGINE",
    codename: "Client Reality Forge",
    tagline: "Simulaciones vivas para clientes",
    description:
      "Crea demos reales con nombre del negocio, branding, sector, logo, servicios, precios, móvil interactivo, agenda y KPIs sincronizados.",
    icon: CalendarClock,
    signal: 98,
    pressure: 36,
    impact: "Demo lista en 4 min",
    palette: "amber",
    nodes: ["Branding", "Sector", "Servicios", "Precios", "Móvil", "Agenda", "KPIs"],
    demoEvents: ["Branding aplicado", "Servicio premium sincronizado", "Conversación demo generada"],
    metrics: [
      { label: "Tiempo demo", value: "4m", delta: "-63%" },
      { label: "Paneles", value: "7", delta: "Sync" },
      { label: "Impacto", value: "9.4/10", delta: "+1.1" }
    ]
  },
  {
    id: "prime",
    name: "PRIME",
    codename: "Physical Avatar",
    tagline: "Avatar físico de NOVAIX",
    description:
      "Guía la plataforma, habla visualmente, reacciona al estado operativo y acompaña la UX como presencia holográfica inteligente.",
    icon: Eye,
    signal: 99,
    pressure: 23,
    impact: "Conciencia interfaz activa",
    palette: "cyan",
    nodes: ["Guía", "Reacción", "HUD", "Contexto", "Voz visual", "Presencia"],
    demoEvents: ["PRIME detecta presión", "Guía propone automatización", "Estado emocional actualizado"],
    metrics: [
      { label: "Contexto", value: "99%", delta: "Activo" },
      { label: "Intervenciones", value: "14", delta: "+5" },
      { label: "Señal", value: "Clara", delta: "OK" }
    ]
  }
];

export const integrations = ["WhatsApp", "Telegram", "Gmail", "Calendar", "Make", "N8N", "HubSpot", "Salesforce", "Holded", "Odoo"];

export const businessTypes = ["Clínica dental", "Gimnasio premium", "Restaurante", "Inmobiliaria", "Academia", "Clínica estética", "SaaS B2B"];
