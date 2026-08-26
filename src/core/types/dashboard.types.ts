export interface ScopeNode {
  id: string;
  name: string;
  level: 'national' | 'province' | 'regency' | 'district' | 'village' | 'rw' | 'rt';
  code: string;
  parentId?: string;
  stats: {
    provincesCount?: number;
    regenciesCount?: number;
    districtsCount?: number;
    villagesCount?: number;
    rwCount?: number;
    rtCount?: number;
    wargaCount: number;
    workspacesCount?: number;
    activitiesToday?: number;
    status?: 'optimal' | 'warning' | 'critical';
  };
}

export interface ScopeBreadcrumbItem {
  id: string;
  name: string;
  level: string;
}

export interface PlatformSummaryMetrics {
  wilayahAktif: { value: number; total: number; percentage: number };
  penggunaTerdaftar: { value: string; change: string; isPositive: boolean };
  aktivitasHariIni: { value: string; change: string; isPositive: boolean };
  sistemStatus: { status: 'Optimal' | 'Warning' | 'Critical'; subtitle: string };
}

export interface MonitoringWilayahData {
  statusCount: {
    aman: { count: number; label: string };
    perhatian: { count: number; label: string };
    kritis: { count: number; label: string };
  };
  selectedTier: 'Provinsi' | 'Kabupaten/Kota' | 'Kecamatan' | 'Desa/Kelurahan' | 'RW' | 'RT';
}

export interface SystemTaskItem {
  id: string;
  title: string;
  current: number;
  total: number;
  percentage: number;
  iconType: 'verification' | 'sync' | 'backup' | 'audit' | 'update';
}

export interface SpecialAttentionItem {
  id: string;
  title: string;
  subtitle: string;
  level: 'critical' | 'warning' | 'info';
}

export interface WorkspaceTierItem {
  id: string;
  title: string;
  countLabel: string;
  iconType: 'provinsi' | 'kabupaten' | 'kecamatan' | 'desa' | 'rw' | 'rt';
  color: string;
}

export interface RealtimeActivityItem {
  id: string;
  time: string;
  title: string;
  actor: string;
  tag?: string;
  type: 'login' | 'verification' | 'report' | 'user' | 'backup';
}

export interface PlatformInsightsData {
  pertumbuhanPengguna: {
    value: string;
    period: string;
    sparkline: number[];
  };
  partisipasiWarga: {
    percentage: number;
    change: string;
    subtitle: string;
  };
  laporanSelesai: {
    count: string;
    change: string;
    percentage: number;
  };
  kepuasanWarga: {
    rating: string;
    max: string;
    change: string;
    stars: number;
  };
}

export interface CurrentUser {
  id: string;
  name: string;
  role: string;
  scopeLabel: string;
  roleDescription?: string;
  activeUsersCount?: number;
  permissionLevel?: string;
  avatarUrl?: string;
}

/* Backward compatibility aliases */
export type DashboardMetrics = any;
export type SystemTask = any;
export type SystemAlarm = any;
export type PriorityRegion = any;
export type WorkspaceDistribution = any;
export type RealtimeActivity = any;
