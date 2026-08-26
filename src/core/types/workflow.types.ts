export interface SystemJob {
  id: string;
  title: string;
  category: 'sync' | 'backup' | 'verification' | 'audit' | 'maintenance';
  description: string;
  scheduleInterval: string;
  currentCount: number;
  totalCount: number;
  percentage: number;
  status: 'running' | 'idle' | 'scheduled' | 'completed';
  lastRunTime: string;
  nextRunTime: string;
  executionDuration: string;
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  actorRole: string; // e.g. "Pemohon (Warga)", "Ketua RT", "Ketua RW", "Kelurahan"
  actionDescription: string;
  slaHours: number;
}

export interface GovernanceWorkflow {
  id: string;
  code: string;
  title: string;
  category: 'administrasi' | 'bantuan' | 'kegiatan' | 'keamanan';
  description: string;
  status: 'active' | 'draft';
  totalSteps: number;
  avgCompletionHours: number;
  steps: WorkflowStep[];
}
