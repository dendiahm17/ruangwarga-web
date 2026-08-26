import type { ScopeNode, ScopeBreadcrumbItem } from '../../core/types/scope.types';
import { mockScopes } from './mockWilayahData';

export const mockWilayahService = {
  async getScopeById(id: string): Promise<ScopeNode | null> {
    return mockScopes[id] || mockScopes['indonesia'];
  },

  async getBreadcrumbsForScope(id: string): Promise<ScopeBreadcrumbItem[]> {
    const defaultCrumbs: ScopeBreadcrumbItem[] = [
      { id: 'indonesia', name: 'Indonesia', level: 'national' }
    ];
    if (id === 'indonesia') return defaultCrumbs;
    if (id === 'jabar') return [...defaultCrumbs, { id: 'jabar', name: 'Jawa Barat', level: 'province' }];
    if (id === 'kab-bogor') return [...defaultCrumbs, { id: 'jabar', name: 'Jawa Barat', level: 'province' }, { id: 'kab-bogor', name: 'Kab. Bogor', level: 'regency' }];
    if (id === 'kec-cibinong') return [...defaultCrumbs, { id: 'jabar', name: 'Jawa Barat', level: 'province' }, { id: 'kab-bogor', name: 'Kab. Bogor', level: 'regency' }, { id: 'kec-cibinong', name: 'Kec. Cibinong', level: 'district' }];
    if (id === 'kel-sukamaju') return [...defaultCrumbs, { id: 'jabar', name: 'Jawa Barat', level: 'province' }, { id: 'kab-bogor', name: 'Kab. Bogor', level: 'regency' }, { id: 'kec-cibinong', name: 'Kec. Cibinong', level: 'district' }, { id: 'kel-sukamaju', name: 'Kel. Sukamaju', level: 'village' }];
    if (id === 'rw-02') return [...defaultCrumbs, { id: 'jabar', name: 'Jawa Barat', level: 'province' }, { id: 'kab-bogor', name: 'Kab. Bogor', level: 'regency' }, { id: 'kec-cibinong', name: 'Kec. Cibinong', level: 'district' }, { id: 'kel-sukamaju', name: 'Kel. Sukamaju', level: 'village' }, { id: 'rw-02', name: 'RW 02', level: 'rw' }];
    return defaultCrumbs;
  }
};
