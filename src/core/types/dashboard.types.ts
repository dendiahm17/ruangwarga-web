export interface SystemTask {
  id: string;
  title: string;
  count: number;
  description: string;
  type: 'verification' | 'deadline' | 'approval' | 'completed_today';
  urgentCount?: number;
}

export interface SystemAlarm {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  level: 'danger' | 'warning' | 'info' | 'security';
}

export interface PriorityRegion {
  id: string;
  rank: number;
  name: string;
  levelName: string;
  metricLabel: string;
  metricValue: string;
  status: 'Perlu Penanganan' | 'Perlu Perhatian' | 'Baik';
}

export interface WorkspaceDistribution {
  level: string;
  count: number;
  percentage: number;
}

export interface RealtimeActivity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'kegiatan' | 'laporan' | 'verifikasi' | 'musyawarah' | 'agenda';
}

export interface DashboardMetrics {
  totalWorkspace: { value: string; change: string; isPositive: boolean };
  totalWargaAktif: { value: string; change: string; isPositive: boolean };
  totalAktivitas: { value: string; change: string; isPositive: boolean };
  laporanMasuk: { value: string; change: string; isPositive: boolean };
  tingkatRespons: { value: string; change: string; isPositive: boolean };
  kegiatanSelesai: { value: string; change: string; isPositive: boolean };
}

export interface CurrentUser {
  id: string;
  name: string;
  role: string;
  roleDescription: string;
  scopeLabel: string;
  permissionLevel: string;
  activeUsersCount: number;
  avatarUrl?: string;
}
