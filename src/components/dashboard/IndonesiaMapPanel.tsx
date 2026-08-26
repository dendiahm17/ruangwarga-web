import React, { useState } from 'react';
import { Plus, Minus, Maximize2 } from 'lucide-react';

export const IndonesiaMapPanel: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 1.8));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>
            PETA KONDISI WILAYAH
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
            Status kondisi wilayah berdasarkan tingkat partisipasi dan respons
          </div>
        </div>

        {/* Zoom Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', position: 'absolute', top: '16px', left: '16px', zIndex: 10 }}>
          <button
            onClick={handleZoomIn}
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <Plus size={14} color="#334155" />
          </button>
          <button
            onClick={handleZoomOut}
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <Minus size={14} color="#334155" />
          </button>
          <button
            onClick={handleResetZoom}
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <Maximize2 size={13} color="#334155" />
          </button>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div style={{
        flex: 1,
        minHeight: '175px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <svg
          viewBox="0 0 800 320"
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.25s ease-out'
          }}
        >
          <g>
            {/* Sumatra */}
            <path
              d="M 60 70 L 110 110 L 170 170 L 220 230 L 200 245 L 140 180 L 80 110 Z"
              fill="#22c55e"
              opacity="0.9"
              stroke="#15803d"
              strokeWidth="1.5"
            />
            <circle cx="100" cy="100" r="14" fill="#16a34a" />
            <circle cx="150" cy="150" r="16" fill="#22c55e" />
            <circle cx="190" cy="205" r="15" fill="#eab308" />

            {/* Java */}
            <path
              d="M 200 255 L 340 260 L 380 270 L 340 280 L 210 275 Z"
              fill="#3b82f6"
              opacity="0.85"
              stroke="#1d4ed8"
              strokeWidth="1.5"
            />
            <circle cx="230" cy="265" r="12" fill="#22c55e" />
            <circle cx="280" cy="266" r="14" fill="#3b82f6" />
            <circle cx="340" cy="270" r="12" fill="#22c55e" />

            {/* Kalimantan */}
            <path
              d="M 270 90 L 350 80 L 390 140 L 360 210 L 280 200 L 250 140 Z"
              fill="#22c55e"
              opacity="0.85"
              stroke="#166534"
              strokeWidth="1.5"
            />
            <circle cx="310" cy="130" r="18" fill="#16a34a" />
            <circle cx="350" cy="160" r="15" fill="#22c55e" />

            {/* Sulawesi */}
            <path
              d="M 420 100 L 460 100 L 480 120 L 450 150 L 460 210 L 430 220 L 420 160 Z"
              fill="#eab308"
              opacity="0.9"
              stroke="#ca8a04"
              strokeWidth="1.5"
            />
            <circle cx="440" cy="130" r="14" fill="#eab308" />
            <circle cx="450" cy="180" r="12" fill="#f97316" />

            {/* Bali & Nusa Tenggara */}
            <path
              d="M 390 275 L 430 275 L 470 280 L 520 280 L 500 290 L 400 285 Z"
              fill="#eab308"
              opacity="0.85"
              stroke="#b45309"
              strokeWidth="1"
            />
            <circle cx="410" cy="280" r="8" fill="#22c55e" />
            <circle cx="460" cy="282" r="9" fill="#f97316" />
            <circle cx="500" cy="285" r="10" fill="#ef4444" />

            {/* Maluku */}
            <path
              d="M 510 110 L 540 120 L 560 180 L 520 200 Z"
              fill="#f97316"
              opacity="0.8"
              stroke="#c2410c"
              strokeWidth="1"
            />
            <circle cx="530" cy="140" r="10" fill="#f97316" />

            {/* Papua */}
            <path
              d="M 580 130 L 660 110 L 750 140 L 750 250 L 670 260 L 610 200 Z"
              fill="#ef4444"
              opacity="0.85"
              stroke="#b91c1c"
              strokeWidth="1.5"
            />
            <circle cx="630" cy="160" r="18" fill="#eab308" />
            <circle cx="700" cy="190" r="22" fill="#ef4444" />
          </g>
        </svg>
      </div>

      {/* Legend Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '18px',
        paddingTop: '8px',
        borderTop: '1px solid #f1f5f9',
        fontSize: '11px',
        color: '#475569'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#22c55e' }} />
          <span>Baik (1.234)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#eab308' }} />
          <span>Perlu Perhatian (523)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#ef4444' }} />
          <span>Perlu Penanganan (87)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#94a3b8' }} />
          <span>Data Tidak Tersedia (12)</span>
        </div>
      </div>
    </div>
  );
};
