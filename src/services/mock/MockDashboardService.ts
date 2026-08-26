import type { IDashboardService } from '../interfaces/IDashboardService';
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

import {
  mockCurrentUser,
  mockSummaryMetrics,
  mockMonitoringData,
  mockSystemTasks,
  mockSpecialAttentions,
  mockWorkspaceTiers,
  mockRealtimeActivities,
  mockPlatformInsights
} from './mockDashboardData';

export class MockDashboardService implements IDashboardService {
  async getSummaryMetrics(_scopeId: string): Promise<PlatformSummaryMetrics> {
    return mockSummaryMetrics;
  }

  async getMonitoringData(_scopeId: string): Promise<MonitoringWilayahData> {
    return mockMonitoringData;
  }

  async getSystemTasks(_scopeId: string): Promise<SystemTaskItem[]> {
    return mockSystemTasks;
  }

  async getSpecialAttentions(_scopeId: string): Promise<SpecialAttentionItem[]> {
    return mockSpecialAttentions;
  }

  async getWorkspaceTiers(_scopeId: string): Promise<WorkspaceTierItem[]> {
    return mockWorkspaceTiers;
  }

  async getRealtimeActivities(_scopeId: string): Promise<RealtimeActivityItem[]> {
    return mockRealtimeActivities;
  }

  async getPlatformInsights(_scopeId: string): Promise<PlatformInsightsData> {
    return mockPlatformInsights;
  }

  async getCurrentUser(): Promise<CurrentUser> {
    return mockCurrentUser;
  }
}
