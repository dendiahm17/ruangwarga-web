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
      case 'national': return { text: 'NEGARA', color: '#065f46', bg: '#ecfdf5', border: '#a7f3d0' };
      case 'province': return { text: 'PROVINSI', color: '#1e40af', bg: '#eff6ff', border: '#bfdbfe' };
      case 'regency': return { text: 'KAB/KOTA', color: '#5b21b6', bg: '#f5f3ff', border: '#ddd6fe' };
      case 'district': return { text: 'KECAMATAN', color: '#92400e', bg: '#fffbeb', border: '#fde68a' };
      case 'village': return { text: 'DESA/KEL', color: '#065f46', bg: '#f0fdf4', border: '#bbf7d0' };
      case 'rw': return { text: 'RW', color: '#374151', bg: '#f3f4f6', border: '#e5e7eb' };
      case 'rt': return { text: 'RT', color: '#374151', bg: '#f3f4f6', border: '#e5e7eb' };
      default: return { text: 'WILAYAH', color: '#065f46', bg: '#ecfdf5', border: '#a7f3d0' };
    }
  };

  const badge = getLevelBadge(currentScope.level);

  return (
    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Panel Tag */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div className="panel-title">
          <span>Informasi Scope</span>
        </div>
        <span style={{
          fontSize: '9.5px',
          fontWeight: 700,
          color: badge.color,
          backgroundColor: badge.bg,
          border: `1px solid ${badge.border}`,
          padding: '2px 7px',
          borderRadius: '6px',
          letterSpacing: '0.04em'
        }}>
          {badge.text}
        </span>
      </div>

      {/* Scope Name Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 10px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        marginBottom: '14px'
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '6px',
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '15px',
          flexShrink: 0
        }}>
          🇮🇩
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentScope.name}
          </div>
          <div style={{ fontSize: '10px', color: '#64748b' }}>
            Lingkup Administrasi
          </div>
        </div>
      </div>

      {/* Breakdown Items List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '7px',
        fontSize: '12px',
        flex: 1,
        marginBottom: '14px'
      }}>
        {stats.provincesCount !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#64748b' }}>Provinsi</span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{stats.provincesCount}</span>
          </div>
        )}
        {stats.regenciesCount !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#64748b' }}>Kabupaten/Kota</span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{stats.regenciesCount}</span>
          </div>
        )}
        {stats.districtsCount !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#64748b' }}>Kecamatan</span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{stats.districtsCount.toLocaleString('id-ID')}</span>
          </div>
        )}
        {stats.villagesCount !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#64748b' }}>Desa/Kelurahan</span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{stats.villagesCount.toLocaleString('id-ID')}</span>
          </div>
        )}
        {stats.rwCount !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#64748b' }}>RW</span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{stats.rwCount.toLocaleString('id-ID')}</span>
          </div>
        )}
        {stats.rtCount !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#64748b' }}>RT</span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{stats.rtCount.toLocaleString('id-ID')}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px', borderTop: '1px dashed #e2e8f0', marginTop: '2px' }}>
          <span style={{ color: '#059669', fontWeight: 600 }}>Warga Aktif</span>
          <span style={{ fontWeight: 800, color: '#0f172a' }}>{stats.wargaCount.toLocaleString('id-ID')}</span>
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
          padding: '8px 12px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f8fafc';
          e.currentTarget.style.borderColor = '#cbd5e1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.borderColor = '#e2e8f0';
        }}
      >
        <span>Ubah Lingkup Scope</span>
        <RefreshCw size={12} color="#64748b" />
      </button>
    </div>
  );
};
