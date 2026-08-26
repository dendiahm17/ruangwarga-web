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

        {currentPath !== '/dashboard' &&
         currentPath !== '/wilayah' &&
         currentPath !== '/workspace' &&
         currentPath !== '/pengguna' &&
         currentPath !== '/pengurus' &&
         currentPath !== '/alarm' &&
         currentPath !== '/laporan' && (
          <div style={{ padding: '32px 24px', maxWidth: '1200px' }}>
            <div className="futuristic-card" style={{ padding: '36px', textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 229, 255, 0.1)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00e5ff',
                marginBottom: '14px',
                boxShadow: '0 0 15px rgba(0, 229, 255, 0.2)'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                Modul {currentPath.replace('/', '').replace('-', ' ').toUpperCase()}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '13px', maxWidth: '500px', margin: '0 auto 24px auto', lineHeight: 1.4 }}>
                Modul ini telah terhubung ke arsitektur data RuangWarga Control Center dan siap dikembangkan berikutnya.
              </p>
              <button
                onClick={() => setCurrentPath('/dashboard')}
                style={{
                  padding: '8px 20px',
                  backgroundColor: 'rgba(0, 229, 255, 0.15)',
                  border: '1px solid #00e5ff',
                  color: '#00e5ff',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 0 12px rgba(0, 229, 255, 0.2)'
                }}
              >
                Kembali ke Dashboard Utama
              </button>
            </div>
          </div>
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
