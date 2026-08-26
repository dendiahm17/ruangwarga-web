import React, { useState } from 'react';
import type { MonitoringWilayahData } from '../../core/types/dashboard.types';
import { Plus, Minus, Home, Layers, ChevronRight, ChevronDown } from 'lucide-react';

interface MonitoringWilayahPanelProps {
  data: MonitoringWilayahData;
  onViewDetails?: () => void;
}

export const MonitoringWilayahPanel: React.FC<MonitoringWilayahPanelProps> = ({
  data,
  onViewDetails
}) => {
  const [tier, setTier] = useState(data.selectedTier);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const tiers = ['Provinsi', 'Kabupaten/Kota', 'Kecamatan', 'Desa/Kelurahan', 'RW', 'RT'];

  return (
    <div className="futuristic-card" style={{
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '260px'
    }}>
      {/* Top Controls Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        zIndex: 10
      }}>
        <div className="futuristic-card-title">
          MONITORING WILAYAH
        </div>

        {/* Tier Filter Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#0a1220',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '11px',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <span>Tingkat: <strong style={{ color: '#ffffff' }}>{tier}</strong></span>
            <ChevronDown size={12} />
          </button>

          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '100%',
              marginTop: '4px',
              backgroundColor: '#0a1220',
              border: '1px solid #1e293b',
              borderRadius: '6px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              zIndex: 30,
              width: '140px',
              overflow: 'hidden'
            }}>
              {tiers.map((t) => (
                <div
                  key={t}
                  onClick={() => {
                    setTier(t as any);
                    setDropdownOpen(false);
                  }}
                  style={{
                    padding: '6px 10px',
                    fontSize: '11px',
                    color: tier === t ? '#00e5ff' : '#94a3b8',
                    backgroundColor: tier === t ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Map Navigation Toolset (Left Side) */}
      <div style={{
        position: 'absolute',
        top: '52px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        zIndex: 10
      }}>
        <button
          onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            backgroundColor: '#0a1220',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Zoom In"
        >
          <Plus size={12} />
        </button>
        <button
          onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            backgroundColor: '#0a1220',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Zoom Out"
        >
          <Minus size={12} />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            backgroundColor: '#0a1220',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Reset Zoom"
        >
          <Home size={11} />
        </button>
        <button
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            backgroundColor: '#0a1220',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Layer Map"
        >
          <Layers size={11} />
        </button>
      </div>

      {/* Futuristic Geospatial SVG Map Canvas */}
      <div style={{
        flex: 1,
        minHeight: '170px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <svg
          viewBox="0 0 820 280"
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.25s ease-out'
          }}
        >
          {/* Geospatial grid background */}
          <defs>
            <pattern id="geo-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="820" height="280" fill="url(#geo-grid)" />

          {/* Holographic Glowing Archipelagos */}
          <g>
            {/* Sumatra */}
            <path
              d="M 70 60 L 120 100 L 180 160 L 230 220 L 210 235 L 150 170 L 90 100 Z"
              fill="rgba(0, 229, 255, 0.04)"
              stroke="#00e5ff"
              strokeWidth="1.2"
              filter="drop-shadow(0 0 4px rgba(0, 229, 255, 0.3))"
            />
            {/* Sumatra Nodes */}
            <circle cx="110" cy="90" r="5" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="110" cy="90" r="2.5" fill="#10b981" />
            <circle cx="160" cy="140" r="5" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="160" cy="140" r="2.5" fill="#10b981" />
            <circle cx="200" cy="195" r="5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="200" cy="195" r="2.5" fill="#f59e0b" />

            {/* Java */}
            <path
              d="M 210 245 L 350 250 L 390 260 L 350 270 L 220 265 Z"
              fill="rgba(0, 229, 255, 0.06)"
              stroke="#00e5ff"
              strokeWidth="1.2"
              filter="drop-shadow(0 0 4px rgba(0, 229, 255, 0.3))"
            />
            {/* Java Nodes */}
            <circle cx="240" cy="255" r="5" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="240" cy="255" r="2.5" fill="#10b981" />
            <circle cx="290" cy="256" r="6" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <circle cx="290" cy="256" r="3" fill="#ef4444" />
            <circle cx="350" cy="260" r="5" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="350" cy="260" r="2.5" fill="#10b981" />

            {/* Kalimantan */}
            <path
              d="M 280 80 L 360 70 L 400 130 L 370 200 L 290 190 L 260 130 Z"
              fill="rgba(0, 229, 255, 0.04)"
              stroke="#00e5ff"
              strokeWidth="1.2"
              filter="drop-shadow(0 0 4px rgba(0, 229, 255, 0.3))"
            />
            {/* Kalimantan Nodes */}
            <circle cx="320" cy="120" r="5" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="320" cy="120" r="2.5" fill="#10b981" />
            <circle cx="360" cy="150" r="5" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="360" cy="150" r="2.5" fill="#10b981" />

            {/* Sulawesi */}
            <path
              d="M 430 90 L 470 90 L 490 110 L 460 140 L 470 200 L 440 210 L 430 150 Z"
              fill="rgba(0, 229, 255, 0.04)"
              stroke="#00e5ff"
              strokeWidth="1.2"
              filter="drop-shadow(0 0 4px rgba(0, 229, 255, 0.3))"
            />
            {/* Sulawesi Nodes */}
            <circle cx="450" cy="120" r="5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="450" cy="120" r="2.5" fill="#f59e0b" />
            <circle cx="460" cy="170" r="5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="460" cy="170" r="2.5" fill="#f59e0b" />

            {/* Bali & Nusa Tenggara */}
            <path
              d="M 400 265 L 440 265 L 480 270 L 530 270 L 510 280 L 410 275 Z"
              fill="rgba(0, 229, 255, 0.04)"
              stroke="#00e5ff"
              strokeWidth="1"
            />
            <circle cx="420" cy="270" r="4" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="420" cy="270" r="2" fill="#10b981" />
            <circle cx="470" cy="272" r="5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="470" cy="272" r="2.5" fill="#f59e0b" />
            <circle cx="510" cy="275" r="5" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <circle cx="510" cy="275" r="2.5" fill="#ef4444" />

            {/* Maluku */}
            <path
              d="M 520 100 L 550 110 L 570 170 L 530 190 Z"
              fill="rgba(0, 229, 255, 0.04)"
              stroke="#00e5ff"
              strokeWidth="1"
            />
            <circle cx="540" cy="130" r="5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="540" cy="130" r="2.5" fill="#f59e0b" />

            {/* Papua */}
            <path
              d="M 590 120 L 670 100 L 760 130 L 760 240 L 680 250 L 620 190 Z"
              fill="rgba(0, 229, 255, 0.05)"
              stroke="#00e5ff"
              strokeWidth="1.2"
              filter="drop-shadow(0 0 4px rgba(0, 229, 255, 0.3))"
            />
            {/* Papua Nodes */}
            <circle cx="640" cy="150" r="6" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="640" cy="150" r="3" fill="#10b981" />
            <circle cx="710" cy="180" r="7" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <circle cx="710" cy="180" r="3.5" fill="#ef4444" />
          </g>
        </svg>
      </div>

      {/* Bottom Status Legend & Action Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '6px',
        paddingTop: '8px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        zIndex: 10
      }}>
        {/* Status Wilayah counters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '10.5px' }}>
          <span style={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', fontSize: '9px', letterSpacing: '0.04em' }}>
            STATUS WILAYAH
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 6px #10b981' }} />
            <span style={{ color: '#94a3b8' }}>Aman</span>
            <strong style={{ color: '#ffffff' }}>{data.statusCount.aman.count} {data.statusCount.aman.label}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b', boxShadow: '0 0 6px #f59e0b' }} />
            <span style={{ color: '#94a3b8' }}>Perhatian</span>
            <strong style={{ color: '#ffffff' }}>{data.statusCount.perhatian.count} {data.statusCount.perhatian.label}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 6px #ef4444' }} />
            <span style={{ color: '#94a3b8' }}>Kritis</span>
            <strong style={{ color: '#ffffff' }}>{data.statusCount.kritis.count} {data.statusCount.kritis.label}</strong>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={onViewDetails}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(0, 229, 255, 0.1)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            borderRadius: '6px',
            padding: '5px 12px',
            fontSize: '11px',
            fontWeight: 700,
            color: '#38bdf8',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.2)';
            e.currentTarget.style.borderColor = '#00e5ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.3)';
          }}
        >
          <span>Lihat Detail Wilayah</span>
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
};
