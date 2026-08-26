import React from 'react';
import type { RealtimeActivityItem } from '../../core/types/dashboard.types';
import { UserCheck, CheckCircle2, FileText, UserPlus, Database, ChevronRight } from 'lucide-react';

interface AktivitasSistemTimelineProps {
  activities: RealtimeActivityItem[];
  onViewAll?: () => void;
}

export const AktivitasSistemTimeline: React.FC<AktivitasSistemTimelineProps> = ({
  activities,
  onViewAll
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return { icon: UserCheck, color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' };
      case 'verification': return { icon: CheckCircle2, color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
      case 'report': return { icon: FileText, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' };
      case 'user': return { icon: UserPlus, color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' };
      case 'backup': return { icon: Database, color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
      default: return { icon: CheckCircle2, color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.15)' };
    }
  };

  return (
    <div className="futuristic-card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="futuristic-card-title" style={{ marginBottom: '12px' }}>
        AKTIVITAS SISTEM TERBARU
      </div>

      {/* Activities Timeline List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', flex: 1 }}>
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
                borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
              }}
            >
              {/* Time */}
              <div style={{
                fontSize: '10.5px',
                fontWeight: 700,
                color: '#64748b',
                width: '34px',
                flexShrink: 0,
                marginTop: '1px'
              }}>
                {act.time}
              </div>

              {/* Icon */}
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '5px',
                backgroundColor: style.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px'
              }}>
                <Icon size={12} color={style.color} />
              </div>

              {/* Title & Actor */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
                  {act.title}
                </div>
                <div style={{ fontSize: '9.5px', color: '#94a3b8', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {act.actor}
                </div>
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
          justifyContent: 'flex-end',
          gap: '4px',
          background: 'none',
          border: 'none',
          color: '#38bdf8',
          fontSize: '11px',
          fontWeight: 700,
          cursor: 'pointer',
          marginTop: '10px',
          paddingTop: '4px'
        }}
      >
        <span>Lihat Semua Aktivitas</span>
        <ChevronRight size={13} />
      </button>
    </div>
  );
};
