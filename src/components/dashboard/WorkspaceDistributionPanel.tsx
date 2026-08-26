import React, { useState } from 'react';
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
      <div style={{ marginBottom: '12px' }}>
        <div className="panel-title">
          <span>Distribusi Workspace</span>
        </div>
        <div className="panel-subtitle">
          Proporsi persebaran workspace per level wilayah
        </div>
      </div>

      {/* Distribution list with progress bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
          <span>Tingkat</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Total</span>
            <span style={{ minWidth: '36px', textAlign: 'right' }}>%</span>
          </div>
        </div>

        {distributions.map((item) => (
          <div key={item.level} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
              <span style={{ color: '#334155', fontWeight: 600 }}>{item.level}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontWeight: 700, color: '#0f172a', minWidth: '45px', textAlign: 'right' }}>
                  {item.count.toLocaleString('id-ID')}
                </span>
                <span style={{ color: '#64748b', fontSize: '10.5px', minWidth: '36px', textAlign: 'right', fontWeight: 600 }}>
                  {item.percentage.toFixed(1).replace('.', ',')}%
                </span>
              </div>
            </div>

            {/* Modern capsule progress track */}
            <div style={{ width: '100%', height: '5px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${Math.max(item.percentage, 2)}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 100%)',
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
          color: '#0284c7',
          fontSize: '11.5px',
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: 'auto'
        }}
      >
        <span>Kelola Workspace</span>
        <ChevronRight size={13} />
      </button>
    </div>
  );
};
