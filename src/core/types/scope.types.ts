export type ScopeLevel = 'national' | 'province' | 'regency' | 'district' | 'village' | 'rw' | 'rt';

export interface ScopeNode {
  id: string;
  name: string;
  level: ScopeLevel;
  code?: string;
  parentPath?: string;
  stats: {
    workspaces: number;
    wargaCount: number;
    activeReports: number;
    pendingTasks: number;
    completionRate: number; // percentage (e.g. 92.7)
    activityCount: number;
    provincesCount?: number;
    regenciesCount?: number;
    districtsCount?: number;
    villagesCount?: number;
    rwCount?: number;
    rtCount?: number;
  };
}

export interface ScopeBreadcrumbItem {
  id: string;
  name: string;
  level: ScopeLevel;
}

export interface ScopeContextState {
  currentScope: ScopeNode;
  breadcrumbs: ScopeBreadcrumbItem[];
  setScopeById: (id: string) => Promise<void>;
  isLoading: boolean;
}
