import React from 'react';
import { 
  FolderPlus, 
  Megaphone, 
  Users, 
  History, 
  DatabaseBackup 
} from 'lucide-react';

export const QuickActionsPanel: React.FC = () => {
  const actions = [
    { label: 'Tambah Workspace', icon: FolderPlus, color: '#0284c7', bg: '#f0f9ff' },
    { label: 'Buat Pengumuman', icon: Megaphone, color: '#16a34a', bg: '#f0fdf4' },
    { label: 'Kelola Pengguna', icon: Users, color: '#9333ea', bg: '#faf5ff' },
    { label: 'Lihat Audit Trail', icon: History, color: '#d97706', bg: '#fffbeb' },
    { label: 'Backup Data', icon: DatabaseBackup, color: '#475569', bg: '#f8fafc' }
  ];

  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em', marginBottom: '12px' }}>
        PINTASAN SISTEM
      </div>

      {/* Button List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <button
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                color: '#1e293b',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = act.bg;
                e.currentTarget.style.borderColor = act.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                backgroundColor: act.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon size={14} color={act.color} strokeWidth={2.2} />
              </div>
              <span>{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
