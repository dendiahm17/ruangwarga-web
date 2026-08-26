import { MockDashboardService } from './mock/MockDashboardService';
import { MockWilayahService } from './mock/mockService';
import type { IDashboardService } from './interfaces/IDashboardService';
import type { IWilayahService } from './interfaces';

export const dashboardService: IDashboardService = new MockDashboardService();
export const wilayahService: IWilayahService = new MockWilayahService();

export * from './interfaces/IDashboardService';
