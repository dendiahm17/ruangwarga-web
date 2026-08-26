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
        return { icon: FileCheck, color: '#e11d48', bg: '#ffe4e6', countColor: '#be123c' };
      case 'deadline':
        return { icon: Clock, color: '#d97706', bg: '#fef3c7', countColor: '#b45309' };
      case 'approval':
        return { icon: UserCheck, color: '#2563eb', bg: '#dbeafe', countColor: '#1d4ed8' };
      case 'completed_today':
        return { icon: CheckCircle2, color: '#16a34a', bg: '#dcfce7', countColor: '#15803d' };
      default:
        return { icon: FileCheck, color: '#475569', bg: '#f1f5f9', countColor: '#334155' };
    }
  };

  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>
          TUGAS SISTEM - PERLU TINDAKAN
        </div>
        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
          Pekerjaan yang membutuhkan tindakan sesuai kewenangan
        </div>
      </div>

      {/* 4 Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        flex: 1,
        marginBottom: '12px'
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
                padding: '12px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: style.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <Icon size={18} color={style.color} strokeWidth={2.2} />
              </div>

              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                {task.count}
              </div>

              <div style={{ fontSize: '11px', fontWeight: 600, color: '#334155', marginTop: '4px' }}>
                {task.title}
              </div>

              <div style={{ fontSize: '9.5px', color: '#64748b', marginTop: '2px' }}>
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
          color: '#2563eb',
          fontSize: '11.5px',
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: 'auto'
        }}
      >
        <span>Lihat Semua Tugas Sistem</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
};
