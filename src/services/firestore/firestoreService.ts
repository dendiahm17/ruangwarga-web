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

export class FirestoreWilayahService implements IWilayahService {
  async getScopeById(id: string): Promise<ScopeNode | null> {
    try {
      const docRef = doc(db, 'scopes', id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as ScopeNode;
      }
    } catch (e) {
      console.warn('Firestore fetch fallback to mock for getScopeById:', e);
    }
    return mockScopes[id] || mockScopes['indonesia'];
  }

  async getChildrenScopes(parentId: string): Promise<ScopeNode[]> {
    try {
      const q = query(collection(db, 'scopes'), limit(50));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as ScopeNode));
      }
    } catch (e) {
      console.warn('Firestore fallback for getChildrenScopes:', e);
    }
    return Object.values(mockScopes).filter(s => s.parentPath?.endsWith(parentId) || (parentId === 'indonesia' && s.level === 'province'));
  }

  async getAllScopes(): Promise<ScopeNode[]> {
    try {
      const snap = await getDocs(collection(db, 'scopes'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as ScopeNode));
      }
    } catch (e) {
      console.warn('Firestore fallback for getAllScopes:', e);
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
      const snap = await getDoc(doc(db, 'dashboard_metrics', scopeId));
      if (snap.exists()) {
        return snap.data() as DashboardMetrics;
      }
    } catch (e) {
      console.warn('Firestore fallback for getDashboardMetrics:', e);
    }
    return mockDashboardMetrics;
  }

  async getSystemTasks(_scopeId: string): Promise<SystemTask[]> {
    try {
      const snap = await getDocs(collection(db, 'system_tasks'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as SystemTask));
      }
    } catch (e) {
      console.warn('Firestore fallback for getSystemTasks:', e);
    }
    return mockSystemTasks;
  }

  async getSystemAlarms(_scopeId: string): Promise<SystemAlarm[]> {
    try {
      const snap = await getDocs(collection(db, 'system_alarms'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as SystemAlarm));
      }
    } catch (e) {
      console.warn('Firestore fallback for getSystemAlarms:', e);
    }
    return mockSystemAlarms;
  }

  async getPriorityRegions(_scopeId: string): Promise<PriorityRegion[]> {
    try {
      const snap = await getDocs(collection(db, 'priority_regions'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as PriorityRegion));
      }
    } catch (e) {
      console.warn('Firestore fallback for getPriorityRegions:', e);
    }
    return mockPriorityRegions;
  }

  async getWorkspaceDistributions(_scopeId: string): Promise<WorkspaceDistribution[]> {
    try {
      const snap = await getDocs(collection(db, 'workspace_distributions'));
      if (!snap.empty) {
        return snap.docs.map(d => d.data() as WorkspaceDistribution);
      }
    } catch (e) {
      console.warn('Firestore fallback for getWorkspaceDistributions:', e);
    }
    return mockWorkspaceDistributions;
  }

  async getRecentActivities(_scopeId: string): Promise<RealtimeActivity[]> {
    try {
      const snap = await getDocs(collection(db, 'activities'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as RealtimeActivity));
      }
    } catch (e) {
      console.warn('Firestore fallback for getRecentActivities:', e);
    }
    return mockRecentActivities;
  }

  async getCurrentUser(): Promise<CurrentUser> {
    try {
      const snap = await getDoc(doc(db, 'system_users', 'current'));
      if (snap.exists()) {
        return snap.data() as CurrentUser;
      }
    } catch (e) {
      console.warn('Firestore fallback for getCurrentUser:', e);
    }
    return mockCurrentUser;
  }
}
