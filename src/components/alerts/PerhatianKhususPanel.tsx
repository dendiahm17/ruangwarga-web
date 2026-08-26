import React from 'react';
import type { SpecialAttentionItem } from '../../core/types/dashboard.types';
import { AlertTriangle, AlertCircle, Info, ChevronRight } from 'lucide-react';

interface PerhatianKhususPanelProps {
  items: SpecialAttentionItem[];
  onViewAll?: () => void;
}

export const PerhatianKhususPanel: React.FC<PerhatianKhususPanelProps> = ({ items, onViewAll }) => {
  const getBadgeStyle = (level: string) => {
    switch (level) {
      case 'critical':
        return {
          icon: AlertTriangle,
          color: '#ef4444',
          bg: 'rgba(239, 68, 68, 0.12)',
          border: 'rgba(239, 68, 68, 0.3)'
        };
      case 'warning':
        return {
          icon: AlertCircle,
          color: '#f59e0b',
          bg: 'rgba(245, 158, 11, 0.12)',
          border: 'rgba(245, 158, 11, 0.3)'
        };
      default:
        return {
          icon: Info,
          color: '#38bdf8',
          bg: 'rgba(56, 189, 248, 0.12)',
          border: 'rgba(56, 189, 248, 0.3)'
        };
    }
  };

  return (
    <div className="futuristic-card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header with red count badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="futuristic-card-title">PERHATIAN KHUSUS</span>
          <span style={{
            backgroundColor: '#ef4444',
            color: '#ffffff',
            fontSize: '9px',
            fontWeight: 800,
            padding: '1px 5px',
            borderRadius: '9999px',
            boxShadow: '0 0 6px rgba(239, 68, 68, 0.4)'
          }}>
            {items.length}
          </span>
        </div>
      </div>

      {/* Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {items.map((item) => {
          const style = getBadgeStyle(item.level);
          const Icon = style.icon;
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '8px 10px',
                borderRadius: '6px',
                backgroundColor: '#0a1220',
                border: `1px solid ${style.border}`,
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                backgroundColor: style.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px'
              }}>
                <Icon size={13} color={style.color} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', lineHeight: 1.25 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '9.5px', color: '#94a3b8', marginTop: '2px' }}>
                  {item.subtitle}
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
        <span>Lihat Semua</span>
        <ChevronRight size={13} />
      </button>
    </div>
  );
};
