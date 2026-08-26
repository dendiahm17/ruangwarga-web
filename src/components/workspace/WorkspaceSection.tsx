import React from 'react';
import type { WorkspaceTierItem } from '../../core/types/dashboard.types';
import { Building2, Building, Home, Users, ChevronRight } from 'lucide-react';

interface WorkspaceSectionProps {
  workspaces: WorkspaceTierItem[];
  onViewWorkspace?: (id: string) => void;
}

export const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({
  workspaces,
  onViewWorkspace
}) => {
  const getIcon = (type: string, color: string) => {
    switch (type) {
      case 'provinsi': return <Building2 size={20} color={color} />;
      case 'kabupaten': return <Building size={20} color={color} />;
      case 'kecamatan': return <Building2 size={20} color={color} />;
      case 'desa': return <Home size={20} color={color} />;
      case 'rw': return <Users size={20} color={color} />;
      case 'rt': return <Home size={20} color={color} />;
      default: return <Building2 size={20} color={color} />;
    }
  };

  return (
    <div className="futuristic-card" style={{ padding: '16px 20px' }}>
      {/* Title */}
      <div className="futuristic-card-title" style={{ marginBottom: '12px' }}>
        WORKSPACE
      </div>

      {/* 6 Horizontal Tier Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '10px'
      }}>
        {workspaces.map((ws) => (
          <div
            key={ws.id}
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(56, 189, 248, 0.12)',
              borderRadius: '8px',
              padding: '12px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = ws.color;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${ws.color}25`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.12)';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Icon */}
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: `${ws.color}15`,
              border: `1px solid ${ws.color}35`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              {getIcon(ws.iconType, ws.color)}
            </div>

            {/* Title */}
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
              {ws.title}
            </div>

            {/* Count */}
            <div style={{ fontSize: '9.5px', color: '#94a3b8', marginTop: '3px' }}>
              {ws.countLabel}
            </div>

            {/* Action Link */}
            <button
              onClick={() => onViewWorkspace?.(ws.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                color: '#38bdf8',
                fontSize: '10.5px',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: '8px',
                padding: '2px 6px'
              }}
            >
              <span>Lihat</span>
              <ChevronRight size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
