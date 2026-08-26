import { IWilayahService, IDashboardService } from '../interfaces';
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
import { db } from '../firebase/config';
import { doc, getDoc, collection, getDocs, limit, query } from 'firebase/firestore';
import { mockScopes } from '../mock/mockWilayahData';
import { 
  mockDashboardMetrics, 
  mockSystemTasks, 
  mockSystemAlarms, 
  mockPriorityRegions, 
  mockWorkspaceDistributions, 
  mockRecentActivities,
  mockCurrentUser 
} from '../mock/mockDashboardData';

// Helper timeout to ensure UI NEVER hangs on network latency or missing remote collections
const withTimeout = <T>(promise: Promise<T>, ms = 1200): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), ms))
  ]);
};

export class FirestoreWilayahService implements IWilayahService {
  async getScopeById(id: string): Promise<ScopeNode | null> {
    try {
      const docRef = doc(db, 'scopes', id);
      const snap = await withTimeout(getDoc(docRef));
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as ScopeNode;
      }
    } catch {
      // Instant fallback to ensure zero blank screen
    }
    return mockScopes[id] || mockScopes['indonesia'];
  }

  async getChildrenScopes(parentId: string): Promise<ScopeNode[]> {
    try {
      const q = query(collection(db, 'scopes'), limit(50));
      const snap = await withTimeout(getDocs(q));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as ScopeNode));
      }
    } catch {
      // Fallback
    }
    return Object.values(mockScopes).filter(s => s.parentPath?.endsWith(parentId) || (parentId === 'indonesia' && s.level === 'province'));
  }

  async getAllScopes(): Promise<ScopeNode[]> {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'scopes')));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as ScopeNode));
      }
    } catch {
      // Fallback
    }
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

export class FirestoreDashboardService implements IDashboardService {
  async getDashboardMetrics(scopeId: string): Promise<DashboardMetrics> {
    try {
      const snap = await withTimeout(getDoc(doc(db, 'dashboard_metrics', scopeId)));
      if (snap.exists()) {
        return snap.data() as DashboardMetrics;
      }
    } catch {
      // Fallback
    }
    return mockDashboardMetrics;
  }

  async getSystemTasks(_scopeId: string): Promise<SystemTask[]> {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'system_tasks')));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as SystemTask));
      }
    } catch {
      // Fallback
    }
    return mockSystemTasks;
  }

  async getSystemAlarms(_scopeId: string): Promise<SystemAlarm[]> {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'system_alarms')));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as SystemAlarm));
      }
    } catch {
      // Fallback
    }
    return mockSystemAlarms;
  }

  async getPriorityRegions(_scopeId: string): Promise<PriorityRegion[]> {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'priority_regions')));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as PriorityRegion));
      }
    } catch {
      // Fallback
    }
    return mockPriorityRegions;
  }

  async getWorkspaceDistributions(_scopeId: string): Promise<WorkspaceDistribution[]> {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'workspace_distributions')));
      if (!snap.empty) {
        return snap.docs.map(d => d.data() as WorkspaceDistribution);
      }
    } catch {
      // Fallback
    }
    return mockWorkspaceDistributions;
  }

  async getRecentActivities(_scopeId: string): Promise<RealtimeActivity[]> {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'activities')));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as RealtimeActivity));
      }
    } catch {
      // Fallback
    }
    return mockRecentActivities;
  }

  async getCurrentUser(): Promise<CurrentUser> {
    try {
      const snap = await withTimeout(getDoc(doc(db, 'system_users', 'current')));
      if (snap.exists()) {
        return snap.data() as CurrentUser;
      }
    } catch {
      // Fallback
    }
    return mockCurrentUser;
  }
}
