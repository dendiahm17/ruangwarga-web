import type {
  PlatformSummaryMetrics,
  MonitoringWilayahData,
  SystemTaskItem,
  SpecialAttentionItem,
  WorkspaceTierItem,
  RealtimeActivityItem,
  PlatformInsightsData,
  CurrentUser
} from '../../core/types/dashboard.types';

export interface IDashboardService {
  getSummaryMetrics(scopeId: string): Promise<PlatformSummaryMetrics>;
  getMonitoringData(scopeId: string): Promise<MonitoringWilayahData>;
  getSystemTasks(scopeId: string): Promise<SystemTaskItem[]>;
  getSpecialAttentions(scopeId: string): Promise<SpecialAttentionItem[]>;
  getWorkspaceTiers(scopeId: string): Promise<WorkspaceTierItem[]>;
  getRealtimeActivities(scopeId: string): Promise<RealtimeActivityItem[]>;
  getPlatformInsights(scopeId: string): Promise<PlatformInsightsData>;
  getCurrentUser(): Promise<CurrentUser>;
}
