import React from 'react';
import { useScope } from '../../context/ScopeContext';
import { RefreshCw, Globe, Layers } from 'lucide-react';

interface CurrentScopeCardProps {
  onOpenModal: () => void;
}

export const CurrentScopeCard: React.FC<CurrentScopeCardProps> = ({ onOpenModal }) => {
  const { currentScope } = useScope();

  return (
    <div className="futuristic-card" style={{
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '140px'
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '20px',
        width: '160px',
        height: '160px',
        background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Left Text Info */}
      <div style={{ zIndex: 2 }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 700,
          color: '#38bdf8',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '6px'
        }}>
          CURRENT SCOPE
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em'
          }}>
            {currentScope.name}
          </span>
          <span style={{
            fontSize: '9.5px',
            fontWeight: 700,
            color: '#00e5ff',
            backgroundColor: 'rgba(0, 229, 255, 0.12)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            padding: '2px 7px',
            borderRadius: '4px'
          }}>
            {currentScope.level === 'national' ? 'Nasional' : currentScope.level.toUpperCase()}
          </span>
        </div>

        <div style={{ fontSize: '10.5px', color: '#94a3b8', maxWidth: '240px', lineHeight: 1.35, marginBottom: '12px' }}>
          Platform Administrator<br />
          <span style={{ color: '#64748b' }}>Anda memiliki akses ke seluruh wilayah Indonesia</span>
        </div>

        <button
          onClick={onOpenModal}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '6px',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38bdf8',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.2)';
            e.currentTarget.style.borderColor = '#00e5ff';
            e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 229, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Layers size={13} />
          <span>Ubah Scope</span>
        </button>
      </div>

      {/* Right: 3D Hologram Radar Projection Ring */}
      <div style={{
        position: 'relative',
        width: '120px',
        height: '110px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2
      }}>
        {/* Isometric 3D Projection Base */}
        <svg viewBox="0 0 160 140" style={{ width: '100%', height: '100%' }}>
          {/* Base Rings */}
          <ellipse cx="80" cy="100" rx="60" ry="24" fill="rgba(0, 229, 255, 0.05)" stroke="#00e5ff" strokeWidth="1" strokeDasharray="3 3" />
          <ellipse cx="80" cy="100" rx="45" ry="18" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
          <ellipse cx="80" cy="100" rx="25" ry="10" fill="none" stroke="#00e5ff" strokeWidth="1.5" />

          {/* Grid radiating beams */}
          <line x1="80" y1="100" x2="30" y2="90" stroke="rgba(0, 229, 255, 0.3)" strokeWidth="1" />
          <line x1="80" y1="100" x2="130" y2="90" stroke="rgba(0, 229, 255, 0.3)" strokeWidth="1" />
          <line x1="80" y1="100" x2="80" y2="60" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1" strokeDasharray="2 2" />

          {/* Hologram Floating Cube / Node */}
          <polygon points="80,45 105,58 80,72 55,58" fill="rgba(0, 229, 255, 0.4)" stroke="#00e5ff" strokeWidth="1.5" />
          <polygon points="55,58 80,72 80,95 55,80" fill="rgba(2, 132, 199, 0.5)" stroke="#00e5ff" strokeWidth="1" />
          <polygon points="105,58 80,72 80,95 105,80" fill="rgba(56, 189, 248, 0.3)" stroke="#00e5ff" strokeWidth="1" />

          {/* Glow center */}
          <circle cx="80" cy="58" r="4" fill="#ffffff" filter="drop-shadow(0 0 6px #00e5ff)" />
        </svg>
      </div>
    </div>
  );
};
