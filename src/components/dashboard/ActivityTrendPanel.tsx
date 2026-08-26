import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ActivityTrendPanel: React.FC = () => {
  const [filter, setFilter] = useState('30 Hari Terakhir');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>
          TREND AKTIVITAS NASIONAL
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
              fontWeight: 500,
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
      <div style={{ flex: 1, minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <svg viewBox="0 0 400 140" style={{ width: '100%', height: '100%' }}>
          {/* Grid lines */}
          <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="40" y1="55" x2="380" y2="55" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="40" y1="90" x2="380" y2="90" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="40" y1="125" x2="380" y2="125" stroke="#e2e8f0" />

          {/* Y Axis Labels */}
          <text x="32" y="24" fontSize="9" fill="#94a3b8" textAnchor="end">30k</text>
          <text x="32" y="59" fontSize="9" fill="#94a3b8" textAnchor="end">20k</text>
          <text x="32" y="94" fontSize="9" fill="#94a3b8" textAnchor="end">10k</text>
          <text x="32" y="128" fontSize="9" fill="#94a3b8" textAnchor="end">0</text>

          {/* Line 1: Kegiatan (Green) */}
          <path
            d="M 50 50 Q 90 35 130 55 T 210 38 T 290 48 T 370 32"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
          />
          {/* Green points */}
          <circle cx="50" cy="50" r="3.5" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
          <circle cx="130" cy="55" r="3.5" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
          <circle cx="210" cy="38" r="3.5" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
          <circle cx="290" cy="48" r="3.5" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
          <circle cx="370" cy="32" r="3.5" fill="#ffffff" stroke="#10b981" strokeWidth="2" />

          {/* Line 2: Laporan (Blue) */}
          <path
            d="M 50 82 Q 90 70 130 88 T 210 75 T 290 82 T 370 68"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.2"
          />
          {/* Blue points */}
          <circle cx="50" cy="82" r="3" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.8" />
          <circle cx="130" cy="88" r="3" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.8" />
          <circle cx="210" cy="75" r="3" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.8" />
          <circle cx="290" cy="82" r="3" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.8" />
          <circle cx="370" cy="68" r="3" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.8" />

          {/* Line 3: Partisipasi (Purple) */}
          <path
            d="M 50 110 Q 90 102 130 114 T 210 105 T 290 110 T 370 98"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
          />
          <circle cx="50" cy="110" r="2.5" fill="#ffffff" stroke="#8b5cf6" strokeWidth="1.5" />
          <circle cx="130" cy="114" r="2.5" fill="#ffffff" stroke="#8b5cf6" strokeWidth="1.5" />
          <circle cx="210" cy="105" r="2.5" fill="#ffffff" stroke="#8b5cf6" strokeWidth="1.5" />
          <circle cx="290" cy="110" r="2.5" fill="#ffffff" stroke="#8b5cf6" strokeWidth="1.5" />
          <circle cx="370" cy="98" r="2.5" fill="#ffffff" stroke="#8b5cf6" strokeWidth="1.5" />

          {/* X Axis Dates */}
          <text x="50" y="136" fontSize="9" fill="#94a3b8" textAnchor="middle">27 Jul</text>
          <text x="130" y="136" fontSize="9" fill="#94a3b8" textAnchor="middle">3 Ags</text>
          <text x="210" y="136" fontSize="9" fill="#94a3b8" textAnchor="middle">10 Ags</text>
          <text x="290" y="136" fontSize="9" fill="#94a3b8" textAnchor="middle">17 Ags</text>
          <text x="370" y="136" fontSize="9" fill="#94a3b8" textAnchor="middle">24 Ags</text>
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
        fontSize: '11px',
        color: '#475569'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
          <span>Kegiatan</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
          <span>Laporan</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6' }} />
          <span>Partisipasi</span>
        </div>
      </div>
    </div>
  );
};
