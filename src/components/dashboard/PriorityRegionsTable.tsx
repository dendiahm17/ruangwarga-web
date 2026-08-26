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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div className="panel-title">
          <span>10 Wilayah Perhatian Khusus</span>
        </div>
        <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>
          Berdasarkan KPI
        </span>
      </div>

      {/* Table Container */}
      <div style={{ overflowX: 'auto', flex: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
          <thead>
            <tr style={{ color: '#64748b', borderBottom: '1px solid #f1f5f9', textAlign: 'left' }}>
              <th style={{ padding: '6px 8px', fontWeight: 600 }}>#</th>
              <th style={{ padding: '6px 8px', fontWeight: 600 }}>Wilayah</th>
              <th style={{ padding: '6px 8px', fontWeight: 600 }}>Tingkat</th>
              <th style={{ padding: '6px 8px', fontWeight: 600 }}>Indikator Utama</th>
              <th style={{ padding: '6px 8px', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '6px 8px', fontWeight: 600, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((region) => {
              const isUrgent = region.status === 'Perlu Penanganan';
              return (
                <tr key={region.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                  {/* Rank */}
                  <td style={{ padding: '6px 8px', width: '28px' }}>
                    <span style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: region.rank <= 3 ? '#fee2e2' : '#f1f5f9',
                      color: region.rank <= 3 ? '#dc2626' : '#475569',
                      fontSize: '10px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {region.rank}
                    </span>
                  </td>

                  {/* Wilayah */}
                  <td style={{ padding: '6px 8px' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>
                      {region.name}
                    </span>
                  </td>

                  {/* Level */}
                  <td style={{ padding: '6px 8px', color: '#64748b', fontSize: '11px' }}>
                    {region.levelName}
                  </td>

                  {/* Metric */}
                  <td style={{ padding: '6px 8px' }}>
                    <span style={{ color: '#64748b', fontSize: '10.5px' }}>{region.metricLabel}</span>{' '}
                    <strong style={{ color: '#0f172a' }}>{region.metricValue}</strong>
                  </td>

                  {/* Status Badge */}
                  <td style={{ padding: '6px 8px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 700,
                      backgroundColor: isUrgent ? '#fef2f2' : '#fffbeb',
                      color: isUrgent ? '#b91c1c' : '#b45309',
                      border: `1px solid ${isUrgent ? '#fecaca' : '#fde68a'}`
                    }}>
                      {region.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                    <button
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#475569',
                        cursor: 'pointer',
                        padding: '3px 6px',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#0284c7';
                        e.currentTarget.style.borderColor = '#0284c7';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#475569';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                      }}
                    >
                      <Eye size={12} />
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
          color: '#0284c7',
          fontSize: '11.5px',
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: 'auto'
        }}
      >
        <span>Lihat Hierarki & Data Seluruh Wilayah</span>
        <ChevronRight size={13} />
      </button>
    </div>
  );
};
