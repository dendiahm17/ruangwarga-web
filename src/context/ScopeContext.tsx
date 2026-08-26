import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScopeNode, ScopeBreadcrumbItem, ScopeContextState } from '../core/types/scope.types';
import { wilayahService } from '../services';

const ScopeContext = createContext<ScopeContextState | undefined>(undefined);

export const ScopeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScope, setCurrentScope] = useState<ScopeNode>({
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
  });

  const [breadcrumbs, setBreadcrumbs] = useState<ScopeBreadcrumbItem[]>([
    { id: 'indonesia', name: 'Indonesia', level: 'national' },
    { id: 'jabar', name: 'Jawa Barat', level: 'province' },
    { id: 'kab-bogor', name: 'Kab. Bogor', level: 'regency' },
    { id: 'kec-cibinong', name: 'Kec. Cibinong', level: 'district' },
    { id: 'kel-sukamaju', name: 'Kel. Sukamaju', level: 'village' },
    { id: 'rw-02', name: 'RW 02', level: 'rw' }
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setScopeById = async (id: string) => {
    setIsLoading(true);
    try {
      const scopeData = await wilayahService.getScopeById(id);
      if (scopeData) {
        setCurrentScope(scopeData);
      }
      const crumbs = await wilayahService.getBreadcrumbsForScope(id);
      setBreadcrumbs(crumbs);
    } catch (e) {
      console.error('Failed to change scope:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setScopeById('indonesia');
  }, []);

  return (
    <ScopeContext.Provider value={{ currentScope, breadcrumbs, setScopeById, isLoading }}>
      {children}
    </ScopeContext.Provider>
  );
};

export const useScope = (): ScopeContextState => {
  const context = useContext(ScopeContext);
  if (!context) {
    throw new Error('useScope must be used within a ScopeProvider');
  }
  return context;
};
