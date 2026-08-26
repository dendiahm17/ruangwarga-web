import { 
  DashboardMetrics, 
  SystemTask, 
  SystemAlarm, 
  PriorityRegion, 
  WorkspaceDistribution, 
  RealtimeActivity,
  CurrentUser 
} from '../../core/types/dashboard.types';

export const mockDashboardMetrics: DashboardMetrics = {
  totalWorkspace: { value: '120.654', change: '+2,06%', isPositive: true },
  totalWargaAktif: { value: '25.684.112', change: '+1,37%', isPositive: true },
  totalAktivitas: { value: '184.932', change: '+7,44%', isPositive: true },
  laporanMasuk: { value: '5.432', change: '+11,11%', isPositive: false },
  tingkatRespons: { value: '92,7%', change: '+3,4%', isPositive: true },
  kegiatanSelesai: { value: '14.287', change: '+6,7%', isPositive: true },
};

export const mockSystemTasks: SystemTask[] = [
  {
    id: '1',
    title: 'Menunggu Verifikasi',
    count: 24,
    description: 'Laporan & Data',
    type: 'verification',
    urgentCount: 6
  },
  {
    id: '2',
    title: 'Mendekati Tenggat',
    count: 42,
    description: 'Kegiatan & Program',
    type: 'deadline',
    urgentCount: 14
  },
  {
    id: '3',
    title: 'Menunggu Persetujuan',
    count: 18,
    description: 'Agenda & Usulan',
    type: 'approval',
    urgentCount: 3
  },
  {
    id: '4',
    title: 'Selesai Hari Ini',
    count: 116,
    description: 'Tugas Diselesaikan',
    type: 'completed_today'
  }
];

export const mockSystemAlarms: SystemAlarm[] = [
  {
    id: '1',
    title: '12 wilayah memiliki tingkat partisipasi rendah',
    subtitle: 'Perlu intervensi dan pendampingan',
    time: '10:43',
    level: 'danger'
  },
  {
    id: '2',
    title: '5 laporan darurat belum terselesaikan',
    subtitle: 'Memerlukan koordinasi segera',
    time: '10:39',
    level: 'warning'
  },
  {
    id: '3',
    title: '23 kegiatan terhambat karena menunggu persetujuan',
    subtitle: 'Percepatan persetujuan diperlukan',
    time: '10:31',
    level: 'info'
  },
  {
    id: '4',
    title: 'Sistem mendeteksi anomali aktivitas di 2 wilayah',
    subtitle: 'Perlu verifikasi dan pengecekan',
    time: '10:21',
    level: 'security'
  }
];

export const mockPriorityRegions: PriorityRegion[] = [
  {
    id: '1',
    rank: 1,
    name: 'Kab. Nias Selatan, Sumatera Utara',
    levelName: 'Kabupaten',
    metricLabel: 'Partisipasi Warga',
    metricValue: '32%',
    status: 'Perlu Penanganan'
  },
  {
    id: '2',
    rank: 2,
    name: 'Kab. Pegunungan Arfak, Papua Barat',
    levelName: 'Kabupaten',
    metricLabel: 'Respons Laporan',
    metricValue: '41%',
    status: 'Perlu Penanganan'
  },
  {
    id: '3',
    rank: 3,
    name: 'Kab. Sumba Barat Daya, NTT',
    levelName: 'Kabupaten',
    metricLabel: 'Aktivitas Warga',
    metricValue: '45%',
    status: 'Perlu Penanganan'
  },
  {
    id: '4',
    rank: 4,
    name: 'Kab. Puncak, Papua Tengah',
    levelName: 'Kabupaten',
    metricLabel: 'Verifikasi Warga',
    metricValue: '48%',
    status: 'Perlu Penanganan'
  },
  {
    id: '5',
    rank: 5,
    name: 'Kab. Kepulauan Talaud, Sulawesi Utara',
    levelName: 'Kabupaten',
    metricLabel: 'Kegiatan Selesai',
    metricValue: '52%',
    status: 'Perlu Perhatian'
  }
];

export const mockWorkspaceDistributions: WorkspaceDistribution[] = [
  { level: 'Provinsi', count: 38, percentage: 0.03 },
  { level: 'Kabupaten/Kota', count: 416, percentage: 0.34 },
  { level: 'Kecamatan', count: 2857, percentage: 2.37 },
  { level: 'Desa/Kelurahan', count: 8732, percentage: 7.24 },
  { level: 'RW', count: 42158, percentage: 34.95 },
  { level: 'RT', count: 66453, percentage: 55.08 }
];

export const mockRecentActivities: RealtimeActivity[] = [
  {
    id: '1',
    title: 'Kegiatan "Kerja Bakti" dibuat di RW 05, Kel. Cempaka Putih',
    description: 'oleh Ketua RW',
    time: '10:45',
    type: 'kegiatan'
  },
  {
    id: '2',
    title: 'Laporan baru masuk di RW 02, Kel. Sukamaju',
    description: 'Laporan Jalan Rusak',
    time: '10:43',
    type: 'laporan'
  },
  {
    id: '3',
    title: 'Warga baru diverifikasi di RT 03, RW 02',
    description: 'oleh Ketua RT',
    time: '10:42',
    type: 'verifikasi'
  },
  {
    id: '4',
    title: 'Usulan musyawarah dibuat di Desa Suka Maju',
    description: 'Usulan Pembangunan Posyandu',
    time: '10:39',
    type: 'musyawarah'
  },
  {
    id: '5',
    title: 'Agenda "Kerja Bakti Lingkungan" selesai di RW 01',
    description: '25 peserta hadir',
    time: '10:37',
    type: 'agenda'
  }
];

export const mockCurrentUser: CurrentUser = {
  id: 'usr-admin-1',
  name: 'Admin Platform',
  role: 'Super Administrator',
  roleDescription: 'Super Administrator',
  scopeLabel: 'Seluruh Indonesia',
  permissionLevel: 'Full Access',
  activeUsersCount: 28,
  avatarUrl: ''
};
