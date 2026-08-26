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
