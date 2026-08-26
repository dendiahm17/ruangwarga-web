import React from 'react';
import { WorkspaceDistribution } from '../../core/types/dashboard.types';
import { ChevronRight } from 'lucide-react';

interface WorkspaceDistributionPanelProps {
  distributions: WorkspaceDistribution[];
  onManageWorkspace?: () => void;
}

export const WorkspaceDistributionPanel: React.FC<WorkspaceDistributionPanelProps> = ({
  distributions,
  onManageWorkspace
}) => {
  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em', marginBottom: '14px' }}>
        WORKSPACE BERDASARKAN TINGKAT WILAYAH
      </div>

      {/* Distribution list with progress bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#94a3b8', fontWeight: 600 }}>
          <span>Tingkat Wilayah</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>Total Workspace</span>
            <span>Persentase</span>
          </div>
        </div>

        {distributions.map((item) => (
          <div key={item.level} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px' }}>
              <span style={{ color: '#334155', fontWeight: 500 }}>{item.level}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontWeight: 700, color: '#0f172a', minWidth: '45px', textAlign: 'right' }}>
                  {item.count.toLocaleString('id-ID')}
                </span>
                <span style={{ color: '#64748b', fontSize: '11px', minWidth: '40px', textAlign: 'right' }}>
                  {item.percentage.toFixed(2).replace('.', ',')}%
                </span>
              </div>
            </div>

            {/* Progress track */}
            <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${Math.max(item.percentage, 2)}%`,
                  height: '100%',
                  backgroundColor: '#0284c7',
                  borderRadius: '9999px',
                  transition: 'width 0.5s ease-in-out'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <button
        onClick={onManageWorkspace}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 0 0 0',
          background: 'none',
          border: 'none',
          color: '#2563eb',
          fontSize: '11.5px',
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: 'auto'
        }}
      >
        <span>Kelola Workspace</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
};
