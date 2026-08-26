import React from 'react';
import type { SystemTaskItem } from '../../core/types/dashboard.types';
import { ChevronRight, FileCheck, RefreshCw, Database, ShieldCheck, ArrowUpCircle } from 'lucide-react';

interface SystemTasksPanelProps {
  tasks: SystemTaskItem[];
  onViewAll?: () => void;
}

export const SystemTasksPanel: React.FC<SystemTasksPanelProps> = ({ tasks, onViewAll }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'verification': return <FileCheck size={14} color="#38bdf8" />;
      case 'sync': return <RefreshCw size={14} color="#38bdf8" />;
      case 'backup': return <Database size={14} color="#38bdf8" />;
      case 'audit': return <ShieldCheck size={14} color="#38bdf8" />;
      case 'update': return <ArrowUpCircle size={14} color="#38bdf8" />;
      default: return <FileCheck size={14} color="#38bdf8" />;
    }
  };

  return (
    <div className="futuristic-card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="futuristic-card-title" style={{ marginBottom: '14px' }}>
        TUGAS SISTEM
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {tasks.map((task) => (
          <div key={task.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {/* Title & Count Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '5px',
                  backgroundColor: 'rgba(56, 189, 248, 0.1)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {getIcon(task.iconType)}
                </div>
                <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{task.title}</span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8', minWidth: '46px', textAlign: 'right' }}>
                {task.current} <span style={{ color: '#64748b', fontWeight: 500 }}>/ {task.total}</span>
              </span>
            </div>

            {/* Glowing Progress Track */}
            <div style={{ width: '100%', height: '4px', backgroundColor: '#132238', borderRadius: '9999px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${task.percentage}%`,
                  height: '100%',
                  backgroundColor: task.percentage === 100 ? '#10b981' : '#00e5ff',
                  boxShadow: task.percentage === 100 ? '0 0 6px rgba(16, 185, 129, 0.5)' : '0 0 6px rgba(0, 229, 255, 0.5)',
                  borderRadius: '9999px',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <button
        onClick={onViewAll}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '4px',
          background: 'none',
          border: 'none',
          color: '#38bdf8',
          fontSize: '11px',
          fontWeight: 700,
          cursor: 'pointer',
          marginTop: '12px',
          paddingTop: '6px'
        }}
      >
        <span>Lihat Semua Tugas</span>
        <ChevronRight size={13} />
      </button>
    </div>
  );
};
