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
  children?: TerritoryItem[];
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
}
