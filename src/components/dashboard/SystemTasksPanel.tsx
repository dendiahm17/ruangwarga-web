import React from 'react';
import { SystemTask } from '../../core/types/dashboard.types';
import { ChevronRight, FileCheck, Clock, UserCheck, CheckCircle2 } from 'lucide-react';

interface SystemTasksPanelProps {
  tasks: SystemTask[];
  onViewAll?: () => void;
}

export const SystemTasksPanel: React.FC<SystemTasksPanelProps> = ({ tasks, onViewAll }) => {
  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'verification':
        return { icon: FileCheck, color: '#e11d48', bg: '#ffe4e6', border: '#fecdd3' };
      case 'deadline':
        return { icon: Clock, color: '#d97706', bg: '#fef3c7', border: '#fde68a' };
      case 'approval':
        return { icon: UserCheck, color: '#2563eb', bg: '#dbeafe', border: '#bfdbfe' };
      case 'completed_today':
        return { icon: CheckCircle2, color: '#16a34a', bg: '#dcfce7', border: '#bbf7d0' };
      default:
        return { icon: FileCheck, color: '#475569', bg: '#f1f5f9', border: '#e2e8f0' };
    }
  };

  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '12px' }}>
        <div className="panel-title">
          <span>Tugas Sistem</span>
          <span style={{ fontSize: '10px', color: '#dc2626', backgroundColor: '#fef2f2', border: '1px solid #fee2e2', padding: '1px 6px', borderRadius: '4px' }}>
            Perlu Tindakan
          </span>
        </div>
        <div className="panel-subtitle">
          Pekerjaan menunggu verifikasi & otorisasi sesuai kewenangan
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        flex: 1,
        marginBottom: '10px'
      }}>
        {tasks.map((task) => {
          const style = getTaskIcon(task.type);
          const Icon = style.icon;
          return (
            <div
              key={task.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #edf2f7',
                borderRadius: '8px',
                padding: '10px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = style.border;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#edf2f7';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: style.bg,
                border: `1px solid ${style.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '6px'
              }}>
                <Icon size={16} color={style.color} strokeWidth={2.2} />
              </div>

              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {task.count}
              </div>

              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#334155', marginTop: '3px' }}>
                {task.title}
              </div>

              <div style={{ fontSize: '9px', color: '#64748b', marginTop: '1px' }}>
                {task.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <button
        onClick={onViewAll}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 0',
          background: 'none',
          border: 'none',
          color: '#0284c7',
          fontSize: '11.5px',
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: 'auto'
        }}
      >
        <span>Buka Antrian Tugas Sistem</span>
        <ChevronRight size={13} />
      </button>
    </div>
  );
};
