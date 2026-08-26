import React from 'react';
import { PriorityRegion } from '../../core/types/dashboard.types';
import { Eye, ChevronRight } from 'lucide-react';

interface PriorityRegionsTableProps {
  regions: PriorityRegion[];
  onViewAll?: () => void;
}

export const PriorityRegionsTable: React.FC<PriorityRegionsTableProps> = ({ regions, onViewAll }) => {
  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em', marginBottom: '12px' }}>
        10 WILAYAH DENGAN PERHATIAN KHUSUS
      </div>

      {/* Table Container */}
      <div style={{ overflowX: 'auto', flex: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
          <thead>
            <tr style={{ color: '#64748b', borderBottom: '1px solid #f1f5f9', textAlign: 'left' }}>
              <th style={{ padding: '6px 8px', fontWeight: 600 }}>Wilayah</th>
              <th style={{ padding: '6px 8px', fontWeight: 600 }}>Tingkat</th>
              <th style={{ padding: '6px 8px', fontWeight: 600 }}>Indikator Utama</th>
              <th style={{ padding: '6px 8px', fontWeight: 600 }}>Kondisi</th>
              <th style={{ padding: '6px 8px', fontWeight: 600, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((region) => {
              const isUrgent = region.status === 'Perlu Penanganan';
              return (
                <tr key={region.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                  {/* Wilayah with rank badge */}
                  <td style={{ padding: '7px 8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {region.rank}
                      </span>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>
                        {region.name}
                      </span>
                    </div>
                  </td>

                  {/* Level */}
                  <td style={{ padding: '7px 8px', color: '#64748b' }}>
                    {region.levelName}
                  </td>

                  {/* Metric */}
                  <td style={{ padding: '7px 8px' }}>
                    <span style={{ color: '#64748b' }}>{region.metricLabel}</span>{' '}
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{region.metricValue}</span>
                  </td>

                  {/* Status Badge */}
                  <td style={{ padding: '7px 8px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      backgroundColor: isUrgent ? '#fef2f2' : '#fffbeb',
                      color: isUrgent ? '#b91c1c' : '#b45309',
                      border: `1px solid ${isUrgent ? '#fecaca' : '#fde68a'}`
                    }}>
                      {region.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td style={{ padding: '7px 8px', textAlign: 'center' }}>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#0284c7'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer link */}
      <button
        onClick={onViewAll}
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
        <span>Lihat Semua Wilayah</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
};
