import { CloudCostPoint, WorkforceNode, BurnoutMetric, GpuStatus, Competitor, EquitySlice, ThreatLog } from '../types';

export const CLOUD_COST_DATA: CloudCostPoint[] = [
  { day: '1', aws: 4000, openai: 2400 },
  { day: '5', aws: 3000, openai: 1398 },
  { day: '10', aws: 2000, openai: 8800 }, // Anomaly
  { day: '15', aws: 2780, openai: 3908 },
  { day: '20', aws: 1890, openai: 4800 },
  { day: '25', aws: 2390, openai: 3800 },
  { day: '30', aws: 3490, openai: 4300 },
];

export const BURNOUT_DATA: BurnoutMetric[] = [
  { subject: 'Overtime', A: 120, B: 110 },
  { subject: 'Commits', A: 98, B: 130 },
  { subject: 'Slack', A: 86, B: 130 },
  { subject: 'PRs', A: 99, B: 100 },
  { subject: 'Docs', A: 85, B: 90 },
  { subject: 'Meetings', A: 65, B: 85 },
];

export const WORKFORCE_DATA: WorkforceNode[] = [
  { id: '1', name: 'Sarah J.', type: 'human', status: 'Focus', metric: 85 },
  { id: '2', name: 'Devin A.', type: 'human', status: 'Burnout Risk', metric: 40 },
  { id: '3', name: 'AutoGPT-1', type: 'agent', status: 'Online', metric: 99.9 },
  { id: '4', name: 'CodeLlama', type: 'agent', status: 'Training', metric: 98.2 },
];

export const GPU_FLEET: GpuStatus[] = Array.from({ length: 16 }).map((_, i) => ({
  id: `gpu-${i}`,
  type: i % 3 === 0 ? 'A100' : 'H100',
  status: i === 4 || i === 12 ? 'idle' : i === 7 ? 'maintenance' : 'active'
}));

export const THREAT_LOGS: ThreatLog[] = [
  { id: 't1', timestamp: '10:42:01', origin: 'St. Petersburg', type: 'SSH Brute Force', status: 'blocked' },
  { id: 't2', timestamp: '10:42:15', origin: 'Shenzhen', type: 'SQL Injection', status: 'blocked' },
  { id: 't3', timestamp: '10:43:00', origin: 'Unknown', type: 'DDoS L7', status: 'warning' },
];

export const EQUITY_DATA: EquitySlice[] = [
  { name: 'Founders', value: 40, fill: '#3B82F6' },
  { name: 'Series A', value: 20, fill: '#F59E0B' },
  { name: 'Employees', value: 15, fill: '#10B981' },
  { name: 'Pool', value: 10, fill: '#64748B' },
  { name: 'Angels', value: 15, fill: '#8B5CF6' },
];

export const COMPETITORS: Competitor[] = [
  { name: 'OmniCorp', distance: 80, angle: 45, change: 'up' },
  { name: 'Nexus AI', distance: 40, angle: 120, change: 'stable' },
  { name: 'CyberDyne', distance: 90, angle: 280, change: 'down' },
  { name: 'Tyrell', distance: 60, angle: 310, change: 'up' },
];
