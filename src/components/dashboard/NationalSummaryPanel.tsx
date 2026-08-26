import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Activity, 
  FileText, 
  CheckCircle, 
  Flag,
  ArrowUpRight,
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
      bg: '#f0f9ff',
      borderColor: '#e0f2fe'
    },
    {
      title: 'Total Warga Aktif',
      value: metrics.totalWargaAktif.value,
      change: metrics.totalWargaAktif.change,
      isPositive: metrics.totalWargaAktif.isPositive,
      icon: Users,
      color: '#7c3aed',
      bg: '#faf5ff',
      borderColor: '#f3e8ff'
    },
    {
      title: 'Aktivitas Tercatat',
      value: metrics.totalAktivitas.value,
      change: metrics.totalAktivitas.change,
      isPositive: metrics.totalAktivitas.isPositive,
      icon: Activity,
      color: '#ea580c',
      bg: '#fff7ed',
      borderColor: '#ffedd5'
    },
    {
      title: 'Laporan Masuk',
      value: metrics.laporanMasuk.value,
      change: metrics.laporanMasuk.change,
      isPositive: metrics.laporanMasuk.isPositive,
      icon: FileText,
      color: '#dc2626',
      bg: '#fef2f2',
      borderColor: '#fee2e2'
    },
    {
      title: 'Tingkat Respons',
      value: metrics.tingkatRespons.value,
      change: metrics.tingkatRespons.change,
      isPositive: metrics.tingkatRespons.isPositive,
      icon: CheckCircle,
      color: '#16a34a',
      bg: '#f0fdf4',
      borderColor: '#dcfce7'
    },
    {
      title: 'Kegiatan Selesai',
      value: metrics.kegiatanSelesai.value,
      change: metrics.kegiatanSelesai.change,
      isPositive: metrics.kegiatanSelesai.isPositive,
      icon: Flag,
      color: '#9333ea',
      bg: '#fdf4ff',
      borderColor: '#fae8ff'
    }
  ];

  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header with Time filter dropdown */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <div className="panel-title">
            <span>Ringkasan Nasional</span>
          </div>
          <div className="panel-subtitle">
            Agregasi performa dan metrik utama seluruh wilayah
          </div>
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
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              fontSize: '11.5px',
              color: '#334155',
              fontWeight: 600,
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
              borderRadius: '8px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
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
                    padding: '7px 10px',
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    backgroundColor: timeRange === t ? '#f1f5f9' : 'transparent',
                    color: '#1e293b',
                    fontWeight: timeRange === t ? 600 : 400
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
        gap: '10px',
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
                borderRadius: '10px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                transition: 'border-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#edf2f7'}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: card.bg,
                border: `1px solid ${card.borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={18} color={card.color} strokeWidth={2.2} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '10.5px',
                  color: '#64748b',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {card.title}
                </div>
                <div style={{ fontSize: '16.5px', fontWeight: 800, color: '#0f172a', marginTop: '1px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                  {card.value}
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '9.5px',
                  fontWeight: 700,
                  color: '#16a34a',
                  backgroundColor: '#f0fdf4',
                  padding: '1px 4px',
                  borderRadius: '4px',
                  marginTop: '3px'
                }}>
                  <ArrowUpRight size={11} />
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
