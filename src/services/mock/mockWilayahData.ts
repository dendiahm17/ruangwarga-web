import { ScopeNode } from '../../core/types/scope.types';

export const mockScopes: Record<string, ScopeNode> = {
  'indonesia': {
    id: 'indonesia',
    name: 'Indonesia',
    level: 'national',
    stats: {
      workspaces: 120654,
      wargaCount: 72842121,
      activeReports: 5432,
      pendingTasks: 42,
      completionRate: 92.7,
      activityCount: 184932,
      provincesCount: 38,
      regenciesCount: 416,
      districtsCount: 2857,
      villagesCount: 8732,
      rwCount: 42158,
      rtCount: 66453,
    }
  },
  'jabar': {
    id: 'jabar',
    name: 'Jawa Barat',
    level: 'province',
    parentPath: 'indonesia',
    stats: {
      workspaces: 24150,
      wargaCount: 14850200,
      activeReports: 1120,
      pendingTasks: 12,
      completionRate: 94.1,
      activityCount: 42300,
      regenciesCount: 27,
      districtsCount: 627,
      villagesCount: 5957,
      rwCount: 8400,
      rtCount: 14200,
    }
  },
  'kab-bogor': {
    id: 'kab-bogor',
    name: 'Kab. Bogor',
    level: 'regency',
    parentPath: 'indonesia/jabar',
    stats: {
      workspaces: 3820,
      wargaCount: 2150000,
      activeReports: 210,
      pendingTasks: 5,
      completionRate: 93.4,
      activityCount: 9400,
      districtsCount: 40,
      villagesCount: 435,
      rwCount: 1240,
      rtCount: 3820,
    }
  },
  'kec-cibinong': {
    id: 'kec-cibinong',
    name: 'Kec. Cibinong',
    level: 'district',
    parentPath: 'indonesia/jabar/kab-bogor',
    stats: {
      workspaces: 420,
      wargaCount: 350000,
      activeReports: 34,
      pendingTasks: 2,
      completionRate: 95.8,
      activityCount: 1800,
      villagesCount: 13,
      rwCount: 140,
      rtCount: 420,
    }
  },
  'kel-sukamaju': {
    id: 'kel-sukamaju',
    name: 'Kel. Sukamaju',
    level: 'village',
    parentPath: 'indonesia/jabar/kab-bogor/kec-cibinong',
    stats: {
      workspaces: 64,
      wargaCount: 28400,
      activeReports: 8,
      pendingTasks: 1,
      completionRate: 96.2,
      activityCount: 340,
      rwCount: 12,
      rtCount: 64,
    }
  },
  'rw-02': {
    id: 'rw-02',
    name: 'RW 02',
    level: 'rw',
    parentPath: 'indonesia/jabar/kab-bogor/kec-cibinong/kel-sukamaju',
    stats: {
      workspaces: 8,
      wargaCount: 3250,
      activeReports: 2,
      pendingTasks: 0,
      completionRate: 98.0,
      activityCount: 64,
      rtCount: 8,
    }
  }
};
