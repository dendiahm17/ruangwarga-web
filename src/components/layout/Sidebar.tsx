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
      width: '244px',
      minWidth: '244px',
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
        padding: '18px 18px 16px 18px',
        borderBottom: '1px solid var(--sidebar-border)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)',
          flexShrink: 0
        }}>
          <Leaf size={20} strokeWidth={2.4} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '16.5px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            RuangWarga
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
            <span style={{
              fontSize: '8.5px',
              fontWeight: 700,
              color: '#34d399',
              letterSpacing: '0.06em',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              padding: '1px 5px',
              borderRadius: '4px'
            }}>
              CONTROL CENTER
            </span>
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
                fontSize: '9.5px',
                fontWeight: 700,
                color: '#4e7a68',
                letterSpacing: '0.08em',
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
                      fontSize: '12px',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#ffffff' : '#8faea2',
                      backgroundColor: isActive ? 'rgba(16, 185, 129, 0.18)' : 'transparent',
                      borderLeft: isActive ? '3px solid #10b981' : '3px solid transparent',
                      borderTop: 'none',
                      borderRight: 'none',
                      borderBottom: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'var(--sidebar-hover)';
                        e.currentTarget.style.color = '#d1e3db';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#8faea2';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={16} color={isActive ? '#34d399' : '#5d8a77'} strokeWidth={isActive ? 2.2 : 1.8} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span style={{
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        fontSize: '9.5px',
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
        padding: '12px 14px',
        borderTop: '1px solid var(--sidebar-border)',
        backgroundColor: 'var(--sidebar-darker)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          padding: '8px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10.5px', color: '#8faea2' }}>Status Sistem</span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '10.5px',
              fontWeight: 600,
              color: '#34d399'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 6px #10b981' }} />
              Operasional
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10.5px' }}>
            <span style={{ color: '#5d8a77' }}>Uptime 99.98%</span>
            <span style={{ fontFamily: 'monospace', color: '#8faea2', fontSize: '10px' }}>v1.0.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
