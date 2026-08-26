import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardPage } from './pages/DashboardPage';
import { ScopeProvider } from './context/ScopeContext';
import { AuthProvider } from './context/AuthContext';
import { ScopeSelectorModal } from './components/common/ScopeSelectorModal';

export const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/dashboard');
  const [isScopeModalOpen, setIsScopeModalOpen] = useState<boolean>(false);

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={(path) => setCurrentPath(path)}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Header onOpenScopeModal={() => setIsScopeModalOpen(true)} />
        
        {/* Dynamic Page Rendering */}
        {currentPath === '/dashboard' && (
          <DashboardPage
            onOpenScopeModal={() => setIsScopeModalOpen(true)}
            onNavigate={(path) => setCurrentPath(path)}
          />
        )}

        {currentPath !== '/dashboard' && (
          <div style={{ padding: '32px 24px', maxWidth: '1200px' }}>
            <div className="panel-card" style={{ padding: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Halaman {currentPath.replace('/', '').replace('-', ' ').toUpperCase()}
              </h2>
              <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>
                Modul ini terhubung ke arsitektur data RuangWarga dan siap dikembangkan lebih lanjut.
              </p>
              <button
                onClick={() => setCurrentPath('/dashboard')}
                style={{
                  padding: '8px 18px',
                  backgroundColor: '#0c2b20',
                  color: '#ffffff',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Kembali ke Dashboard
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
