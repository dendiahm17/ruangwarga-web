import { FirestoreDashboardService } from './firestore/FirestoreDashboardService';
import { mockWilayahService } from './mock/mockWilayahService';

export const dashboardService = new FirestoreDashboardService();
export const wilayahService = mockWilayahService;
