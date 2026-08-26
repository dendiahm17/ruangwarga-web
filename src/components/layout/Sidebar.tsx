import React from 'react';
import {
  LayoutDashboard,
  Network,
  Layers,
  Users,
  UserCheck,
  ShieldCheck,
  GitBranch,
  CheckSquare,
  BellRing,
  FileText,
  History,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath = '/dashboard',
  onNavigate,
  isCollapsed,
  onToggleCollapse
}) => {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { path: '/wilayah', label: 'Wilayah', icon: Network, badge: null },
    { path: '/workspace', label: 'Workspace', icon: Layers, badge: null },
    { path: '/pengguna', label: 'Pengguna', icon: Users, badge: null },
    { path: '/pengurus', label: 'Pengurus', icon: UserCheck, badge: null },
    { path: '/role-permission', label: 'Role & Permission', icon: ShieldCheck, badge: null },
    { path: '/workflow', label: 'Workflow', icon: GitBranch, badge: null },
    { path: '/tugas-sistem', label: 'Tugas Sistem', icon: CheckSquare, badge: null },
    { path: '/alarm', label: 'Alarm', icon: BellRing, badge: '12', badgeColor: '#ef4444' },
    { path: '/laporan', label: 'Laporan', icon: FileText, badge: null },
    { path: '/audit-trail', label: 'Audit Trail', icon: History, badge: null },
    { path: '/wawasan', label: 'Wawasan', icon: BarChart3, badge: null },
    { path: '/pengaturan', label: 'Pengaturan', icon: Settings, badge: null }
  ];

  return (
    <aside style={{
      width: isCollapsed ? '72px' : '230px',
      minWidth: isCollapsed ? '72px' : '230px',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-card)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      userSelect: 'none',
      overflow: 'hidden',
      position: 'relative',
      transition: 'width 0.25s ease, min-width 0.25s ease',
      zIndex: 40
    }}>
      {/* Header Logo */}
      <div style={{
        padding: isCollapsed ? '16px 8px' : '18px 16px 14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Hexagonal glowing icon */}
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#060b13',
            boxShadow: '0 0 14px rgba(0, 229, 255, 0.4)',
            flexShrink: 0
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#05080f" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          {!isCollapsed && (
            <div>
              <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '15px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                RuangWarga
              </div>
              <div style={{ fontSize: '8px', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.08em', marginTop: '2px' }}>
                CONTROL CENTER
              </div>
            </div>
          )}
        </div>

        {/* Collapse Toggle Button */}
        {!isCollapsed && (
          <button
            onClick={onToggleCollapse}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px'
            }}
            title="Sembunyikan Sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Nav List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '10px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '3px'
      }}>
        {menuItems.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => onNavigate?.(item.path)}
              title={isCollapsed ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'space-between',
                width: '100%',
                padding: isCollapsed ? '10px' : '8px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#ffffff' : '#94a3b8',
                backgroundColor: isActive ? 'rgba(0, 229, 255, 0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(0, 229, 255, 0.35)' : '1px solid transparent',
                boxShadow: isActive ? '0 0 12px rgba(0, 229, 255, 0.15)' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#94a3b8';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={16} color={isActive ? '#00e5ff' : '#64748b'} strokeWidth={isActive ? 2.2 : 1.8} />
                {!isCollapsed && <span>{item.label}</span>}
              </div>
              {!isCollapsed && item.badge && (
                <span style={{
                  backgroundColor: item.badgeColor || '#ef4444',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '1px 5px',
                  borderRadius: '9999px',
                  boxShadow: '0 0 8px rgba(239, 68, 68, 0.4)'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer System Status & Hologram Globe Horizon */}
      <div style={{
        padding: isCollapsed ? '10px 4px' : '12px 14px 14px 14px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: '#04070d',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glowing Horizon Orb Backdrop */}
        <div style={{
          position: 'absolute',
          bottom: '-35px',
          left: '-35px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.25) 0%, rgba(2, 132, 199, 0.1) 45%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {!isCollapsed ? (
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>Sistem Status</span>
              <span style={{
                fontSize: '9.5px',
                fontWeight: 700,
                color: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '1px 5px',
                borderRadius: '4px'
              }}>
                Optimal
              </span>
            </div>
            <div style={{ fontSize: '9px', color: '#64748b', marginBottom: '8px' }}>
              Semua sistem berjalan normal
            </div>
            <div style={{ fontSize: '9.5px', color: '#94a3b8' }}>
              Waktu Server
            </div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.02em' }}>
              10:24:36 <span style={{ fontSize: '10px', color: '#38bdf8' }}>WIB</span>
            </div>
            <div style={{ fontSize: '8.5px', color: '#64748b', marginTop: '1px' }}>
              Selasa, 20 Mei 2025
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={onToggleCollapse}
              style={{
                background: 'none',
                border: 'none',
                color: '#38bdf8',
                cursor: 'pointer',
                padding: '4px'
              }}
              title="Buka Sidebar"
            >
              <ChevronRight size={16} />
            </button>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          </div>
        )}
      </div>
    </aside>
  );
};
