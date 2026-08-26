import { IWilayahService, IDashboardService } from '../interfaces';
import { ScopeNode, ScopeBreadcrumbItem } from '../../core/types/scope.types';
import { mockScopes } from './mockWilayahData';
import { 
  mockDashboardMetrics, 
  mockSystemTasks, 
  mockSystemAlarms, 
  mockPriorityRegions, 
  mockWorkspaceDistributions, 
  mockRecentActivities,
  mockCurrentUser 
} from './mockDashboardData';
import { 
  DashboardMetrics, 
  SystemTask, 
  SystemAlarm, 
  PriorityRegion, 
  WorkspaceDistribution, 
  RealtimeActivity,
  CurrentUser 
} from '../../core/types/dashboard.types';

export class MockWilayahService implements IWilayahService {
  async getScopeById(id: string): Promise<ScopeNode | null> {
    return mockScopes[id] || mockScopes['indonesia'];
  }

  async getChildrenScopes(parentId: string): Promise<ScopeNode[]> {
    return Object.values(mockScopes).filter(s => s.parentPath?.endsWith(parentId) || (parentId === 'indonesia' && s.level === 'province'));
  }

  async getAllScopes(): Promise<ScopeNode[]> {
    return Object.values(mockScopes);
  }

  async getBreadcrumbsForScope(id: string): Promise<ScopeBreadcrumbItem[]> {
    const list: ScopeBreadcrumbItem[] = [
      { id: 'indonesia', name: 'Indonesia', level: 'national' },
      { id: 'jabar', name: 'Jawa Barat', level: 'province' },
      { id: 'kab-bogor', name: 'Kab. Bogor', level: 'regency' },
      { id: 'kec-cibinong', name: 'Kec. Cibinong', level: 'district' },
      { id: 'kel-sukamaju', name: 'Kel. Sukamaju', level: 'village' },
      { id: 'rw-02', name: 'RW 02', level: 'rw' }
    ];

    if (id === 'indonesia') return [list[0]];
    if (id === 'jabar') return list.slice(0, 2);
    if (id === 'kab-bogor') return list.slice(0, 3);
    if (id === 'kec-cibinong') return list.slice(0, 4);
    if (id === 'kel-sukamaju') return list.slice(0, 5);
    return list;
  }
}

export class MockDashboardService implements IDashboardService {
  async getDashboardMetrics(_scopeId: string): Promise<DashboardMetrics> {
    return mockDashboardMetrics;
  }

  async getSystemTasks(_scopeId: string): Promise<SystemTask[]> {
    return mockSystemTasks;
  }

  async getSystemAlarms(_scopeId: string): Promise<SystemAlarm[]> {
    return mockSystemAlarms;
  }

  async getPriorityRegions(_scopeId: string): Promise<PriorityRegion[]> {
    return mockPriorityRegions;
  }

  async getWorkspaceDistributions(_scopeId: string): Promise<WorkspaceDistribution[]> {
    return mockWorkspaceDistributions;
  }

  async getRecentActivities(_scopeId: string): Promise<RealtimeActivity[]> {
    return mockRecentActivities;
  }

  async getCurrentUser(): Promise<CurrentUser> {
    return mockCurrentUser;
  }
}
