import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ActivityTrendPanel: React.FC = () => {
  const [filter, setFilter] = useState('30 Hari Terakhir');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div>
          <div className="panel-title">
            <span>Trend Aktivitas</span>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              fontSize: '11px',
              color: '#334155',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <span>{filter}</span>
            <ChevronDown size={12} color="#64748b" />
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
              width: '130px'
            }}>
              {['7 Hari Terakhir', '30 Hari Terakhir', '90 Hari Terakhir'].map((t) => (
                <div
                  key={t}
                  onClick={() => {
                    setFilter(t);
                    setDropdownOpen(false);
                  }}
                  style={{
                    padding: '5px 8px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    backgroundColor: filter === t ? '#f1f5f9' : 'transparent',
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

      {/* SVG Chart Graphic */}
      <div style={{ flex: 1, minHeight: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <svg viewBox="0 0 400 135" style={{ width: '100%', height: '100%' }}>
          {/* Subtle Grid lines */}
          <line x1="36" y1="20" x2="385" y2="20" stroke="#f8fafc" strokeDasharray="3 3" />
          <line x1="36" y1="55" x2="385" y2="55" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="36" y1="90" x2="385" y2="90" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="36" y1="120" x2="385" y2="120" stroke="#e2e8f0" />

          {/* Y Axis Labels */}
          <text x="30" y="24" fontSize="8.5" fill="#94a3b8" textAnchor="end">30k</text>
          <text x="30" y="59" fontSize="8.5" fill="#94a3b8" textAnchor="end">20k</text>
          <text x="30" y="94" fontSize="8.5" fill="#94a3b8" textAnchor="end">10k</text>
          <text x="30" y="123" fontSize="8.5" fill="#94a3b8" textAnchor="end">0</text>

          {/* Smooth area gradient below green line */}
          <defs>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M 50 48 Q 90 32 130 52 T 210 36 T 290 46 T 370 30 L 370 120 L 50 120 Z"
            fill="url(#greenGrad)"
          />

          {/* Line 1: Kegiatan (Green) */}
          <path
            d="M 50 48 Q 90 32 130 52 T 210 36 T 290 46 T 370 30"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.2"
          />
          <circle cx="50" cy="48" r="3" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
          <circle cx="130" cy="52" r="3" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
          <circle cx="210" cy="36" r="3" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
          <circle cx="290" cy="46" r="3" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
          <circle cx="370" cy="30" r="3" fill="#ffffff" stroke="#10b981" strokeWidth="2" />

          {/* Line 2: Laporan (Blue) */}
          <path
            d="M 50 80 Q 90 68 130 86 T 210 72 T 290 80 T 370 65"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <circle cx="50" cy="80" r="2.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.8" />
          <circle cx="130" cy="86" r="2.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.8" />
          <circle cx="210" cy="72" r="2.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.8" />
          <circle cx="290" cy="80" r="2.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.8" />
          <circle cx="370" cy="65" r="2.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.8" />

          {/* X Axis Dates */}
          <text x="50" y="132" fontSize="8.5" fill="#94a3b8" textAnchor="middle">27 Jul</text>
          <text x="130" y="132" fontSize="8.5" fill="#94a3b8" textAnchor="middle">3 Ags</text>
          <text x="210" y="132" fontSize="8.5" fill="#94a3b8" textAnchor="middle">10 Ags</text>
          <text x="290" y="132" fontSize="8.5" fill="#94a3b8" textAnchor="middle">17 Ags</text>
          <text x="370" y="132" fontSize="8.5" fill="#94a3b8" textAnchor="middle">24 Ags</text>
        </svg>
      </div>

      {/* Chart Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        paddingTop: '6px',
        borderTop: '1px solid #f1f5f9',
        fontSize: '10.5px',
        color: '#475569'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981' }} />
          <span>Kegiatan</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
          <span>Laporan Warga</span>
        </div>
      </div>
    </div>
  );
};
