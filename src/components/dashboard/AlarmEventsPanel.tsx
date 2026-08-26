import React from 'react';
import { SystemAlarm } from '../../core/types/dashboard.types';
import { AlertTriangle, Bell, Info, ShieldAlert } from 'lucide-react';

interface AlarmEventsPanelProps {
  alarms: SystemAlarm[];
}

export const AlarmEventsPanel: React.FC<AlarmEventsPanelProps> = ({ alarms }) => {
  const getAlarmBadge = (level: string) => {
    switch (level) {
      case 'danger':
        return { icon: AlertTriangle, color: '#ef4444', bg: '#fef2f2', border: '#fee2e2' };
      case 'warning':
        return { icon: Bell, color: '#f59e0b', bg: '#fffbeb', border: '#fef3c7' };
      case 'info':
        return { icon: Info, color: '#3b82f6', bg: '#eff6ff', border: '#dbeafe' };
      case 'security':
        return { icon: ShieldAlert, color: '#0ea5e9', bg: '#f0f9ff', border: '#e0f2fe' };
      default:
        return { icon: Info, color: '#64748b', bg: '#f8fafc', border: '#e2e8f0' };
    }
  };

  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div className="panel-title">
          <span>Alarm & Kejadian Penting</span>
        </div>
        <span style={{ fontSize: '10.5px', color: '#ef4444', fontWeight: 700 }}>
          {alarms.length} Terdeteksi
        </span>
      </div>

      {/* Alarm list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
        {alarms.map((alarm) => {
          const style = getAlarmBadge(alarm.level);
          const Icon = style.icon;
          return (
            <div
              key={alarm.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: '#fafbfc',
                border: '1px solid #f1f5f9',
                transition: 'border-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = style.border}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f1f5f9'}
            >
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                backgroundColor: style.bg,
                border: `1px solid ${style.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px'
              }}>
                <Icon size={13} color={style.color} strokeWidth={2.2} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0f172a', lineHeight: 1.25 }}>
                  {alarm.title}
                </div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px', lineHeight: 1.3 }}>
                  {alarm.subtitle}
                </div>
              </div>

              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, flexShrink: 0 }}>
                {alarm.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
