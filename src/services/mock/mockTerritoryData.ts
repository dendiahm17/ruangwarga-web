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
    },
    {
      id: 'off-02',
      name: 'Rina Kusumawardani, S.Kom',
      position: 'Sekretaris',
      phone: '+62 21 555 0102',
      email: 'sekretaris.nasional@ruangwarga.id',
      status: 'active',
      registeredAt: '01 Jan 2024'
    },
    {
      id: 'off-03',
      name: 'Bambang Trihatmojo, S.E',
      position: 'Bendahara',
      phone: '+62 21 555 0103',
      email: 'bendahara.nasional@ruangwarga.id',
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
      demographics: {
        totalKK: 210500,
        maleCount: 420000,
        femaleCount: 422100,
        appAdoptionPercentage: 74.2,
        verifiedWargaCount: 710000
      },
      officers: [
        {
          id: 'off-jabar-1',
          name: 'H. Ridwan Setiawan, M.Si',
          position: 'Ketua',
          phone: '+62 22 710 4421',
          email: 'pembina.jabar@ruangwarga.id',
          status: 'active',
          registeredAt: '15 Mar 2024'
        },
        {
          id: 'off-jabar-2',
          name: 'Ahmad Sofyan, S.STP',
          position: 'Sekretaris',
          phone: '+62 22 710 4422',
          email: 'sekretariat.jabar@ruangwarga.id',
          status: 'active',
          registeredAt: '15 Mar 2024'
        }
      ],
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
          demographics: {
            totalKK: 53850,
            maleCount: 107000,
            femaleCount: 108400,
            appAdoptionPercentage: 78.5,
            verifiedWargaCount: 185000
          },
          officers: [
            {
              id: 'off-bogor-1',
              name: 'Dr. Hj. Ade Yasin, M.H',
              position: 'Ketua',
              phone: '+62 251 832 1100',
              email: 'bupati.bogor@ruangwarga.id',
              status: 'active',
              registeredAt: '10 Apr 2024'
            }
          ],
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
              demographics: {
                totalKK: 12050,
                maleCount: 24000,
                femaleCount: 24200,
                appAdoptionPercentage: 82.1,
                verifiedWargaCount: 42000
              },
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
                  demographics: {
                    totalKK: 3110,
                    maleCount: 6200,
                    femaleCount: 6250,
                    appAdoptionPercentage: 86.4,
                    verifiedWargaCount: 11200
                  },
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
                      leaderPhone: '+62 813 9988 7766',
                      demographics: {
                        totalKK: 462,
                        maleCount: 920,
                        femaleCount: 930,
                        appAdoptionPercentage: 92.5,
                        verifiedWargaCount: 1720
                      },
                      officers: [
                        {
                          id: 'off-rw02-1',
                          name: 'H. Agus Permana',
                          position: 'Ketua',
                          phone: '+62 813 9988 7766',
                          email: 'ketua.rw02@ruangwarga.id',
                          status: 'active',
                          registeredAt: '12 Jan 2025'
                        },
                        {
                          id: 'off-rw02-2',
                          name: 'Drs. Supriyadi',
                          position: 'Sekretaris',
                          phone: '+62 812 4455 6677',
                          email: 'sekretaris.rw02@ruangwarga.id',
                          status: 'active',
                          registeredAt: '12 Jan 2025'
                        },
                        {
                          id: 'off-rw02-3',
                          name: 'Hj. Siti Aminah',
                          position: 'Bendahara',
                          phone: '+62 818 1122 3344',
                          email: 'bendahara.rw02@ruangwarga.id',
                          status: 'active',
                          registeredAt: '15 Jan 2025'
                        },
                        {
                          id: 'off-rw02-4',
                          name: 'Kopda (Purn) M. Yasin',
                          position: 'Seksi Keamanan',
                          phone: '+62 819 5566 7788',
                          email: 'keamanan.rw02@ruangwarga.id',
                          status: 'active',
                          registeredAt: '20 Jan 2025'
                        }
                      ],
                      children: [
                        {
                          id: 'rt-01',
                          name: 'RT 01 / RW 02',
                          level: 'rt',
                          code: '32.01.01.1001.002.001',
                          parentId: 'rw-02',
                          status: 'optimal',
                          childrenCount: 0,
                          citizensCount: 240,
                          workspacesCount: 1,
                          leaderName: 'Ahmad Fauzi',
                          leaderPhone: '+62 815 1122 3344',
                          demographics: {
                            totalKK: 60,
                            maleCount: 118,
                            femaleCount: 122,
                            appAdoptionPercentage: 95.0,
                            verifiedWargaCount: 230
                          },
                          officers: [
                            {
                              id: 'off-rt01-1',
                              name: 'Ahmad Fauzi',
                              position: 'Ketua',
                              phone: '+62 815 1122 3344',
                              email: 'rt01.rw02@ruangwarga.id',
                              status: 'active',
                              registeredAt: '15 Jan 2025'
                            }
                          ]
                        },
                        {
                          id: 'rt-02',
                          name: 'RT 02 / RW 02',
                          level: 'rt',
                          code: '32.01.01.1001.002.002',
                          parentId: 'rw-02',
                          status: 'warning',
                          childrenCount: 0,
                          citizensCount: 280,
                          workspacesCount: 1,
                          leaderName: 'Bambang Supriyanto',
                          leaderPhone: '+62 816 2233 4455',
                          demographics: {
                            totalKK: 70,
                            maleCount: 135,
                            femaleCount: 145,
                            appAdoptionPercentage: 62.0,
                            verifiedWargaCount: 210
                          }
                        },
                        {
                          id: 'rt-03',
                          name: 'RT 03 / RW 02',
                          level: 'rt',
                          code: '32.01.01.1001.002.003',
                          parentId: 'rw-02',
                          status: 'optimal',
                          childrenCount: 0,
                          citizensCount: 210,
                          workspacesCount: 1,
                          leaderName: 'Hendra Gunawan',
                          leaderPhone: '+62 817 3344 5566',
                          demographics: {
                            totalKK: 52,
                            maleCount: 102,
                            femaleCount: 108,
                            appAdoptionPercentage: 88.0,
                            verifiedWargaCount: 195
                          }
                        }
                      ]
                    },
                    {
                      id: 'rw-03',
                      name: 'RW 03 Sukamaju',
                      level: 'rw',
                      code: '32.01.01.1001.003',
                      parentId: 'kel-sukamaju',
                      status: 'warning',
                      childrenCount: 6,
                      citizensCount: 1420,
                      workspacesCount: 6,
                      leaderName: 'Ir. Dedi Suryadi',
                      leaderPhone: '+62 812 7788 9900'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'kota-bandung',
          name: 'Kota Bandung',
          level: 'regency',
          code: '32.73',
          parentId: 'jabar',
          status: 'optimal',
          childrenCount: 30,
          citizensCount: 310500,
          workspacesCount: 11200,
          leaderName: 'H. Ema Sumarna, M.Si',
          leaderPhone: '+62 22 420 3344'
        }
      ]
    },
    {
      id: 'jateng',
      name: 'Jawa Tengah',
      level: 'province',
      code: '33',
      parentId: 'indonesia',
      status: 'optimal',
      childrenCount: 35,
      citizensCount: 710300,
      workspacesCount: 28400,
      leaderName: 'Drs. Nana Sudjana, M.M',
      leaderPhone: '+62 24 831 1122'
    },
    {
      id: 'jatim',
      name: 'Jawa Timur',
      level: 'province',
      code: '35',
      parentId: 'indonesia',
      status: 'warning',
      childrenCount: 38,
      citizensCount: 790400,
      workspacesCount: 31500,
      leaderName: 'Adhy Karyono, A.KS, M.AP',
      leaderPhone: '+62 31 534 2233'
    },
    {
      id: 'dki',
      name: 'DKI Jakarta',
      level: 'province',
      code: '31',
      parentId: 'indonesia',
      status: 'optimal',
      childrenCount: 6,
      citizensCount: 594200,
      workspacesCount: 25930,
      leaderName: 'Teguh Setyabudi, M.Pd',
      leaderPhone: '+62 21 382 2255'
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
    createdAt: '12 Jan 2025'
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
    createdAt: '01 Des 2024'
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
    createdAt: '15 Nov 2024'
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
    createdAt: '18 Mei 2025'
  },
  {
    id: 'ws-kab-bogor',
    name: 'Workspace Pemerintahan Kab. Bogor',
    tier: 'Kabupaten/Kota',
    scopePath: 'Indonesia > Jawa Barat > Kab. Bogor',
    status: 'active',
    citizensCount: 215400,
    adminsCount: 48,
    leadAdminName: 'Sekretariat Daerah Kab. Bogor',
    lastActivityTime: '25 menit yang lalu',
    coveragePercentage: 84,
    createdAt: '10 Okt 2024'
  },
  {
    id: 'ws-prov-jabar',
    name: 'Workspace Komando Jawa Barat',
    tier: 'Provinsi',
    scopePath: 'Indonesia > Jawa Barat',
    status: 'active',
    citizensCount: 842100,
    adminsCount: 86,
    leadAdminName: 'Biro Tata Pemerintahan Prov. Jabar',
    lastActivityTime: '3 menit yang lalu',
    coveragePercentage: 92,
    createdAt: '01 Sep 2024'
  }
];
