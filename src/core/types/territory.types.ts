export interface TerritoryOfficer {
  id: string;
  name: string;
  position: 'Ketua' | 'Sekretaris' | 'Bendahara' | 'Seksi Keamanan' | 'Seksi Pembangunan' | 'Seksi Sosial' | 'Operator';
  phone: string;
  email: string;
  status: 'active' | 'inactive';
  registeredAt: string;
}

export interface TerritoryDemographics {
  totalKK: number;
  maleCount: number;
  femaleCount: number;
  appAdoptionPercentage: number;
  verifiedWargaCount: number;
}

export interface TerritoryItem {
  id: string;
  name: string;
  level: 'national' | 'province' | 'regency' | 'district' | 'village' | 'rw' | 'rt';
  code: string;
  parentId?: string;
  status: 'optimal' | 'warning' | 'critical';
  childrenCount: number;
  citizensCount: number;
  workspacesCount: number;
  leaderName: string;
  leaderPhone: string;
  officers?: TerritoryOfficer[];
  demographics?: TerritoryDemographics;
  children?: TerritoryItem[];
}

export interface WorkspaceMember {
  id: string;
  name: string;
  role: string; // e.g. "Ketua RW", "Sekretaris", "Bendahara", "Operator"
  phone: string;
  email: string;
  avatarInitials: string;
}

export interface WorkspaceQuickMetric {
  verifiedCitizens: number;
  pendingCitizens: number;
  activeAlarmsCount: number;
  openReportsCount: number;
  issuedLettersCount: number;
  collectionIuranRate: number; // in percentage e.g. 92%
}

export interface WorkspaceItem {
  id: string;
  name: string;
  tier: 'Provinsi' | 'Kabupaten/Kota' | 'Kecamatan' | 'Desa/Kelurahan' | 'RW' | 'RT';
  scopePath: string;
  status: 'active' | 'pending' | 'inactive';
  citizensCount: number;
  adminsCount: number;
  leadAdminName: string;
  lastActivityTime: string;
  coveragePercentage: number;
  createdAt: string;
  packageType?: 'Standar' | 'Enterprise' | 'Pemerintahan';
  metrics?: WorkspaceQuickMetric;
  members?: WorkspaceMember[];
}
