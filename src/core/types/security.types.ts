export interface PermissionModule {
  moduleId: string;
  moduleName: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canVerify: boolean;
  canExport: boolean;
}

export interface RolePermissionMatrix {
  roleId: string;
  roleName: string;
  tierLevel: 'Nasional' | 'Provinsi' | 'Kabupaten/Kota' | 'Kecamatan' | 'Desa/Kelurahan' | 'RW' | 'RT';
  description: string;
  activeUsersCount: number;
  modules: PermissionModule[];
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  timeExact: string;
  actorName: string;
  actorRole: string;
  actorScope: string;
  actionType: 'login' | 'territory_update' | 'citizen_verify' | 'emergency_escalate' | 'role_change' | 'data_export';
  actionTitle: string;
  description: string;
  ipAddress: string;
  device: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}
