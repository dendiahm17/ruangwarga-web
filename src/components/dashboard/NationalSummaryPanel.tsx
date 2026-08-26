import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Activity, 
  FileText, 
  CheckCircle, 
  Flag,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown
} from 'lucide-react';
import { DashboardMetrics } from '../../core/types/dashboard.types';

interface NationalSummaryPanelProps {
  metrics: DashboardMetrics;
}

export const NationalSummaryPanel: React.FC<NationalSummaryPanelProps> = ({ metrics }) => {
  const [timeRange, setTimeRange] = useState('30 Hari Terakhir');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cards = [
    {
      title: 'Total Workspace',
      value: metrics.totalWorkspace.value,
      change: metrics.totalWorkspace.change,
      isPositive: metrics.totalWorkspace.isPositive,
      icon: Building2,
      color: '#0284c7',
      bg: '#e0f2fe'
    },
    {
      title: 'Total Warga Aktif',
      value: metrics.totalWargaAktif.value,
      change: metrics.totalWargaAktif.change,
      isPositive: metrics.totalWargaAktif.isPositive,
      icon: Users,
      color: '#7c3aed',
      bg: '#ede9fe'
    },
    {
      title: 'Aktivitas',
      value: metrics.totalAktivitas.value,
      change: metrics.totalAktivitas.change,
      isPositive: metrics.totalAktivitas.isPositive,
      icon: Activity,
      color: '#ea580c',
      bg: '#ffedd5'
    },
    {
      title: 'Laporan Masuk',
      value: metrics.laporanMasuk.value,
      change: metrics.laporanMasuk.change,
      isPositive: metrics.laporanMasuk.isPositive,
      icon: FileText,
      color: '#dc2626',
      bg: '#fee2e2'
    },
    {
      title: 'Tingkat Respons',
      value: metrics.tingkatRespons.value,
      change: metrics.tingkatRespons.change,
      isPositive: metrics.tingkatRespons.isPositive,
      icon: CheckCircle,
      color: '#16a34a',
      bg: '#dcfce7'
    },
    {
      title: 'Kegiatan Selesai',
      value: metrics.kegiatanSelesai.value,
      change: metrics.kegiatanSelesai.change,
      isPositive: metrics.kegiatanSelesai.isPositive,
      icon: Flag,
      color: '#9333ea',
      bg: '#f3e8ff'
    }
  ];

  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>
          RINGKASAN NASIONAL
        </div>

        {/* Time Filter Pill */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              fontSize: '11.5px',
              color: '#334155',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            <span>{timeRange}</span>
            <ChevronDown size={13} color="#64748b" />
          </button>
          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '100%',
              marginTop: '4px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 20,
              width: '140px',
              overflow: 'hidden'
            }}>
              {['7 Hari Terakhir', '30 Hari Terakhir', '90 Hari Terakhir', '1 Tahun Terakhir'].map((t) => (
                <div
                  key={t}
                  onClick={() => {
                    setTimeRange(t);
                    setDropdownOpen(false);
                  }}
                  style={{
                    padding: '6px 10px',
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    backgroundColor: timeRange === t ? '#f1f5f9' : 'transparent',
                    color: '#1e293b'
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2x3 Grid Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '12px',
        flex: 1
      }}>
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #edf2f7',
                borderRadius: '8px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: card.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={20} color={card.color} strokeWidth={2} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {card.title}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginTop: '2px', lineHeight: 1.1 }}>
                  {card.value}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  color: card.isPositive ? '#16a34a' : '#16a34a',
                  marginTop: '3px'
                }}>
                  <ArrowUpRight size={12} />
                  <span>{card.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
