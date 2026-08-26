import type { RolePermissionMatrix, AuditLogItem } from '../../core/types/security.types';

export const mockRoleMatrices: RolePermissionMatrix[] = [
  {
    roleId: 'role-platform-admin',
    roleName: 'Platform Administrator',
    tierLevel: 'Nasional',
    description: 'Pengelola teknis dan arsitektur platform nasional dengan hak akses penuh ke seluruh ekosistem.',
    activeUsersCount: 3,
    modules: [
      { moduleId: 'wilayah', moduleName: 'Hierarki Wilayah', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'workspace', moduleName: 'Workspace Manager', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'pengguna', moduleName: 'Pengguna & Warga', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'pengurus', moduleName: 'Pengurus & Aparatur', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'alarm', moduleName: 'Pusat Alarm SOS', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'laporan', moduleName: 'Laporan Pengaduan', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true }
    ]
  },
  {
    roleId: 'role-rw-admin',
    roleName: 'Administrator Rukun Warga (RW)',
    tierLevel: 'RW',
    description: 'Pengelola operasional lingkungan RW yang mengawasi RT, memverifikasi warga, dan merespon pengaduan.',
    activeUsersCount: 259306,
    modules: [
      { moduleId: 'wilayah', moduleName: 'Hierarki Wilayah', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: false, canExport: true },
      { moduleId: 'workspace', moduleName: 'Workspace Manager', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: false, canExport: true },
      { moduleId: 'pengguna', moduleName: 'Pengguna & Warga', canView: true, canCreate: false, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'pengurus', moduleName: 'Pengurus & Aparatur', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: false, canExport: true },
      { moduleId: 'alarm', moduleName: 'Pusat Alarm SOS', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'laporan', moduleName: 'Laporan Pengaduan', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true }
    ]
  },
  {
    roleId: 'role-rt-admin',
    roleName: 'Administrator Rukun Tetangga (RT)',
    tierLevel: 'RT',
    description: 'Pengurus tatap muka lini pertama dengan warga, memvalidasi permohonan surat dan verifikasi domisili.',
    activeUsersCount: 1017290,
    modules: [
      { moduleId: 'wilayah', moduleName: 'Hierarki Wilayah', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'workspace', moduleName: 'Workspace Manager', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'pengguna', moduleName: 'Pengguna & Warga', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'pengurus', moduleName: 'Pengurus & Aparatur', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'alarm', moduleName: 'Pusat Alarm SOS', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: false },
      { moduleId: 'laporan', moduleName: 'Laporan Pengaduan', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true }
    ]
  }
];

export const mockAuditLogs: AuditLogItem[] = [
  {
    id: 'aud-01',
    timestamp: '2 menit yang lalu',
    timeExact: '26/08/2026 16:15:32 WIB',
    actorName: 'Administrator Utama',
    actorRole: 'Platform Administrator',
    actorScope: 'Indonesia (Nasional)',
    actionType: 'emergency_escalate',
    actionTitle: 'Eskalasi Alarm Kedaruratan',
    description: 'Meneruskan sinyal darurat medis RW 02 Sukamaju ke Posko Tim Reaksi Cepat Cibinong.',
    ipAddress: '182.253.110.42',
    device: 'Chrome 124 on Windows 11',
    riskLevel: 'high'
  },
  {
    id: 'aud-02',
    timestamp: '18 menit yang lalu',
    timeExact: '26/08/2026 15:59:10 WIB',
    actorName: 'H. Agus Permana',
    actorRole: 'Ketua RW 02',
    actorScope: 'RW 02 Sukamaju',
    actionType: 'citizen_verify',
    actionTitle: 'Verifikasi KTP Warga',
    description: 'Menyetujui permohonan verifikasi identitas e-KTP warga Budi Kurniawan (RT 01).',
    ipAddress: '114.122.38.19',
    device: 'RuangWarga Web on macOS',
    riskLevel: 'low'
  },
  {
    id: 'aud-03',
    timestamp: '45 menit yang lalu',
    timeExact: '26/08/2026 15:32:05 WIB',
    actorName: 'Drs. Rusliandy, M.Si',
    actorRole: 'Camat Cibinong',
    actorScope: 'Kecamatan Cibinong',
    actionType: 'territory_update',
    actionTitle: 'Pembaruan Data Sub-Wilayah',
    description: 'Mengubah status pembinaan wilayah Kelurahan Sukamaju menjadi Optimal.',
    ipAddress: '36.88.192.81',
    device: 'Chrome on Android Tablet',
    riskLevel: 'medium'
  },
  {
    id: 'aud-04',
    timestamp: '1 jam yang lalu',
    timeExact: '26/08/2026 15:10:44 WIB',
    actorName: 'Administrator Utama',
    actorRole: 'Platform Administrator',
    actorScope: 'Indonesia (Nasional)',
    actionType: 'login',
    actionTitle: 'Autentikasi Sesi Admin Berhasil',
    description: 'Login via 2-Factor Authentication (2FA) berhasil dari jaringan kantor pusat.',
    ipAddress: '182.253.110.42',
    device: 'Chrome on Windows 11',
    riskLevel: 'low'
  },
  {
    id: 'aud-05',
    timestamp: '3 jam yang lalu',
    timeExact: '26/08/2026 13:20:18 WIB',
    actorName: 'Operator Wilayah Bogor',
    actorRole: 'Operator Sistem',
    actorScope: 'Kabupaten Bogor',
    actionType: 'data_export',
    actionTitle: 'Ekspor Data Rekapitulasi Warga',
    description: 'Mengunduh rekapitulasi data demografi 514 RW format Excel terenkripsi.',
    ipAddress: '114.79.44.102',
    device: 'Edge on Windows 10',
    riskLevel: 'high'
  }
];
