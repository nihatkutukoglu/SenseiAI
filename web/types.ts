export interface AiActionProps {
  label: string;
  actionText: string;
  variant: 'revenue' | 'risk' | 'logic' | 'growth';
  onExecute: () => void;
}

export interface CloudCostPoint {
  day: string;
  aws: number;
  openai: number;
}

export interface WorkforceNode {
  id: string;
  name: string;
  type: 'human' | 'agent';
  status: string; // "Focus", "Burnout Risk", "Online", "Training"
  metric: number; // Mood score or Uptime %
}

export interface BurnoutMetric {
  subject: string;
  A: number; // Team Average
  B: number; // Threshold
}

export interface GpuStatus {
  id: string;
  type: 'H100' | 'A100';
  status: 'active' | 'idle' | 'maintenance';
}

export interface Competitor {
  name: string;
  distance: number; // 0-100, closer is higher threat
  angle: number; // For radar positioning
  change: 'up' | 'down' | 'stable';
}

export interface EquitySlice {
  name: string;
  value: number;
  fill: string;
}

export interface ThreatLog {
  id: string;
  timestamp: string;
  origin: string;
  type: string;
  status: 'blocked' | 'warning' | 'critical';
}
