import type { RolePermissionMatrix, AuditLogItem } from '../../core/types/security.types';

export const mockRoleMatrices: RolePermissionMatrix[] = [
  {
    roleId: 'role-superadmin',
    roleName: 'Platform Super Administrator',
    tierLevel: 'Nasional',
    description: 'Otoritas tertinggi pengelolaan sistem, arsitektur data nasional, pemeliharaan background jobs & audit keamanan.',
    activeUsersCount: 3,
    modules: [
      { moduleId: 'mod-dashboard', moduleName: 'Dashboard Utama', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'mod-wilayah', moduleName: 'Hierarki Wilayah 7 Tingkat', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'mod-workspace', moduleName: 'Manajemen Workspace', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'mod-pengguna', moduleName: 'Database Warga & KTP', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'mod-pengurus', moduleName: 'Aparatur & Pejabat Pembina', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'mod-alarm', moduleName: 'Pusat Alarm Kedaruratan (SOS)', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'mod-laporan', moduleName: 'Pengaduan & Aspirasi Warga', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'mod-role', moduleName: 'Matriks Role & Hak Akses', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'mod-audit', moduleName: 'Log Forensik Keamanan', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-workflow', moduleName: 'Alur Kerja & SOP Tata Kelola', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'mod-tugas', moduleName: 'Pemeliharaan Tugas Sistem', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true },
      { moduleId: 'mod-wawasan', moduleName: 'Wawasan & Analitik Eksekutif', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-pengaturan', moduleName: 'Pengaturan & Integrasi Cloud', canView: true, canCreate: true, canEdit: true, canDelete: true, canVerify: true, canExport: true }
    ]
  },
  {
    roleId: 'role-provinsi',
    roleName: 'Administrator Provinsi',
    tierLevel: 'Provinsi',
    description: 'Pengawasan regional provinsi, koordinasi antar kabupaten/kota, evaluasi respon darurat & audit kepatuhan.',
    activeUsersCount: 76,
    modules: [
      { moduleId: 'mod-dashboard', moduleName: 'Dashboard Utama', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-wilayah', moduleName: 'Hierarki Wilayah 7 Tingkat', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-workspace', moduleName: 'Manajemen Workspace', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-pengguna', moduleName: 'Database Warga & KTP', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-pengurus', moduleName: 'Aparatur & Pejabat Pembina', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-alarm', moduleName: 'Pusat Alarm Kedaruratan (SOS)', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-laporan', moduleName: 'Pengaduan & Aspirasi Warga', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-role', moduleName: 'Matriks Role & Hak Akses', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-audit', moduleName: 'Log Forensik Keamanan', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: true },
      { moduleId: 'mod-workflow', moduleName: 'Alur Kerja & SOP Tata Kelola', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-tugas', moduleName: 'Pemeliharaan Tugas Sistem', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-wawasan', moduleName: 'Wawasan & Analitik Eksekutif', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-pengaturan', moduleName: 'Pengaturan & Integrasi Cloud', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false }
    ]
  },
  {
    roleId: 'role-kabkot',
    roleName: 'Administrator Kabupaten/Kota',
    tierLevel: 'Kabupaten/Kota',
    description: 'Manajemen aparatur daerah, validasi peresmian workspace kecamatan & desa, serta pengawasan bansos.',
    activeUsersCount: 832,
    modules: [
      { moduleId: 'mod-dashboard', moduleName: 'Dashboard Utama', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-wilayah', moduleName: 'Hierarki Wilayah 7 Tingkat', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-workspace', moduleName: 'Manajemen Workspace', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-pengguna', moduleName: 'Database Warga & KTP', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-pengurus', moduleName: 'Aparatur & Pejabat Pembina', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-alarm', moduleName: 'Pusat Alarm Kedaruratan (SOS)', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-laporan', moduleName: 'Pengaduan & Aspirasi Warga', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-role', moduleName: 'Matriks Role & Hak Akses', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-audit', moduleName: 'Log Forensik Keamanan', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-workflow', moduleName: 'Alur Kerja & SOP Tata Kelola', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-tugas', moduleName: 'Pemeliharaan Tugas Sistem', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-wawasan', moduleName: 'Wawasan & Analitik Eksekutif', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-pengaturan', moduleName: 'Pengaturan & Integrasi Cloud', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false }
    ]
  },
  {
    roleId: 'role-kecamatan',
    roleName: 'Administrator Kecamatan',
    tierLevel: 'Kecamatan',
    description: 'Koordinasi lintas kelurahan/desa, pembinaan posko trantibum dan monitoring kepuasan warga.',
    activeUsersCount: 5714,
    modules: [
      { moduleId: 'mod-dashboard', moduleName: 'Dashboard Utama', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-wilayah', moduleName: 'Hierarki Wilayah 7 Tingkat', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-workspace', moduleName: 'Manajemen Workspace', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-pengguna', moduleName: 'Database Warga & KTP', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-pengurus', moduleName: 'Aparatur & Pejabat Pembina', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-alarm', moduleName: 'Pusat Alarm Kedaruratan (SOS)', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-laporan', moduleName: 'Pengaduan & Aspirasi Warga', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-role', moduleName: 'Matriks Role & Hak Akses', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-audit', moduleName: 'Log Forensik Keamanan', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-workflow', moduleName: 'Alur Kerja & SOP Tata Kelola', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-tugas', moduleName: 'Pemeliharaan Tugas Sistem', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-wawasan', moduleName: 'Wawasan & Analitik Eksekutif', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: true },
      { moduleId: 'mod-pengaturan', moduleName: 'Pengaturan & Integrasi Cloud', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false }
    ]
  },
  {
    roleId: 'role-desa',
    roleName: 'Administrator Desa / Kelurahan',
    tierLevel: 'Desa/Kelurahan',
    description: 'Pelayanan administrasi kependudukan, pengesahan surat pengantar resmi & pengelolaan bansos desa.',
    activeUsersCount: 17464,
    modules: [
      { moduleId: 'mod-dashboard', moduleName: 'Dashboard Utama', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-wilayah', moduleName: 'Hierarki Wilayah 7 Tingkat', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-workspace', moduleName: 'Manajemen Workspace', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-pengguna', moduleName: 'Database Warga & KTP', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-pengurus', moduleName: 'Aparatur & Pejabat Pembina', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-alarm', moduleName: 'Pusat Alarm Kedaruratan (SOS)', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-laporan', moduleName: 'Pengaduan & Aspirasi Warga', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-role', moduleName: 'Matriks Role & Hak Akses', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-audit', moduleName: 'Log Forensik Keamanan', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-workflow', moduleName: 'Alur Kerja & SOP Tata Kelola', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-tugas', moduleName: 'Pemeliharaan Tugas Sistem', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-wawasan', moduleName: 'Wawasan & Analitik Eksekutif', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-pengaturan', moduleName: 'Pengaturan & Integrasi Cloud', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false }
    ]
  },
  {
    roleId: 'role-rw',
    roleName: 'Administrator RW',
    tierLevel: 'RW',
    description: 'Pusat komando lingkungan Rukun Warga, verifikasi usulan RT, eskalasi darurat & manajemen iuran warga.',
    activeUsersCount: 84316,
    modules: [
      { moduleId: 'mod-dashboard', moduleName: 'Dashboard Utama', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-wilayah', moduleName: 'Hierarki Wilayah 7 Tingkat', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-workspace', moduleName: 'Manajemen Workspace', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-pengguna', moduleName: 'Database Warga & KTP', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-pengurus', moduleName: 'Aparatur & Pejabat Pembina', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-alarm', moduleName: 'Pusat Alarm Kedaruratan (SOS)', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-laporan', moduleName: 'Pengaduan & Aspirasi Warga', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-role', moduleName: 'Matriks Role & Hak Akses', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-audit', moduleName: 'Log Forensik Keamanan', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-workflow', moduleName: 'Alur Kerja & SOP Tata Kelola', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-tugas', moduleName: 'Pemeliharaan Tugas Sistem', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-wawasan', moduleName: 'Wawasan & Analitik Eksekutif', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-pengaturan', moduleName: 'Pengaturan & Integrasi Cloud', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false }
    ]
  },
  {
    roleId: 'role-rt',
    roleName: 'Administrator RT',
    tierLevel: 'RT',
    description: 'Lini pertama pelayanan warga, verifikasi e-KTP KK warga baru, tanggap darurat SOS lingkungan & pengantar surat.',
    activeUsersCount: 132906,
    modules: [
      { moduleId: 'mod-dashboard', moduleName: 'Dashboard Utama', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: false },
      { moduleId: 'mod-wilayah', moduleName: 'Hierarki Wilayah 7 Tingkat', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: true, canExport: false },
      { moduleId: 'mod-workspace', moduleName: 'Manajemen Workspace', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-pengguna', moduleName: 'Database Warga & KTP', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-pengurus', moduleName: 'Aparatur & Pejabat Pembina', canView: true, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-alarm', moduleName: 'Pusat Alarm Kedaruratan (SOS)', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-laporan', moduleName: 'Pengaduan & Aspirasi Warga', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: true },
      { moduleId: 'mod-role', moduleName: 'Matriks Role & Hak Akses', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-audit', moduleName: 'Log Forensik Keamanan', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-workflow', moduleName: 'Alur Kerja & SOP Tata Kelola', canView: true, canCreate: true, canEdit: true, canDelete: false, canVerify: true, canExport: false },
      { moduleId: 'mod-tugas', moduleName: 'Pemeliharaan Tugas Sistem', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-wawasan', moduleName: 'Wawasan & Analitik Eksekutif', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false },
      { moduleId: 'mod-pengaturan', moduleName: 'Pengaturan & Integrasi Cloud', canView: false, canCreate: false, canEdit: false, canDelete: false, canVerify: false, canExport: false }
    ]
  }
];

export const mockAuditLogs: AuditLogItem[] = [
  {
    id: 'log-001',
    timestamp: '26 Agu 2026, 15:42:10 WIB',
    timeExact: '15:42:10 WIB',
    actorName: 'Admin RW 02 (H. Agus Permana)',
    actorRole: 'RW Administrator',
    actorScope: 'Kel. Sukamaju > RW 02',
    actionType: 'citizen_verify',
    actionTitle: 'Verifikasi Akun e-KTP Warga (Budi Santoso)',
    description: 'Menyetujui pendaftaran akun warga baru ber-KTP RW 02',
    ipAddress: '182.253.14.88',
    device: 'Chrome 128 (Windows 11)',
    riskLevel: 'low'
  },
  {
    id: 'log-002',
    timestamp: '26 Agu 2026, 15:30:05 WIB',
    timeExact: '15:30:05 WIB',
    actorName: 'Petugas Posko Trantibum (M. Yasin)',
    actorRole: 'Security Operator',
    actorScope: 'Kel. Sukamaju > RW 02 > RT 01',
    actionType: 'emergency_escalate',
    actionTitle: 'Eskalasi Alarm Kritis SOS Medis #ALM-991',
    description: 'Meneruskan sinyal darurat ke Puskesmas & Ambulans',
    ipAddress: '180.252.61.12',
    device: 'RuangWarga Android App (Samsung S23)',
    riskLevel: 'high'
  },
  {
    id: 'log-003',
    timestamp: '26 Agu 2026, 14:15:20 WIB',
    timeExact: '14:15:20 WIB',
    actorName: 'Super Administrator',
    actorRole: 'Platform Super Administrator',
    actorScope: 'Nasional / Seluruh Indonesia',
    actionType: 'role_change',
    actionTitle: 'Perubahan Matriks Hak Akses Administrator Desa',
    description: 'Memperbarui izin pembuatan akun warga desa',
    ipAddress: '103.144.22.5',
    device: 'Edge 128 (Windows 11)',
    riskLevel: 'medium'
  }
];
