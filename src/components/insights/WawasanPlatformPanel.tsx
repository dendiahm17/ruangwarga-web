import React from 'react';
import type { PlatformInsightsData } from '../../core/types/dashboard.types';
import { Star } from 'lucide-react';

interface WawasanPlatformPanelProps {
  insights: PlatformInsightsData;
}

export const WawasanPlatformPanel: React.FC<WawasanPlatformPanelProps> = ({ insights }) => {
  return (
    <div className="futuristic-card" style={{ padding: '16px 20px' }}>
      {/* Title */}
      <div className="futuristic-card-title" style={{ marginBottom: '12px' }}>
        WAWASAN PLATFORM
      </div>

      {/* 4 Insight Blocks */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px'
      }}>
        {/* Block 1: Pertumbuhan Pengguna */}
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
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
              Pertumbuhan Pengguna
            </div>
            <div style={{ fontSize: '9px', color: '#64748b', marginTop: '1px' }}>
              30 Hari Terakhir
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#10b981', marginTop: '6px' }}>
              {insights.pertumbuhanPengguna.value}
            </div>
            <div style={{ fontSize: '9px', color: '#64748b' }}>
              {insights.pertumbuhanPengguna.period}
            </div>
          </div>

          {/* Mini Sparkline Line */}
          <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end' }}>
            <svg width="60" height="18" viewBox="0 0 60 18">
              <path
                d="M 2 14 Q 15 4 25 10 T 45 4 T 58 2"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Block 2: Partisipasi Warga */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(56, 189, 248, 0.1)',
          borderRadius: '8px',
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
              Partisipasi Warga
            </div>
            <div style={{ fontSize: '9px', color: '#64748b', marginTop: '1px' }}>
              {insights.partisipasiWarga.subtitle}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
              {insights.partisipasiWarga.percentage.toFixed(1).replace('.', ',')}%
            </div>
            <div style={{ fontSize: '9px', color: '#10b981', fontWeight: 600 }}>
              {insights.partisipasiWarga.change}
            </div>
          </div>

          {/* Donut / Ring Progress */}
          <div style={{ width: '42px', height: '42px', position: 'relative' }}>
            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeDasharray="88"
                strokeDashoffset={88 - (88 * insights.partisipasiWarga.percentage) / 100}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Block 3: Laporan Selesai */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(56, 189, 248, 0.1)',
          borderRadius: '8px',
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
              Laporan Selesai
            </div>
            <div style={{ fontSize: '9px', color: '#64748b', marginTop: '1px' }}>
              Bulan Ini
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
              {insights.laporanSelesai.count}
            </div>
            <div style={{ fontSize: '9px', color: '#10b981', fontWeight: 600 }}>
              {insights.laporanSelesai.change}
            </div>
          </div>

          {/* Ring Progress Cyan */}
          <div style={{ width: '42px', height: '42px', position: 'relative' }}>
            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="3"
                strokeDasharray="88"
                strokeDashoffset={88 - (88 * insights.laporanSelesai.percentage) / 100}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Block 4: Kepuasan Warga */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(56, 189, 248, 0.1)',
          borderRadius: '8px',
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
              Kepuasan Warga
            </div>
            <div style={{ fontSize: '9px', color: '#64748b', marginTop: '1px' }}>
              Rata-rata Nasional
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
              {insights.kepuasanWarga.rating} <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>{insights.kepuasanWarga.max}</span>
            </div>
            <div style={{ fontSize: '9px', color: '#10b981', fontWeight: 600 }}>
              {insights.kepuasanWarga.change}
            </div>
          </div>

          {/* Golden Badge Rating */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            border: '1.5px solid #f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(245, 158, 11, 0.25)'
          }}>
            <Star size={18} color="#f59e0b" fill="#f59e0b" />
          </div>
        </div>
      </div>
    </div>
  );
};
