import React, { useState } from 'react';
import { X, Search, ChevronRight, Check } from 'lucide-react';
import { useScope } from '../../context/ScopeContext';

interface ScopeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScopeSelectorModal: React.FC<ScopeSelectorModalProps> = ({ isOpen, onClose }) => {
  const { currentScope, setScopeById } = useScope();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const scopes = [
    { id: 'indonesia', name: 'Indonesia', level: 'Negara', path: 'Pusat Nasional' },
    { id: 'jabar', name: 'Jawa Barat', level: 'Provinsi', path: 'Indonesia > Jawa Barat' },
    { id: 'kab-bogor', name: 'Kab. Bogor', level: 'Kabupaten', path: 'Indonesia > Jawa Barat > Kab. Bogor' },
    { id: 'kec-cibinong', name: 'Kec. Cibinong', level: 'Kecamatan', path: 'Indonesia > Jawa Barat > Kab. Bogor > Kec. Cibinong' },
    { id: 'kel-sukamaju', name: 'Kel. Sukamaju', level: 'Kelurahan', path: 'Indonesia > Jawa Barat > Kab. Bogor > Kec. Cibinong > Kel. Sukamaju' },
    { id: 'rw-02', name: 'RW 02', level: 'RW', path: 'Indonesia > Jawa Barat > Kab. Bogor > Kec. Cibinong > Kel. Sukamaju > RW 02' }
  ];

  const filtered = scopes.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(3, 7, 18, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div style={{
        backgroundColor: '#0a1220',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 229, 255, 0.2)',
        width: '560px',
        maxWidth: '90vw',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
              Pilih Lingkup Scope Wilayah
            </div>
            <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '2px' }}>
              Beralih ruang kerja dan lingkup pengawasan sesuai hierarki 7 tingkat
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b',
              padding: '4px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search input */}
        <div style={{ padding: '14px 20px 8px 20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#060b13',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            borderRadius: '8px',
            padding: '8px 12px'
          }}>
            <Search size={15} color="#64748b" />
            <input
              type="text"
              placeholder="Cari provinsi, kabupaten, kecamatan, desa, RW..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '12.5px',
                color: '#ffffff'
              }}
            />
          </div>
        </div>

        {/* Scope List */}
        <div style={{ maxHeight: '320px', overflowY: 'auto', padding: '8px 20px 20px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {filtered.map((s) => {
            const isSelected = currentScope.id === s.id;
            return (
              <div
                key={s.id}
                onClick={() => {
                  setScopeById(s.id);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: isSelected ? '1px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.05)',
                  backgroundColor: isSelected ? 'rgba(0, 229, 255, 0.12)' : '#070e1a',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#070e1a';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: isSelected ? '#00e5ff' : '#ffffff' }}>
                      {s.name}
                    </span>
                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: 700,
                      backgroundColor: isSelected ? 'rgba(0, 229, 255, 0.2)' : '#1e293b',
                      color: isSelected ? '#00e5ff' : '#94a3b8',
                      padding: '1px 6px',
                      borderRadius: '4px'
                    }}>
                      {s.level}
                    </span>
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '3px' }}>
                    {s.path}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {isSelected ? (
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: '#00e5ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#05080f'
                    }}>
                      <Check size={13} strokeWidth={3} />
                    </div>
                  ) : (
                    <ChevronRight size={15} color="#475569" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
