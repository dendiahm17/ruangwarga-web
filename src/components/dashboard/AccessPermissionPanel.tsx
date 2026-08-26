import React from 'react';
import { CurrentUser } from '../../core/types/dashboard.types';
import { Users, Shield, Globe, Lock, ChevronRight } from 'lucide-react';

interface AccessPermissionPanelProps {
  user: CurrentUser | null;
}

export const AccessPermissionPanel: React.FC<AccessPermissionPanelProps> = ({ user }) => {
  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Title */}
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em', marginBottom: '14px' }}>
        INFO AKSES & WEWENANG
      </div>

      {/* Info items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {/* Active users */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <Users size={16} color="#64748b" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Pengguna Aktif</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
              {user?.activeUsersCount || 28} <span style={{ fontSize: '11px', fontWeight: 400, color: '#64748b' }}>online sekarang</span>
            </div>
          </div>
        </div>

        {/* Role */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <Shield size={16} color="#64748b" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Role Anda</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
              {user?.role || 'Super Administrator'}
            </div>
          </div>
        </div>

        {/* Scope */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <Globe size={16} color="#64748b" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Scope Anda</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
              {user?.scopeLabel || 'Seluruh Indonesia'}
            </div>
          </div>
        </div>

        {/* Permission */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <Lock size={16} color="#64748b" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Permission Level</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
              {user?.permissionLevel || 'Full Access'}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 0',
          background: 'none',
          border: 'none',
          color: '#2563eb',
          fontSize: '11.5px',
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        <span>Lihat Detail Akses</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
};
