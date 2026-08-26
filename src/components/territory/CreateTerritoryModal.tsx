import React, { useState } from 'react';
import type { TerritoryItem } from '../../core/types/territory.types';
import { X, Plus, Shield, Network } from 'lucide-react';

interface CreateTerritoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  parentTerritory: TerritoryItem | null;
  onSave: (newTerritory: Partial<TerritoryItem>) => void;
}

export const CreateTerritoryModal: React.FC<CreateTerritoryModalProps> = ({
  isOpen,
  onClose,
  parentTerritory,
  onSave
}) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [level, setLevel] = useState<'province' | 'regency' | 'district' | 'village' | 'rw' | 'rt'>('rt');
  const [leaderName, setLeaderName] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('');

  if (!isOpen || !parentTerritory) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) return;

    onSave({
      name,
      code,
      level,
      parentId: parentTerritory.id,
      status: 'optimal',
      citizensCount: 0,
      workspacesCount: 0,
      childrenCount: 0,
      leaderName: leaderName || 'Belum Ditetapkan',
      leaderPhone: leaderPhone || '-'
    });

    setName('');
    setCode('');
    setLeaderName('');
    setLeaderPhone('');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(3, 7, 18, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div style={{
        backgroundColor: '#0a1220',
        border: '1px solid rgba(0, 229, 255, 0.3)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 229, 255, 0.2)',
        width: '520px',
        maxWidth: '90vw',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
              Tambah Sub-Wilayah Baru
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
              Di bawah naungan: <strong style={{ color: '#00e5ff' }}>{parentTerritory.name}</strong> ({parentTerritory.code})
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Level Dropdown */}
          <div>
            <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Tingkat Wilayah
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              style={{
                width: '100%',
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#ffffff',
                outline: 'none'
              }}
            >
              <option value="province">Provinsi</option>
              <option value="regency">Kabupaten / Kota</option>
              <option value="district">Kecamatan</option>
              <option value="village">Desa / Kelurahan</option>
              <option value="rw">Rukun Warga (RW)</option>
              <option value="rt">Rukun Tetangga (RT)</option>
            </select>
          </div>

          {/* Name Input */}
          <div>
            <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Nama Wilayah (misal: RT 04, RW 05, Kel. Harapan Jaya)
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama wilayah..."
              style={{
                width: '100%',
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#ffffff',
                outline: 'none'
              }}
            />
          </div>

          {/* Code Input */}
          <div>
            <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Kode Administrasi Wilayah
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`Contoh: ${parentTerritory.code}.004`}
              style={{
                width: '100%',
                backgroundColor: '#060b13',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#ffffff',
                outline: 'none'
              }}
            />
          </div>

          {/* Leader Name & Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Penanggung Jawab / Pejabat
              </label>
              <input
                type="text"
                value={leaderName}
                onChange={(e) => setLeaderName(e.target.value)}
                placeholder="Nama Ketua / Pejabat..."
                style={{
                  width: '100%',
                  backgroundColor: '#060b13',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  color: '#ffffff',
                  outline: 'none'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Nomor Kontak Resmi
              </label>
              <input
                type="text"
                value={leaderPhone}
                onChange={(e) => setLeaderPhone(e.target.value)}
                placeholder="+62 812..."
                style={{
                  width: '100%',
                  backgroundColor: '#060b13',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  color: '#ffffff',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#94a3b8',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Batal
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 18px',
                backgroundColor: 'rgba(0, 229, 255, 0.2)',
                border: '1px solid #00e5ff',
                borderRadius: '8px',
                color: '#00e5ff',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 0 12px rgba(0, 229, 255, 0.25)'
              }}
            >
              Simpan Sub-Wilayah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
