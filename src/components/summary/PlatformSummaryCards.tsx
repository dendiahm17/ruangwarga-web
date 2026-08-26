import React from 'react';
import type { PlatformSummaryMetrics } from '../../core/types/dashboard.types';
import { Users, Activity, CheckCircle2 } from 'lucide-react';

interface PlatformSummaryCardsProps {
  metrics: PlatformSummaryMetrics;
}

export const PlatformSummaryCards: React.FC<PlatformSummaryCardsProps> = ({ metrics }) => {
  return (
    <div className="futuristic-card" style={{ padding: '16px 20px', minHeight: '140px' }}>
      {/* Title */}
      <div className="futuristic-card-title" style={{ marginBottom: '12px' }}>
        RINGKASAN KONDISI PLATFORM
      </div>

      {/* 4 Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px'
      }}>
        {/* Metric 1: Wilayah Aktif */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(56, 189, 248, 0.1)',
          borderRadius: '8px',
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>
              Wilayah Aktif
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginTop: '2px', lineHeight: 1.1 }}>
              {metrics.wilayahAktif.value}
            </div>
            <div style={{ fontSize: '9px', color: '#64748b', marginTop: '2px' }}>
              dari {metrics.wilayahAktif.total} Provinsi
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
            <span style={{
              fontSize: '9.5px',
              fontWeight: 700,
              color: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              padding: '1px 5px',
              borderRadius: '4px'
            }}>
              {metrics.wilayahAktif.percentage}%
            </span>
          </div>
        </div>

        {/* Metric 2: Pengguna Terdaftar */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(56, 189, 248, 0.1)',
          borderRadius: '8px',
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>
              Pengguna Terdaftar
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginTop: '2px', lineHeight: 1.1 }}>
              {metrics.penggunaTerdaftar.value}
            </div>
            <div style={{ fontSize: '9px', color: '#10b981', marginTop: '2px', fontWeight: 600 }}>
              {metrics.penggunaTerdaftar.change}
            </div>
          </div>

          {/* Mini Sparkline Graphic */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '6px' }}>
            <svg width="45" height="14" viewBox="0 0 45 14">
              <path d="M 2 12 Q 12 4 22 8 T 42 2" fill="none" stroke="#a855f7" strokeWidth="1.8" />
            </svg>
          </div>
        </div>

        {/* Metric 3: Aktivitas Hari Ini */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(56, 189, 248, 0.1)',
          borderRadius: '8px',
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>
              Aktivitas Hari Ini
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginTop: '2px', lineHeight: 1.1 }}>
              {metrics.aktivitasHariIni.value}
            </div>
            <div style={{ fontSize: '9px', color: '#10b981', marginTop: '2px', fontWeight: 600 }}>
              {metrics.aktivitasHariIni.change}
            </div>
          </div>

          {/* Mini Sparkline Graphic */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '6px' }}>
            <svg width="45" height="14" viewBox="0 0 45 14">
              <path d="M 2 10 Q 12 12 22 6 T 42 2" fill="none" stroke="#10b981" strokeWidth="1.8" />
            </svg>
          </div>
        </div>

        {/* Metric 4: Sistem Status */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(56, 189, 248, 0.1)',
          borderRadius: '8px',
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>
              Sistem Status
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#10b981', marginTop: '2px', lineHeight: 1.1 }}>
              {metrics.sistemStatus.status}
            </div>
            <div style={{ fontSize: '9px', color: '#64748b', marginTop: '2px' }}>
              {metrics.sistemStatus.subtitle}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
            <CheckCircle2 size={13} color="#10b981" />
          </div>
        </div>
      </div>
    </div>
  );
};
