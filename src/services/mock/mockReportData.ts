import type { EmergencyAlarm, CitizenReport } from '../../core/types/report.types';

export const mockEmergencyAlarms: EmergencyAlarm[] = [
  {
    id: 'alarm-01',
    type: 'medis',
    title: 'Panggilan Darurat Medis Lansia (Sesak Nafas)',
    description: 'Warga lansia membutuhkan bantuan ambulans dan tabung oksigen darurat segera.',
    reporterName: 'Siti Nurhaliza',
    reporterPhone: '+62 813-1122-3344',
    locationScope: 'Kel. Sukamaju > RW 02 > RT 01 (No. 45)',
    coordinates: '-6.4829, 106.8452',
    status: 'critical',
    timestamp: '3 menit yang lalu',
    slaMinutes: 15
  },
  {
    id: 'alarm-02',
    type: 'kebakaran',
    title: 'Percikan Api Korsleting Gardu Listrik',
    description: 'Korsleting trafo tiang listrik dekat pos ronda, menimbulkan percikan api dan kepulan asap.',
    reporterName: 'Ahmad Fauzi (Ketua RT 01)',
    reporterPhone: '+62 815-1122-3344',
    locationScope: 'Kel. Sukamaju > RW 02 > RT 01 (Depan Pos)',
    coordinates: '-6.4831, 106.8460',
    status: 'investigating',
    timestamp: '14 menit yang lalu',
    respondedBy: 'Damkar Cibinong & Seksi Keamanan',
    slaMinutes: 30
  },
  {
    id: 'alarm-03',
    type: 'kriminalitas',
    title: 'Indikasi Percobaan Pencurian Kendaraan Bermotor',
    description: 'Dua orang mencurigakan tertangkap kamera CCTV warga sedang mengutak-atik motor.',
    reporterName: 'Bambang Supriyanto',
    reporterPhone: '+62 816-2233-4455',
    locationScope: 'Kel. Sukamaju > RW 02 > RT 02 (Gang Mawar)',
    coordinates: '-6.4840, 106.8475',
    status: 'investigating',
    timestamp: '28 menit yang lalu',
    respondedBy: 'Bhabinkamtibmas & Linmas RW 02',
    slaMinutes: 45
  },
  {
    id: 'alarm-04',
    type: 'bencana',
    title: 'Pohon Tumbang Menutup Akses Jalan Utama RW',
    description: 'Pohon mahoni tumbang akibat angin kencang, menimpa kabel telkom dan menutup jalan.',
    reporterName: 'H. Agus Permana (Ketua RW 02)',
    reporterPhone: '+62 813-9988-7766',
    locationScope: 'Kel. Sukamaju > RW 02 (Jl. Harapan Utama)',
    coordinates: '-6.4815, 106.8430',
    status: 'resolved',
    timestamp: '2 jam yang lalu',
    respondedBy: 'Tim Reaksi Cepat BPBD & Warga Gotong Royong',
    slaMinutes: 60
  }
];

export const mockCitizenReports: CitizenReport[] = [
  {
    id: 'rep-01',
    ticketNumber: 'RW-2025-0012',
    category: 'infrastruktur',
    title: 'Lampu Penerangan Jalan Umum (PJU) Mati',
    description: 'Lampu PJU di gang RT 01 mati total sejak 3 malam lalu, area sangat gelap dan rawan.',
    reporterName: 'Budi Kurniawan',
    reporterPhone: '+62 812-9988-1122',
    locationScope: 'Kel. Sukamaju > RW 02 > RT 01',
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'Seksi Pembangunan RT 01',
    createdAt: 'Kemarin 19:40',
    updatedAt: 'Hari ini 08:30'
  },
  {
    id: 'rep-02',
    ticketNumber: 'RW-2025-0013',
    category: 'kebersihan',
    title: 'Penumpukan Sampah di TPS Sementara',
    description: 'Truk pengangkut sampah belum datang 4 hari, bau menyengat mulai mengganggu warga sekitar.',
    reporterName: 'Dewi Lestari',
    reporterPhone: '+62 818-3344-5566',
    locationScope: 'Kel. Sukamaju > RW 02 > RT 02',
    priority: 'medium',
    status: 'dispositioned',
    assignedTo: 'Dinas Lingkungan Hidup / Pengurus RW',
    createdAt: 'Kemarin 14:15',
    updatedAt: 'Hari ini 09:00'
  },
  {
    id: 'rep-03',
    ticketNumber: 'RW-2025-0014',
    category: 'administrasi',
    title: 'Permohonan Surat Pengantar Domisili Belum Diproses',
    description: 'Sudah mengajukan surat pengantar domisili via Android 2 hari lalu untuk keperluan bank.',
    reporterName: 'Rahmat Hidayat',
    reporterPhone: '+62 817-2233-4455',
    locationScope: 'Kel. Sukamaju > RW 02 > RT 02',
    priority: 'low',
    status: 'received',
    createdAt: 'Hari ini 09:30',
    updatedAt: 'Hari ini 09:30'
  },
  {
    id: 'rep-04',
    ticketNumber: 'RW-2025-0010',
    category: 'keamanan',
    title: 'Portal Keamanan Rusak & Engsel Patah',
    description: 'Palang portal otomatis di pintu masuk perumahan tidak dapat ditutup sempurna.',
    reporterName: 'Agus Salim, S.T',
    reporterPhone: '+62 819-4455-6677',
    locationScope: 'Kel. Sukamaju > RW 02 > RT 03',
    priority: 'medium',
    status: 'completed',
    assignedTo: 'Seksi Keamanan & Linmas',
    createdAt: '18 Mei 2025',
    updatedAt: '19 Mei 2025'
  }
];
