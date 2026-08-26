import type {
  PlatformSummaryMetrics,
  MonitoringWilayahData,
  SystemTaskItem,
  SpecialAttentionItem,
  WorkspaceTierItem,
  RealtimeActivityItem,
  PlatformInsightsData,
  CurrentUser
} from '../../core/types/dashboard.types';

export const mockCurrentUser: CurrentUser = {
  id: 'admin-01',
  name: 'Administrator Utama',
  role: 'Platform Administrator',
  scopeLabel: 'Indonesia (Nasional)',
  roleDescription: 'Platform Administrator',
  activeUsersCount: 28,
  permissionLevel: 'Full Access'
};

export const mockSummaryMetrics: PlatformSummaryMetrics = {
  wilayahAktif: {
    value: 38,
    total: 38,
    percentage: 100
  },
  penggunaTerdaftar: {
    value: '2.847.592',
    change: '+12.8% dari bulan lalu',
    isPositive: true
  },
  aktivitasHariIni: {
    value: '132.498',
    change: '+18.7% dari kemarin',
    isPositive: true
  },
  sistemStatus: {
    status: 'Optimal',
    subtitle: 'Semua sistem berjalan baik'
  }
};

export const mockMonitoringData: MonitoringWilayahData = {
  statusCount: {
    aman: { count: 28, label: 'Provinsi' },
    perhatian: { count: 7, label: 'Provinsi' },
    kritis: { count: 3, label: 'Provinsi' }
  },
  selectedTier: 'Provinsi'
};

export const mockSystemTasks: SystemTaskItem[] = [
  {
    id: 't-1',
    title: 'Verifikasi Data Wilayah',
    current: 120,
    total: 150,
    percentage: 80,
    iconType: 'verification'
  },
  {
    id: 't-2',
    title: 'Sinkronisasi Data',
    current: 45,
    total: 45,
    percentage: 100,
    iconType: 'sync'
  },
  {
    id: 't-3',
    title: 'Backup Database',
    current: 1,
    total: 1,
    percentage: 100,
    iconType: 'backup'
  },
  {
    id: 't-4',
    title: 'Audit Keamanan',
    current: 75,
    total: 100,
    percentage: 75,
    iconType: 'audit'
  },
  {
    id: 't-5',
    title: 'Pembaruan Sistem',
    current: 2,
    total: 4,
    percentage: 50,
    iconType: 'update'
  }
];

export const mockSpecialAttentions: SpecialAttentionItem[] = [
  {
    id: 'sa-1',
    title: '3 Wilayah dengan aktivitas rendah',
    subtitle: 'Memerlukan perhatian khusus',
    level: 'critical'
  },
  {
    id: 'sa-2',
    title: '5 Laporan warga belum ditindaklanjuti',
    subtitle: 'Perlu verifikasi dan tindak lanjut',
    level: 'warning'
  },
  {
    id: 'sa-3',
    title: '2 Sistem integrasi mengalami delay',
    subtitle: 'Perlu pengecekan sistem',
    level: 'critical'
  }
];

export const mockWorkspaceTiers: WorkspaceTierItem[] = [
  {
    id: 'ws-provinsi',
    title: 'Provinsi Workspace',
    countLabel: '38 Provinsi',
    iconType: 'provinsi',
    color: '#00e5ff'
  },
  {
    id: 'ws-kabupaten',
    title: 'Kabupaten Workspace',
    countLabel: '514 Kab/Kota',
    iconType: 'kabupaten',
    color: '#38bdf8'
  },
  {
    id: 'ws-kecamatan',
    title: 'Kecamatan Workspace',
    countLabel: '7.277 Kecamatan',
    iconType: 'kecamatan',
    color: '#60a5fa'
  },
  {
    id: 'ws-desa',
    title: 'Desa Workspace',
    countLabel: '83.931 Desa',
    iconType: 'desa',
    color: '#34d399'
  },
  {
    id: 'ws-rw',
    title: 'RW Workspace',
    countLabel: '259.306 RW',
    iconType: 'rw',
    color: '#a855f7'
  },
  {
    id: 'ws-rt',
    title: 'RT Workspace',
    countLabel: '1.017.290 RT',
    iconType: 'rt',
    color: '#f59e0b'
  }
];

export const mockRealtimeActivities: RealtimeActivityItem[] = [
  {
    id: 'act-1',
    time: '10:24',
    title: 'Login Administrator',
    actor: 'Administrator Utama',
    type: 'login'
  },
  {
    id: 'act-2',
    time: '10:18',
    title: 'Verifikasi Wilayah',
    actor: 'Jawa Tengah - Terverifikasi',
    tag: 'Terverifikasi',
    type: 'verification'
  },
  {
    id: 'act-3',
    time: '10:15',
    title: 'Laporan Masuk',
    actor: 'Laporan Infrastruktur - Bandung',
    type: 'report'
  },
  {
    id: 'act-4',
    time: '10:10',
    title: 'Pengguna Baru',
    actor: '125 pengguna mendaftar',
    type: 'user'
  },
  {
    id: 'act-5',
    time: '10:05',
    title: 'Backup Selesai',
    actor: 'Database berhasil dibackup',
    type: 'backup'
  }
];

export const mockPlatformInsights: PlatformInsightsData = {
  pertumbuhanPengguna: {
    value: '+12,8%',
    period: 'dari periode sebelumnya',
    sparkline: [20, 24, 22, 28, 30, 29, 36, 42, 40, 48]
  },
  partisipasiWarga: {
    percentage: 68.4,
    change: '↑ 8,2% dari bulan lalu',
    subtitle: 'Rata-rata Nasional'
  },
  laporanSelesai: {
    count: '1.248',
    change: '↑ 15,3% dari bulan lalu',
    percentage: 82
  },
  kepuasanWarga: {
    rating: '4,6',
    max: '/ 5',
    change: '↑ 0,3 dari bulan lalu',
    stars: 5
  }
};

/* Compatibility exports */
export const mockDashboardMetrics: any = {
  totalWorkspace: { value: '120.654', change: '+2,06%', isPositive: true },
  totalWargaAktif: { value: '25.684.112', change: '+1,37%', isPositive: true },
  totalAktivitas: { value: '184.932', change: '+7,44%', isPositive: true },
  laporanMasuk: { value: '5.432', change: '+11,11%', isPositive: false },
  tingkatRespons: { value: '92,7%', change: '+3,4%', isPositive: true },
  kegiatanSelesai: { value: '14.287', change: '+6,7%', isPositive: true }
};
export const mockSystemAlarms: any[] = [];
export const mockPriorityRegions: any[] = [];
export const mockWorkspaceDistributions: any[] = [];
export const mockRecentActivities = mockRealtimeActivities;
