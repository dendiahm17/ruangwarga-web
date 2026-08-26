import React from 'react';
import { useScope } from '../../context/ScopeContext';
import { RefreshCw, MapPin } from 'lucide-react';

interface ScopeInfoPanelProps {
  onOpenModal: () => void;
}

export const ScopeInfoPanel: React.FC<ScopeInfoPanelProps> = ({ onOpenModal }) => {
  const { currentScope } = useScope();
  const stats = currentScope.stats;

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'national': return { text: 'NEGARA', color: '#065f46', bg: '#ecfdf5' };
      case 'province': return { text: 'PROVINSI', color: '#1e40af', bg: '#eff6ff' };
      case 'regency': return { text: 'KABUPATEN/KOTA', color: '#5b21b6', bg: '#f5f3ff' };
      case 'district': return { text: 'KECAMATAN', color: '#92400e', bg: '#fffbeb' };
      case 'village': return { text: 'DESA/KELURAHAN', color: '#065f46', bg: '#f0fdf4' };
      case 'rw': return { text: 'RW', color: '#374151', bg: '#f3f4f6' };
      case 'rt': return { text: 'RT', color: '#374151', bg: '#f3f4f6' };
      default: return { text: 'WILAYAH', color: '#065f46', bg: '#ecfdf5' };
    }
  };

  const badge = getLevelBadge(currentScope.level);

  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '14px' }}>
        INFORMASI SCOPE
      </div>

      {/* Scope Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px'
          }}>
            🇮🇩
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
              {currentScope.name}
            </div>
          </div>
        </div>

        <span style={{
          fontSize: '10.5px',
          fontWeight: 700,
          color: badge.color,
          backgroundColor: badge.bg,
          padding: '2px 8px',
          borderRadius: '4px',
          letterSpacing: '0.04em'
        }}>
          {badge.text}
        </span>
      </div>

      {/* Breakdown Items */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '9px',
        fontSize: '12.5px',
        flex: 1,
        marginBottom: '16px'
      }}>
        {stats.provincesCount !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: '#0f172a', width: '45px' }}>{stats.provincesCount}</span>
            <span style={{ color: '#64748b', flex: 1 }}>Provinsi</span>
          </div>
        )}
        {stats.regenciesCount !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: '#0f172a', width: '45px' }}>{stats.regenciesCount}</span>
            <span style={{ color: '#64748b', flex: 1 }}>Kabupaten/Kota</span>
          </div>
        )}
        {stats.districtsCount !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: '#0f172a', width: '45px' }}>{stats.districtsCount.toLocaleString('id-ID')}</span>
            <span style={{ color: '#64748b', flex: 1 }}>Kecamatan</span>
          </div>
        )}
        {stats.villagesCount !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: '#0f172a', width: '45px' }}>{stats.villagesCount.toLocaleString('id-ID')}</span>
            <span style={{ color: '#64748b', flex: 1 }}>Desa/Kelurahan</span>
          </div>
        )}
        {stats.rwCount !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: '#0f172a', width: '45px' }}>{stats.rwCount.toLocaleString('id-ID')}</span>
            <span style={{ color: '#64748b', flex: 1 }}>RW</span>
          </div>
        )}
        {stats.rtCount !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: '#0f172a', width: '45px' }}>{stats.rtCount.toLocaleString('id-ID')}</span>
            <span style={{ color: '#64748b', flex: 1 }}>RT</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px', borderTop: '1px dashed #e2e8f0' }}>
          <span style={{ fontWeight: 700, color: '#0f172a', width: '68px' }}>{stats.wargaCount.toLocaleString('id-ID')}</span>
          <span style={{ color: '#059669', fontWeight: 600, flex: 1 }}>Warga Aktif</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onOpenModal}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '8px 14px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          backgroundColor: '#f8fafc',
          color: '#1e293b',
          fontSize: '12.5px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e2e8f0';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f8fafc';
        }}
      >
        <span>Ubah Scope</span>
        <RefreshCw size={13} color="#64748b" />
      </button>
    </div>
  );
};
