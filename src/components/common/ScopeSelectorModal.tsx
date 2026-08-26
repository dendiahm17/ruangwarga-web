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
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '560px',
        maxWidth: '90vw',
        borderRadius: '12px',
        boxShadow: '0 20px 30px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
              Pilih Lingkup Scope Wilayah
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Beralih ruang kerja dan lingkup pengawasan sesuai hierarki
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
            backgroundColor: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '8px 12px'
          }}>
            <Search size={16} color="#64748b" />
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
                fontSize: '13px',
                color: '#1e293b'
              }}
            />
          </div>
        </div>

        {/* Scope List */}
        <div style={{ maxHeight: '340px', overflowY: 'auto', padding: '8px 20px 20px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                  border: isSelected ? '1.5px solid #10b981' : '1px solid #e2e8f0',
                  backgroundColor: isSelected ? '#ecfdf5' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: isSelected ? '#065f46' : '#0f172a' }}>
                      {s.name}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      backgroundColor: isSelected ? '#a7f3d0' : '#f1f5f9',
                      color: isSelected ? '#065f46' : '#475569',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {s.level}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>
                    {s.path}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {isSelected ? (
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff'
                    }}>
                      <Check size={14} strokeWidth={2.5} />
                    </div>
                  ) : (
                    <ChevronRight size={16} color="#94a3b8" />
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
