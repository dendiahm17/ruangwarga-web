import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardPage } from './pages/DashboardPage';
import { WilayahPage } from './pages/WilayahPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { PenggunaPage } from './pages/PenggunaPage';
import { PengurusPage } from './pages/PengurusPage';
import { AlarmPage } from './pages/AlarmPage';
import { LaporanPage } from './pages/LaporanPage';
import { RolePermissionPage } from './pages/RolePermissionPage';
import { AuditTrailPage } from './pages/AuditTrailPage';
import { TugasSistemPage } from './pages/TugasSistemPage';
import { WorkflowPage } from './pages/WorkflowPage';
import { WawasanPage } from './pages/WawasanPage';
import { PengaturanPage } from './pages/PengaturanPage';
import { ScopeProvider } from './context/ScopeContext';
import { AuthProvider } from './context/AuthContext';
import { ScopeSelectorModal } from './components/common/ScopeSelectorModal';

export const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isScopeModalOpen, setIsScopeModalOpen] = useState<boolean>(false);

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={(path) => setCurrentPath(path)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Header />
        
        {/* Dynamic Page Rendering */}
        {currentPath === '/dashboard' && (
          <DashboardPage
            onOpenScopeModal={() => setIsScopeModalOpen(true)}
            onNavigate={(path) => setCurrentPath(path)}
          />
        )}

        {currentPath === '/wilayah' && (
          <WilayahPage onNavigateWorkspace={() => setCurrentPath('/workspace')} />
        )}

        {currentPath === '/workspace' && (
          <WorkspacePage />
        )}

        {currentPath === '/pengguna' && (
          <PenggunaPage />
        )}

        {currentPath === '/pengurus' && (
          <PengurusPage />
        )}

        {currentPath === '/alarm' && (
          <AlarmPage />
        )}

        {currentPath === '/laporan' && (
          <LaporanPage />
        )}

        {currentPath === '/role-permission' && (
          <RolePermissionPage />
        )}

        {currentPath === '/audit-trail' && (
          <AuditTrailPage />
        )}

        {currentPath === '/tugas-sistem' && (
          <TugasSistemPage />
        )}

        {currentPath === '/workflow' && (
          <WorkflowPage />
        )}

        {currentPath === '/wawasan' && (
          <WawasanPage />
        )}

        {currentPath === '/pengaturan' && (
          <PengaturanPage />
        )}
      </div>

      {/* Interactive Scope Drilldown Modal */}
      <ScopeSelectorModal
        isOpen={isScopeModalOpen}
        onClose={() => setIsScopeModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ScopeProvider>
        <AppContent />
      </ScopeProvider>
    </AuthProvider>
  );
}
