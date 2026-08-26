import type { SystemJob, GovernanceWorkflow } from '../../core/types/workflow.types';

export const mockSystemJobs: SystemJob[] = [
  {
    id: 'job-01',
    title: 'Verifikasi Data Wilayah Berkala',
    category: 'verification',
    description: 'Pencocokan kode wilayah BPS/Kemendagri dan validasi keutuhan struktur 7 tingkat.',
    scheduleInterval: 'Setiap 6 Jam',
    currentCount: 120,
    totalCount: 150,
    percentage: 80,
    status: 'running',
    lastRunTime: 'Hari ini 12:00 WIB',
    nextRunTime: 'Hari ini 18:00 WIB',
    executionDuration: '42 detik'
  },
  {
    id: 'job-02',
    title: 'Sinkronisasi Data Antrean Offline Android',
    category: 'sync',
    description: 'Mengunggah dan mendamaikan data pengaduan warga yang dikirimkan saat jaringan lemah.',
    scheduleInterval: 'Realtime (Event-Driven)',
    currentCount: 45,
    totalCount: 45,
    percentage: 100,
    status: 'completed',
    lastRunTime: '5 menit yang lalu',
    nextRunTime: 'Realtime',
    executionDuration: '1.2 detik'
  },
  {
    id: 'job-03',
    title: 'Backup & Enkripsi Database Firestore',
    category: 'backup',
    description: 'Pencadangan database penuh dengan enkripsi AES-256 dan redundansi multi-region.',
    scheduleInterval: 'Harian (Pukul 02:00 WIB)',
    currentCount: 1,
    totalCount: 1,
    percentage: 100,
    status: 'scheduled',
    lastRunTime: 'Kemarin 02:00 WIB',
    nextRunTime: 'Besok 02:00 WIB',
    executionDuration: '3 menit 14 detik'
  },
  {
    id: 'job-04',
    title: 'Audit Keamanan & Integritas Sesi',
    category: 'audit',
    description: 'Pemindaian login anomali, deteksi brute force, dan pembersihan token kedaluwarsa.',
    scheduleInterval: 'Setiap 1 Jam',
    currentCount: 75,
    totalCount: 100,
    percentage: 75,
    status: 'running',
    lastRunTime: 'Hari ini 15:00 WIB',
    nextRunTime: 'Hari ini 16:00 WIB',
    executionDuration: '18 detik'
  },
  {
    id: 'job-05',
    title: 'Pembersihan Cache & Re-Indexing Geospasial',
    category: 'maintenance',
    description: 'Optimasi query peta node dan peremajaan indeks spasial seluruh Indonesia.',
    scheduleInterval: 'Mingguan (Minggu 00:00 WIB)',
    currentCount: 2,
    totalCount: 4,
    percentage: 50,
    status: 'scheduled',
    lastRunTime: 'Minggu lalu',
    nextRunTime: 'Minggu depan',
    executionDuration: '1 menit 50 detik'
  }
];

export const mockGovernanceWorkflows: GovernanceWorkflow[] = [
  {
    id: 'wf-01',
    code: 'SOP-ADM-01',
    title: 'Alur Pengajuan Surat Pengantar Domisili & Usaha',
    category: 'administrasi',
    description: 'Prosedur standar penerbitan surat pengantar resmi dari permohonan warga di Android hingga stempel digital.',
    status: 'active',
    totalSteps: 4,
    avgCompletionHours: 2.5,
    steps: [
      { stepNumber: 1, title: 'Pengajuan Permohonan', actorRole: 'Warga (Android App)', actionDescription: 'Warga mengisi form dan melampirkan foto KTP & KK.', slaHours: 0.5 },
      { stepNumber: 2, title: 'Pemeriksaan & Validasi', actorRole: 'Ketua RT / Pengurus RT', actionDescription: 'Verifikasi kesesuaian domisili fisik warga.', slaHours: 1.0 },
      { stepNumber: 3, title: 'Persetujuan & Tanda Tangan Digital', actorRole: 'Ketua RW', actionDescription: 'Penerbitan nomor surat dan approval berjenjang.', slaHours: 1.0 },
      { stepNumber: 4, title: 'Terbit Surat Digital (QR Code)', actorRole: 'Sistem Otomasi', actionDescription: 'Dokumen PDF resmi ber-QR Code sah terkirim ke HP warga.', slaHours: 0.1 }
    ]
  },
  {
    id: 'wf-02',
    code: 'SOP-SOC-02',
    title: 'Alur Penyaluran Bantuan Sosial Warga Terdampak',
    category: 'bantuan',
    description: 'Mekanisme pendataan, verifikasi faktual penerima manfaat bansos, dan pencatatan distribusi bantuan.',
    status: 'active',
    totalSteps: 4,
    avgCompletionHours: 24.0,
    steps: [
      { stepNumber: 1, title: 'Pendataan Calon Penerima', actorRole: 'Seksi Sosial RT', actionDescription: 'Input data warga yang memenuhi kriteria bantuan.', slaHours: 4.0 },
      { stepNumber: 2, title: 'Verifikasi Kelayakan', actorRole: 'Pengurus RW & Pendamping', actionDescription: 'Pemeriksaan silang kuota dan kriteria kemiskinan.', slaHours: 12.0 },
      { stepNumber: 3, title: 'Persetujuan Distribusi', actorRole: 'Kelurahan / Desa', actionDescription: 'Sinkronisasi dengan Data Terpadu Kesejahteraan Sosial.', slaHours: 6.0 },
      { stepNumber: 4, title: 'Penyaluran & Tanda Terima', actorRole: 'Aparatur Wilayah & Warga', actionDescription: 'Scan QR Code tanda terima bantuan fisik.', slaHours: 2.0 }
    ]
  },
  {
    id: 'wf-03',
    code: 'SOP-ACT-03',
    title: 'Alur Persetujuan Kegiatan & Penggunaan Fasilitas Bersama',
    category: 'kegiatan',
    description: 'Izin penggunaan gedung serbaguna, lapangan olahraga, atau acara warga yang melibatkan keramaian.',
    status: 'active',
    totalSteps: 3,
    avgCompletionHours: 6.0,
    steps: [
      { stepNumber: 1, title: 'Booking Jadwal & Proposal', actorRole: 'Panitia / Warga', actionDescription: 'Pilih fasilitas dan unggah surat permohonan.', slaHours: 1.0 },
      { stepNumber: 2, title: 'Review Keamanan & Fasilitas', actorRole: 'Seksi Keamanan & RW', actionDescription: 'Pengecekan bentrok jadwal dan kepatuhan ketertiban.', slaHours: 4.0 },
      { stepNumber: 3, title: 'Izin Diterbitkan', actorRole: 'Ketua RW', actionDescription: 'Notifikasi jadwal terkonfirmasi ke seluruh warga.', slaHours: 1.0 }
    ]
  }
];
