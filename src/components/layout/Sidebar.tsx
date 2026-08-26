import React from 'react';
import {
  LayoutDashboard,
  Network,
  MapPin,
  Layers,
  Users,
  UserCheck,
  ShieldCheck,
  BadgeCheck,
  GitBranch,
  CheckSquare,
  BellRing,
  FileText,
  Activity,
  BarChart3,
  TrendingUp,
  History,
  BookOpen,
  Settings,
  Leaf
} from 'lucide-react';

interface SidebarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath = '/dashboard', onNavigate }) => {
  const navSections = [
    {
      group: null,
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null }
      ]
    },
    {
      group: 'WILAYAH & WORKSPACE',
      items: [
        { path: '/hierarki-wilayah', label: 'Hierarki Wilayah', icon: Network, badge: null },
        { path: '/peta-wilayah', label: 'Peta Wilayah', icon: MapPin, badge: null },
        { path: '/workspace', label: 'Workspace', icon: Layers, badge: null }
      ]
    },
    {
      group: 'PENGELOLAAN',
      items: [
        { path: '/pengguna', label: 'Pengguna', icon: Users, badge: null },
        { path: '/pengurus', label: 'Pengurus', icon: UserCheck, badge: null },
        { path: '/role-permission', label: 'Role & Permission', icon: ShieldCheck, badge: null },
        { path: '/verifikasi-warga', label: 'Verifikasi Warga', icon: BadgeCheck, badge: null }
      ]
    },
    {
      group: 'GOVERNANCE',
      items: [
        { path: '/workflow', label: 'Workflow', icon: GitBranch, badge: null },
        { path: '/tugas-sistem', label: 'Tugas Sistem', icon: CheckSquare, badge: '24', badgeColor: 'bg-red-500' },
        { path: '/alarm', label: 'Alarm & Kejadian', icon: BellRing, badge: null },
        { path: '/laporan', label: 'Laporan', icon: FileText, badge: null }
      ]
    },
    {
      group: 'MONITORING & WAWASAN',
      items: [
        { path: '/monitoring-wilayah', label: 'Monitoring Wilayah', icon: Activity, badge: null },
        { path: '/wawasan', label: 'Wawasan & Statistik', icon: BarChart3, badge: null },
        { path: '/indikator-kinerja', label: 'Indikator Kinerja', icon: TrendingUp, badge: null }
      ]
    },
    {
      group: 'SISTEM',
      items: [
        { path: '/audit-trail', label: 'Audit Trail', icon: History, badge: null },
        { path: '/sop-kebijakan', label: 'SOP & Kebijakan', icon: BookOpen, badge: null },
        { path: '/pengaturan', label: 'Pengaturan Sistem', icon: Settings, badge: null }
      ]
    }
  ];

  return (
    <aside style={{
      width: '248px',
      minWidth: '248px',
      backgroundColor: 'var(--sidebar-bg)',
      color: 'var(--sidebar-text)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      borderRight: '1px solid var(--sidebar-border)',
      userSelect: 'none',
      overflow: 'hidden'
    }}>
      {/* Header Logo */}
      <div style={{
        padding: '20px 18px 16px 18px',
        borderBottom: '1px solid var(--sidebar-border)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 2px 6px rgba(16, 185, 129, 0.4)'
        }}>
          <Leaf size={20} strokeWidth={2.4} />
        </div>
        <div>
          <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '17px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            RuangWarga
          </div>
          <div style={{ fontSize: '9px', fontWeight: 600, color: '#34d399', letterSpacing: '0.04em', marginTop: '2px' }}>
            CONTROL CENTER
          </div>
          <div style={{ fontSize: '8.5px', color: '#6ee7b7', opacity: 0.75, letterSpacing: '0.01em' }}>
            Platform Tata Kelola Masyarakat
          </div>
        </div>
      </div>

      {/* Nav List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        {navSections.map((sec, idx) => (
          <div key={idx}>
            {sec.group && (
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#6b9080',
                letterSpacing: '0.06em',
                padding: '4px 10px 6px 10px',
                textTransform: 'uppercase'
              }}>
                {sec.group}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {sec.items.map((item) => {
                const isActive = currentPath === item.path;
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => onNavigate?.(item.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#ffffff' : '#9eb8ac',
                      backgroundColor: isActive ? '#15523b' : 'transparent',
                      border: isActive ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'var(--sidebar-hover)';
                        e.currentTarget.style.color = '#e2ece7';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#9eb8ac';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={16} color={isActive ? '#34d399' : '#6b9080'} strokeWidth={isActive ? 2.2 : 1.8} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span style={{
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '9999px',
                        lineHeight: 1.4
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer System Status */}
      <div style={{
        padding: '14px 16px',
        borderTop: '1px solid var(--sidebar-border)',
        backgroundColor: 'var(--sidebar-darker)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', color: '#9eb8ac' }}>Status Sistem</span>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#34d399'
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 6px #10b981' }} />
            Sehat
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
          <span style={{ color: '#6b9080' }}>Uptime</span>
          <span style={{ fontWeight: 600, color: '#e2ece7' }}>99.98%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10.5px' }}>
          <span style={{ color: '#6b9080' }}>Versi Platform</span>
          <span style={{ fontFamily: 'monospace', color: '#9eb8ac' }}>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
};
