import type { TerritoryItem, WorkspaceItem } from '../../core/types/territory.types';

export const mockTerritoryHierarchy: TerritoryItem = {
  id: 'indonesia',
  name: 'Republik Indonesia',
  level: 'national',
  code: 'ID-00',
  status: 'optimal',
  childrenCount: 38,
  citizensCount: 2847592,
  workspacesCount: 120654,
  leaderName: 'Dewan Tata Kelola Nasional',
  leaderPhone: '+62 21 555 0100',
  demographics: {
    totalKK: 712000,
    maleCount: 1420000,
    femaleCount: 1427592,
    appAdoptionPercentage: 68.4,
    verifiedWargaCount: 2420000
  },
  officers: [
    {
      id: 'off-01',
      name: 'Dr. H. Arya Pratama, M.Sc',
      position: 'Ketua',
      phone: '+62 21 555 0101',
      email: 'ketua.nasional@ruangwarga.id',
      status: 'active',
      registeredAt: '01 Jan 2024'
    }
  ],
  children: [
    {
      id: 'jabar',
      name: 'Jawa Barat',
      level: 'province',
      code: '32',
      parentId: 'indonesia',
      status: 'optimal',
      childrenCount: 27,
      citizensCount: 842100,
      workspacesCount: 34120,
      leaderName: 'H. Ridwan Setiawan, M.Si',
      leaderPhone: '+62 22 710 4421',
      children: [
        {
          id: 'kab-bogor',
          name: 'Kab. Bogor',
          level: 'regency',
          code: '32.01',
          parentId: 'jabar',
          status: 'optimal',
          childrenCount: 40,
          citizensCount: 215400,
          workspacesCount: 8920,
          leaderName: 'Dr. Hj. Ade Yasin, M.H',
          leaderPhone: '+62 251 832 1100',
          children: [
            {
              id: 'kec-cibinong',
              name: 'Kec. Cibinong',
              level: 'district',
              code: '32.01.01',
              parentId: 'kab-bogor',
              status: 'optimal',
              childrenCount: 13,
              citizensCount: 48200,
              workspacesCount: 1940,
              leaderName: 'Drs. Rusliandy, M.Si',
              leaderPhone: '+62 251 875 3290',
              children: [
                {
                  id: 'kel-sukamaju',
                  name: 'Kel. Sukamaju',
                  level: 'village',
                  code: '32.01.01.1001',
                  parentId: 'kec-cibinong',
                  status: 'optimal',
                  childrenCount: 14,
                  citizensCount: 12450,
                  workspacesCount: 380,
                  leaderName: 'Budi Santoso, S.STP',
                  leaderPhone: '+62 812 3344 5566',
                  children: [
                    {
                      id: 'rw-02',
                      name: 'RW 02 Sukamaju',
                      level: 'rw',
                      code: '32.01.01.1001.002',
                      parentId: 'kel-sukamaju',
                      status: 'optimal',
                      childrenCount: 8,
                      citizensCount: 1850,
                      workspacesCount: 8,
                      leaderName: 'H. Agus Permana',
                      leaderPhone: '+62 813 9988 7766'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const mockWorkspacesList: WorkspaceItem[] = [
  {
    id: 'ws-rw02-sukamaju',
    name: 'Workspace RW 02 Sukamaju',
    tier: 'RW',
    scopePath: 'Indonesia > Jawa Barat > Kab. Bogor > Kec. Cibinong > Kel. Sukamaju > RW 02',
    status: 'active',
    citizensCount: 1850,
    adminsCount: 6,
    leadAdminName: 'H. Agus Permana (Ketua RW)',
    lastActivityTime: '5 menit yang lalu',
    coveragePercentage: 94,
    createdAt: '12 Jan 2025',
    packageType: 'Standar',
    metrics: {
      verifiedCitizens: 1720,
      pendingCitizens: 130,
      activeAlarmsCount: 1,
      openReportsCount: 2,
      issuedLettersCount: 148,
      collectionIuranRate: 92
    },
    members: [
      { id: 'm-1', name: 'H. Agus Permana', role: 'Ketua RW 02', phone: '+62 813-9988-7766', email: 'agus@ruangwarga.id', avatarInitials: 'AP' },
      { id: 'm-2', name: 'Drs. Supriyadi', role: 'Sekretaris RW', phone: '+62 812-4455-6677', email: 'supriyadi@ruangwarga.id', avatarInitials: 'SY' },
      { id: 'm-3', name: 'Hj. Siti Aminah', role: 'Bendahara RW', phone: '+62 818-1122-3344', email: 'aminah@ruangwarga.id', avatarInitials: 'SA' },
      { id: 'm-4', name: 'Kopda (Purn) M. Yasin', role: 'Seksi Keamanan & Ketertiban', phone: '+62 819-5566-7788', email: 'yasin@ruangwarga.id', avatarInitials: 'MY' }
    ]
  },
  {
    id: 'ws-kel-sukamaju',
    name: 'Workspace Kelurahan Sukamaju',
    tier: 'Desa/Kelurahan',
    scopePath: 'Indonesia > Jawa Barat > Kab. Bogor > Kec. Cibinong > Kel. Sukamaju',
    status: 'active',
    citizensCount: 12450,
    adminsCount: 14,
    leadAdminName: 'Budi Santoso, S.STP (Lurah)',
    lastActivityTime: '12 menit yang lalu',
    coveragePercentage: 88,
    createdAt: '01 Des 2024',
    packageType: 'Pemerintahan',
    metrics: {
      verifiedCitizens: 11200,
      pendingCitizens: 450,
      activeAlarmsCount: 0,
      openReportsCount: 6,
      issuedLettersCount: 890,
      collectionIuranRate: 85
    },
    members: [
      { id: 'm-5', name: 'Budi Santoso, S.STP', role: 'Lurah Sukamaju', phone: '+62 812-3344-5566', email: 'lurah@bogorkab.go.id', avatarInitials: 'BS' },
      { id: 'm-6', name: 'Ratna Dewi, S.AP', role: 'Kasi Pemerintahan', phone: '+62 813-2233-4455', email: 'ratna@bogorkab.go.id', avatarInitials: 'RD' }
    ]
  },
  {
    id: 'ws-kec-cibinong',
    name: 'Workspace Kecamatan Cibinong',
    tier: 'Kecamatan',
    scopePath: 'Indonesia > Jawa Barat > Kab. Bogor > Kec. Cibinong',
    status: 'active',
    citizensCount: 48200,
    adminsCount: 22,
    leadAdminName: 'Drs. Rusliandy, M.Si (Camat)',
    lastActivityTime: '1 jam yang lalu',
    coveragePercentage: 91,
    createdAt: '15 Nov 2024',
    packageType: 'Pemerintahan',
    metrics: {
      verifiedCitizens: 42000,
      pendingCitizens: 1200,
      activeAlarmsCount: 2,
      openReportsCount: 14,
      issuedLettersCount: 3420,
      collectionIuranRate: 89
    },
    members: [
      { id: 'm-7', name: 'Drs. Rusliandy, M.Si', role: 'Camat Cibinong', phone: '+62 251-875-3290', email: 'camat@bogorkab.go.id', avatarInitials: 'RL' }
    ]
  },
  {
    id: 'ws-rw03-sukamaju',
    name: 'Workspace RW 03 Sukamaju',
    tier: 'RW',
    scopePath: 'Indonesia > Jawa Barat > Kab. Bogor > Kec. Cibinong > Kel. Sukamaju > RW 03',
    status: 'pending',
    citizensCount: 1420,
    adminsCount: 2,
    leadAdminName: 'Ir. Dedi Suryadi (Plt. Ketua RW)',
    lastActivityTime: '2 jam yang lalu',
    coveragePercentage: 45,
    createdAt: '18 Mei 2025',
    packageType: 'Standar',
    metrics: {
      verifiedCitizens: 640,
      pendingCitizens: 280,
      activeAlarmsCount: 0,
      openReportsCount: 1,
      issuedLettersCount: 32,
      collectionIuranRate: 60
    },
    members: [
      { id: 'm-8', name: 'Ir. Dedi Suryadi', role: 'Plt. Ketua RW 03', phone: '+62 812-7788-9900', email: 'dedi@ruangwarga.id', avatarInitials: 'DS' }
    ]
  }
];
