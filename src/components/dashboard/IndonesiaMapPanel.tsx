import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, Info } from 'lucide-react';

export const IndonesiaMapPanel: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 1.8));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Title Header with clean badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <div className="panel-title">
            <span>Peta Kondisi Wilayah</span>
          </div>
          <div className="panel-subtitle">
            Status kondisi wilayah berdasarkan partisipasi & respons
          </div>
        </div>

        {/* Zoom Controls placed neatly on top right */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backgroundColor: '#f8fafc',
          padding: '3px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <button
            onClick={handleZoomIn}
            title="Perbesar"
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <Plus size={13} color="#334155" strokeWidth={2.2} />
          </button>
          <button
            onClick={handleZoomOut}
            title="Perkecil"
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <Minus size={13} color="#334155" strokeWidth={2.2} />
          </button>
          <button
            onClick={handleResetZoom}
            title="Reset Ukuran"
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <RotateCcw size={12} color="#334155" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* SVG Map Canvas with refined archipelago shapes */}
      <div style={{
        flex: 1,
        minHeight: '160px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#fafbfc',
        borderRadius: '8px',
        border: '1px solid #f1f5f9'
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
          {/* Subtle ocean grid */}
          <defs>
            <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="800" height="320" fill="url(#map-grid)" />

          <g>
            {/* Sumatra */}
            <path
              d="M 60 70 L 110 110 L 170 170 L 220 230 L 200 245 L 140 180 L 80 110 Z"
              fill="#dcfce7"
              stroke="#16a34a"
              strokeWidth="1.5"
            />
            {/* Pulsing points Sumatra */}
            <circle cx="100" cy="100" r="7" fill="#10b981" fillOpacity="0.3" />
            <circle cx="100" cy="100" r="3.5" fill="#059669" />
            <circle cx="150" cy="150" r="8" fill="#10b981" fillOpacity="0.3" />
            <circle cx="150" cy="150" r="4" fill="#059669" />
            <circle cx="190" cy="205" r="7" fill="#f59e0b" fillOpacity="0.3" />
            <circle cx="190" cy="205" r="3.5" fill="#d97706" />

            {/* Java */}
            <path
              d="M 200 255 L 340 260 L 380 270 L 340 280 L 210 275 Z"
              fill="#dbeafe"
              stroke="#2563eb"
              strokeWidth="1.5"
            />
            {/* Points Java */}
            <circle cx="230" cy="265" r="6" fill="#10b981" fillOpacity="0.3" />
            <circle cx="230" cy="265" r="3" fill="#059669" />
            <circle cx="280" cy="266" r="8" fill="#3b82f6" fillOpacity="0.3" />
            <circle cx="280" cy="266" r="4" fill="#2563eb" />
            <circle cx="340" cy="270" r="6" fill="#10b981" fillOpacity="0.3" />
            <circle cx="340" cy="270" r="3" fill="#059669" />

            {/* Kalimantan */}
            <path
              d="M 270 90 L 350 80 L 390 140 L 360 210 L 280 200 L 250 140 Z"
              fill="#dcfce7"
              stroke="#16a34a"
              strokeWidth="1.5"
            />
            <circle cx="310" cy="130" r="9" fill="#10b981" fillOpacity="0.3" />
            <circle cx="310" cy="130" r="4" fill="#059669" />
            <circle cx="350" cy="160" r="7" fill="#10b981" fillOpacity="0.3" />
            <circle cx="350" cy="160" r="3.5" fill="#059669" />

            {/* Sulawesi */}
            <path
              d="M 420 100 L 460 100 L 480 120 L 450 150 L 460 210 L 430 220 L 420 160 Z"
              fill="#fef3c7"
              stroke="#d97706"
              strokeWidth="1.5"
            />
            <circle cx="440" cy="130" r="7" fill="#f59e0b" fillOpacity="0.3" />
            <circle cx="440" cy="130" r="3.5" fill="#d97706" />
            <circle cx="450" cy="180" r="7" fill="#f59e0b" fillOpacity="0.3" />
            <circle cx="450" cy="180" r="3.5" fill="#d97706" />

            {/* Bali & Nusa Tenggara */}
            <path
              d="M 390 275 L 430 275 L 470 280 L 520 280 L 500 290 L 400 285 Z"
              fill="#fef3c7"
              stroke="#d97706"
              strokeWidth="1.2"
            />
            <circle cx="410" cy="280" r="5" fill="#10b981" fillOpacity="0.3" />
            <circle cx="410" cy="280" r="2.5" fill="#059669" />
            <circle cx="460" cy="282" r="5" fill="#f59e0b" fillOpacity="0.3" />
            <circle cx="460" cy="282" r="2.5" fill="#d97706" />
            <circle cx="500" cy="285" r="6" fill="#ef4444" fillOpacity="0.3" />
            <circle cx="500" cy="285" r="3" fill="#dc2626" />

            {/* Maluku */}
            <path
              d="M 510 110 L 540 120 L 560 180 L 520 200 Z"
              fill="#ffedd5"
              stroke="#ea580c"
              strokeWidth="1.2"
            />
            <circle cx="530" cy="140" r="6" fill="#f97316" fillOpacity="0.3" />
            <circle cx="530" cy="140" r="3" fill="#ea580c" />

            {/* Papua */}
            <path
              d="M 580 130 L 660 110 L 750 140 L 750 250 L 670 260 L 610 200 Z"
              fill="#fee2e2"
              stroke="#dc2626"
              strokeWidth="1.5"
            />
            <circle cx="630" cy="160" r="8" fill="#f59e0b" fillOpacity="0.3" />
            <circle cx="630" cy="160" r="4" fill="#d97706" />
            <circle cx="700" cy="190" r="10" fill="#ef4444" fillOpacity="0.3" />
            <circle cx="700" cy="190" r="4.5" fill="#dc2626" />
          </g>
        </svg>
      </div>

      {/* Legend Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        paddingTop: '10px',
        marginTop: '6px',
        borderTop: '1px solid #f1f5f9',
        fontSize: '11px',
        color: '#475569'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
          <span>Baik <strong style={{ color: '#0f172a' }}>1.234</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
          <span>Perhatian <strong style={{ color: '#0f172a' }}>523</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <span>Penanganan <strong style={{ color: '#0f172a' }}>87</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#94a3b8' }} />
          <span>N/A <strong style={{ color: '#0f172a' }}>12</strong></span>
        </div>
      </div>
    </div>
  );
};
