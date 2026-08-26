import React from 'react';
import { RealtimeActivity } from '../../core/types/dashboard.types';
import { Users, FileText, UserCheck, MessageSquare, Calendar } from 'lucide-react';

interface RecentActivityFeedProps {
  activities: RealtimeActivity[];
  onViewAll?: () => void;
}

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activities, onViewAll }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'kegiatan':
        return { icon: Users, color: '#16a34a', bg: '#dcfce7' };
      case 'laporan':
        return { icon: FileText, color: '#dc2626', bg: '#fee2e2' };
      case 'verifikasi':
        return { icon: UserCheck, color: '#d97706', bg: '#fef3c7' };
      case 'musyawarah':
        return { icon: MessageSquare, color: '#0284c7', bg: '#e0f2fe' };
      case 'agenda':
        return { icon: Calendar, color: '#7c3aed', bg: '#ede9fe' };
      default:
        return { icon: Users, color: '#475569', bg: '#f1f5f9' };
    }
  };

  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>
          AKTIVITAS TERBARU <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>(REAL-TIME)</span>
        </div>

        <button
          onClick={onViewAll}
          style={{
            background: 'none',
            border: 'none',
            color: '#2563eb',
            fontSize: '11.5px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Lihat Semua
        </button>
      </div>

      {/* Activity List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {activities.map((act) => {
          const style = getActivityIcon(act.type);
          const Icon = style.icon;
          return (
            <div
              key={act.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                paddingBottom: '8px',
                borderBottom: '1px solid #f8fafc'
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: style.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px'
              }}>
                <Icon size={14} color={style.color} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#1e293b', lineHeight: 1.25 }}>
                  {act.title}
                </div>
                <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '2px' }}>
                  {act.description}
                </div>
              </div>

              <div style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 500, flexShrink: 0 }}>
                {act.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
