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
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em', marginBottom: '14px' }}>
        ALARM & KEJADIAN PENTING
      </div>

      {/* Alarm list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
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
                paddingBottom: '8px',
                borderBottom: '1px solid #f1f5f9'
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: style.bg,
                border: `1px solid ${style.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px'
              }}>
                <Icon size={15} color={style.color} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#1e293b', lineHeight: 1.3 }}>
                  {alarm.title}
                </div>
                <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '2px' }}>
                  {alarm.subtitle}
                </div>
              </div>

              <div style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 500, flexShrink: 0 }}>
                {alarm.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
