import { IWilayahService, IDashboardService } from './interfaces';
import { FirestoreWilayahService, FirestoreDashboardService } from './firestore/firestoreService';

// Service provider instances directly connected to Firestore (with seamless fallback)
export const wilayahService: IWilayahService = new FirestoreWilayahService();
export const dashboardService: IDashboardService = new FirestoreDashboardService();

export * from './interfaces';
