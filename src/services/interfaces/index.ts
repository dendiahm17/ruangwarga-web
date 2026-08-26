import { ScopeNode, ScopeBreadcrumbItem } from '../../core/types/scope.types';
import { 
  DashboardMetrics, 
  SystemTask, 
  SystemAlarm, 
  PriorityRegion, 
  WorkspaceDistribution, 
  RealtimeActivity,
  CurrentUser 
} from '../../core/types/dashboard.types';

export interface IWilayahService {
  getScopeById(id: string): Promise<ScopeNode | null>;
  getChildrenScopes(parentId: string): Promise<ScopeNode[]>;
  getAllScopes(): Promise<ScopeNode[]>;
  getBreadcrumbsForScope(id: string): Promise<ScopeBreadcrumbItem[]>;
}

export interface IDashboardService {
  getDashboardMetrics(scopeId: string): Promise<DashboardMetrics>;
  getSystemTasks(scopeId: string): Promise<SystemTask[]>;
  getSystemAlarms(scopeId: string): Promise<SystemAlarm[]>;
  getPriorityRegions(scopeId: string): Promise<PriorityRegion[]>;
  getWorkspaceDistributions(scopeId: string): Promise<WorkspaceDistribution[]>;
  getRecentActivities(scopeId: string): Promise<RealtimeActivity[]>;
  getCurrentUser(): Promise<CurrentUser>;
}
